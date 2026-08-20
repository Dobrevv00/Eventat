"use client";

import { useState } from "react";
import { submitContact } from "@/app/(frontend)/actions/submitContact";
import { pushEvent } from "@/lib/analytics";

const ERROR_COLOR = "#c0455e";
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const fieldClasses = (hasError: boolean) =>
  `mt-[6px] w-full rounded-[10px] border px-[14px] font-serif text-[14px] text-ink placeholder:text-[#757575] transition-colors focus:outline-none ${
    hasError
      ? "border-[#c0455e] focus:border-[#c0455e]"
      : "border-line focus:border-lilac"
  }`;

function FieldError({ message }: { message: string }) {
  return (
    <p
      className="mt-[6px] text-[12px] leading-[16px]"
      style={{ color: ERROR_COLOR }}
    >
      {message}
    </p>
  );
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  // Скрито поле за ботове — реалните потребители го оставят празно.
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const nameError = name.trim() ? null : "Моля, въведи името си";
  const emailError = email.trim()
    ? EMAIL_PATTERN.test(email.trim())
      ? null
      : "Невалиден имейл адрес"
    : "Моля, въведи имейл";
  const messageError = message.trim() ? null : "Моля, напиши съобщение";
  const isValid = !nameError && !emailError && !messageError;

  const showError = (key: string, error: string | null) =>
    error && (touched[key] || submitAttempted) ? error : null;

  const markTouched = (key: string) =>
    setTouched((current) => ({ ...current, [key]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitContact({
        name,
        email,
        message,
        honeypot: company,
      });

      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }

      // GTM събитието тръгва само след успешен запис.
      // Тригер "CE - contact_form_submit" (контейнер GTM-5RDG9GVR).
      pushEvent({
        event: "contact_form_submit",
        form_id: "contact",
      });

      setSent(true);
    } catch {
      setSubmitError(
        "Съобщението не можа да бъде изпратено. Моля, опитай отново.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const shownNameError = showError("name", nameError);
  const shownEmailError = showError("email", emailError);
  const shownMessageError = showError("message", messageError);

  return (
    <section className="bg-gradient-to-b from-[#fdf6f6] to-white">
      <div className="mx-auto w-full max-w-[1132px] px-[24px] pt-[56px] pb-[72px]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
            КОНТАКТИ
          </p>
          <h1 className="mt-[10px] text-[28px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[34px] lg:leading-[34px]">
            Свържи се с нас
          </h1>
          <p className="mt-[9px] text-[16px] leading-[23.25px] text-muted">
            Пиши ни за въпроси, партньорства или просто да кажеш здравей.
          </p>
        </div>

        <div className="mt-[48px] flex flex-col gap-[24px] lg:flex-row lg:items-start lg:justify-center lg:gap-[32px]">
          <div className="w-full rounded-[18px] border border-line bg-white p-[28px] shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)] lg:w-[360px] lg:shrink-0">
            <h2 className="text-[20px] font-bold italic leading-[27.9px] text-ink">
              Информация за контакт
            </h2>
            <div className="mt-[20px]">
              <p className="text-[12px] leading-[17px] tracking-[2px] text-plum">
                АДРЕС
              </p>
              <p className="mt-[6px] text-[15px] leading-[22px] text-muted">
                гр. София, бул. Свети Наум 30, етаж 5
              </p>
            </div>
            <div className="mt-[18px]">
              <p className="text-[12px] leading-[17px] tracking-[2px] text-plum">
                ИМЕЙЛ
              </p>
              <a
                href="mailto:hello.eventat@gmail.com"
                className="mt-[6px] inline-block text-[15px] leading-[22px] text-plum transition-colors hover:text-violet"
              >
                hello.eventat@gmail.com
              </a>
            </div>
            <p className="mt-[22px] border-t border-line pt-[16px] text-[13px] leading-[19px] text-muted">
              Отговаряме обикновено в рамките на един работен ден.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full rounded-[22px] border border-line bg-white p-[24px] shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)] sm:p-[32px] lg:w-[523px] lg:shrink-0"
          >
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="text-[28px] text-blush">✦</span>
                <h2 className="mt-[10px] text-[22px] font-bold italic text-ink">
                  Благодарим ти!
                </h2>
                <p className="mt-[8px] max-w-[360px] text-[14px] leading-[21px] text-muted">
                  Получихме съобщението ти и ще се свържем с теб възможно
                  най-скоро.
                </p>
              </div>
            ) : (
              <>
                {/*
                  Honeypot: скрито за хора (visually-hidden, извън tab flow и
                  скрито за екранни четци), но видимо за автоматични ботове.
                  Ако бъде попълнено, записът се отхвърля тихо.
                */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-company">Фирма</label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-[12px] sm:flex-row">
                  <div className="flex-1">
                    <label className="block">
                      <span className="text-[13px] leading-[20.15px] text-muted">
                        Име
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => markTouched("name")}
                        placeholder="Твоето име"
                        className={`h-[49px] ${fieldClasses(!!shownNameError)}`}
                      />
                    </label>
                    {shownNameError && <FieldError message={shownNameError} />}
                  </div>
                  <div className="flex-1">
                    <label className="block">
                      <span className="text-[13px] leading-[20.15px] text-muted">
                        Имейл
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => markTouched("email")}
                        placeholder="ime@example.com"
                        className={`h-[49px] ${fieldClasses(!!shownEmailError)}`}
                      />
                    </label>
                    {shownEmailError && <FieldError message={shownEmailError} />}
                  </div>
                </div>

                <div className="mt-[14px]">
                  <label className="block">
                    <span className="text-[13px] leading-[20.15px] text-muted">
                      Съобщение
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => markTouched("message")}
                      placeholder="Как можем да помогнем?"
                      rows={6}
                      className={`resize-none py-[13px] ${fieldClasses(!!shownMessageError)}`}
                    />
                  </label>
                  {shownMessageError && <FieldError message={shownMessageError} />}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={!isValid || isSubmitting}
                  aria-busy={isSubmitting}
                  className={`mt-[24px] h-[47px] w-full rounded-[12px] bg-violet text-[16px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-all ${
                    isValid && !isSubmitting
                      ? "hover:bg-plum"
                      : "cursor-not-allowed opacity-45"
                  }`}
                >
                  {isSubmitting ? "Изпращане…" : "Изпрати съобщение"}
                </button>
                {!isValid && submitAttempted && (
                  <p
                    className="mt-[8px] text-center text-[12px] leading-[16px]"
                    style={{ color: ERROR_COLOR }}
                  >
                    Моля, попълни оцветените в червено полета.
                  </p>
                )}
                {submitError && (
                  <p
                    role="alert"
                    className="mt-[8px] text-center text-[12px] leading-[16px]"
                    style={{ color: ERROR_COLOR }}
                  >
                    {submitError}
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
