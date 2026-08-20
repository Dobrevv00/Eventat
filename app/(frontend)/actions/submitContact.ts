"use server";

import config from "@payload-config";
import { getPayload } from "payload";

export type ContactActionResult = { ok: true } | { ok: false; error: string };

type ContactActionInput = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeypot?: unknown;
};

const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 254; // RFC 5321
const MESSAGE_MIN = 2;
const MESSAGE_MAX = 5000;

// Умишлено проста проверка — истинската валидация на имейл е дали писмото стига.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR =
  "Съобщението не можа да бъде изпратено. Моля, опитай отново.";
const INVALID_ERROR = "Моля, провери попълнените полета и опитай отново.";

const asString = (value: unknown): string =>
  typeof value === "string" ? value : "";

export async function submitContact(
  input: ContactActionInput,
): Promise<ContactActionResult> {
  // 1) Honeypot: ботовете попълват скритото поле. Прекратяваме тихо и връщаме
  //    същия отговор като при успех, за да не издаваме механизма.
  if (asString(input.honeypot).trim() !== "") {
    return { ok: true };
  }

  // 2) Server-side валидация — не се доверяваме на клиента.
  const name = asString(input.name).trim();
  const email = asString(input.email).trim().toLowerCase();
  const message = asString(input.message).trim();

  if (name.length < NAME_MIN || name.length > NAME_MAX) {
    return { ok: false, error: INVALID_ERROR };
  }
  if (
    email.length === 0 ||
    email.length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { ok: false, error: INVALID_ERROR };
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return { ok: false, error: INVALID_ERROR };
  }

  // 3) Запис през Local API. overrideAccess: true, защото това е доверен
  //    сървърен код — колекцията остава затворена за публичния REST API.
  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "contact-submissions",
      data: {
        name,
        email,
        message,
        status: "new",
        pagePath: "/kontakti",
      },
      overrideAccess: true,
    });

    // Нарочно не връщаме създадения документ към клиента.
    return { ok: true };
  } catch {
    // Без PII в лога — само че операцията се е провалила.
    console.error("[contact-submission] create failed");
    return { ok: false, error: GENERIC_ERROR };
  }
}
