"use server";

import config from "@payload-config";
import { getPayload } from "payload";

import {
  OFFER_CHECKBOX_GROUPS,
  OTHER_VALUE,
  PLAN_CHECKBOX_GROUPS,
  type CheckboxGroupDef,
} from "@/lib/joinCtaQuestions";

export type JoinCtaActionResult = { ok: true } | { ok: false; error: string };

type JoinCtaInput = {
  side?: unknown;
  name?: unknown;
  email?: unknown;
  website?: unknown;
  optIn?: unknown;
  selections?: unknown;
  customTexts?: unknown;
  honeypot?: unknown;
};

const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const WEBSITE_MAX = 500;
const CUSTOM_TEXT_MAX = 500;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR =
  "Записването не можа да бъде изпратено. Моля, опитай отново.";
const INVALID_ERROR = "Моля, провери попълнените полета и опитай отново.";

const asString = (v: unknown): string => (typeof v === "string" ? v : "");

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

export async function submitJoinCta(
  input: JoinCtaInput,
): Promise<JoinCtaActionResult> {
  // 1) Honeypot — ботовете попълват скритото поле. Прекратяваме тихо и
  //    връщаме същия отговор като при успех, за да не издаваме механизма.
  if (asString(input.honeypot).trim() !== "") {
    return { ok: true };
  }

  const side = input.side === "offer" ? "offer" : "plan";
  const groups: CheckboxGroupDef[] =
    side === "plan" ? PLAN_CHECKBOX_GROUPS : OFFER_CHECKBOX_GROUPS;

  // 2) Server-side валидация — не се доверяваме на клиента.
  const name = asString(input.name).trim();
  const email = asString(input.email).trim().toLowerCase();

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

  const rawSelections =
    input.selections && typeof input.selections === "object"
      ? (input.selections as Record<string, unknown>)
      : {};
  const rawCustom =
    input.customTexts && typeof input.customTexts === "object"
      ? (input.customTexts as Record<string, unknown>)
      : {};

  const data: Record<string, unknown> = {
    name,
    email,
    status: "new",
    pagePath: "/",
  };

  for (const def of groups) {
    // Приемаме само стойности, които реално съществуват във въпроса.
    const allowed = new Set<string>([
      ...def.options,
      ...(def.customOption ? [OTHER_VALUE] : []),
    ]);
    const picked = asStringArray(rawSelections[def.key]).filter((v) =>
      allowed.has(v),
    );

    if (picked.length < def.min || picked.length > def.max) {
      return { ok: false, error: INVALID_ERROR };
    }

    // В базата пазим четимия етикет („Друго“), а не вътрешния ключ.
    data[def.key] = picked.map((v) =>
      v === OTHER_VALUE ? (def.customOption ?? "Друго") : v,
    );

    if (def.customOption) {
      const custom = asString(rawCustom[def.key]).trim();
      if (picked.includes(OTHER_VALUE)) {
        if (custom.length === 0 || custom.length > CUSTOM_TEXT_MAX) {
          return { ok: false, error: INVALID_ERROR };
        }
        data[`${def.key}Other`] = custom;
      }
    }
  }

  if (side === "plan") {
    data.earlyAccessOptIn = input.optIn === true;
  } else {
    const website = asString(input.website).trim();
    if (website.length > WEBSITE_MAX) {
      return { ok: false, error: INVALID_ERROR };
    }
    if (website) data.website = website;
  }

  // 3) Запис през Local API. overrideAccess: true, защото това е доверен
  //    сървърен код — колекциите остават затворени за публичния REST API.
  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection:
        side === "plan"
          ? "event-planning-submissions"
          : "service-provider-submissions",
      data: data as never,
      overrideAccess: true,
    });

    // Нарочно не връщаме създадения документ към клиента.
    return { ok: true };
  } catch {
    // Без лични данни в лога — само че операцията се е провалила.
    console.error(`[join-cta-submission] create failed (${side})`);
    return { ok: false, error: GENERIC_ERROR };
  }
}
