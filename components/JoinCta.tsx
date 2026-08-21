"use client";

import { useEffect, useRef, useState } from "react";
import { joinSelections, pushEvent } from "@/lib/analytics";
import { submitJoinCta } from "@/app/(frontend)/actions/submitJoinCta";
import { HOME_DEFAULTS } from "@/lib/defaults";
import type { HomeContent } from "@/lib/content";
import {
  OTHER_VALUE,
  PLAN_CHECKBOX_GROUPS,
  OFFER_CHECKBOX_GROUPS,
  type CheckboxGroupDef,
} from "@/lib/joinCtaQuestions";

const SPARKLES = [
  { left: 317, top: 144, size: 13, opacity: 0.62 },
  { left: 1164, top: 237, size: 19, opacity: 0.91 },
  { left: 1023, top: 640, size: 13, opacity: 0.6 },
  { left: 595, top: 724, size: 19, opacity: 0.92 },
];

const ERROR_COLOR = "#c0455e";

const TAB_ACTIVE_CLASSES =
  "h-[42px] flex-1 cursor-default rounded-[9px] bg-white text-[14px] font-bold italic text-plum drop-shadow-[0px_4px_5px_rgba(102,77,146,0.08)]";
const TAB_INACTIVE_CLASSES =
  "h-[42px] flex-1 rounded-[9px] text-[14px] text-muted transition-colors hover:text-plum";

const inputClasses = (hasError: boolean) =>
  `mt-[6px] h-[49px] w-full rounded-[10px] border px-[14px] font-serif text-[14px] text-ink placeholder:text-[#757575] transition-colors focus:outline-none ${
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

function CheckboxDropdown({
  def,
  selected,
  onToggle,
  customText,
  onCustomTextChange,
  errorMessage,
  onTouched,
}: {
  def: CheckboxGroupDef;
  selected: string[];
  onToggle: (option: string) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
  errorMessage: string | null;
  onTouched: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const PANEL_SPACE = 290; // max panel height + offset

  const handleTriggerClick = () => {
    if (!open && rootRef.current) {
      const trigger = rootRef.current.getBoundingClientRect();
      const section = rootRef.current
        .closest("section")
        ?.getBoundingClientRect();
      // The section clips overflowing content, so drop up when the panel
      // would extend past its bottom edge.
      setOpenUp(!!section && trigger.bottom + PANEL_SPACE > section.bottom);
    } else if (open) {
      onTouched();
    }
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        onTouched();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, onTouched]);

  const limitReached = selected.length >= def.max;
  const entries = [
    ...def.options.map((o) => ({ value: o, text: o })),
    ...(def.customOption
      ? [{ value: OTHER_VALUE, text: def.customOption }]
      : []),
  ];
  const summary = selected
    .map((v) => (v === OTHER_VALUE ? def.customOption : v))
    .join(", ");
  const customTextMissing =
    selected.includes(OTHER_VALUE) && !customText.trim();

  return (
    <div className="mt-[14px]" ref={rootRef}>
      <p className="text-[13px] leading-[20.15px] text-muted">
        {def.label}
        {def.hint && <span className="text-lilac"> {def.hint}</span>}
      </p>
      <div className="relative mt-[6px]">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={handleTriggerClick}
          className={`flex h-[49px] w-full items-center rounded-[10px] border bg-white pl-[13px] pr-[40px] text-left transition-colors focus:outline-none ${
            errorMessage
              ? "border-[#c0455e] focus:border-[#c0455e]"
              : "border-line focus:border-lilac"
          }`}
        >
          <span
            className={`truncate font-serif text-[14px] ${
              selected.length ? "text-ink" : "text-[#757575]"
            }`}
          >
            {selected.length ? summary : def.placeholder}
          </span>
        </button>
        <img
          alt=""
          src="/images/icon-chevron.svg"
          className={`pointer-events-none absolute right-[14px] top-1/2 size-[16px] -translate-y-1/2 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
        {open && (
          <div
            className={`absolute inset-x-0 z-20 max-h-[264px] overflow-y-auto rounded-[10px] border border-line bg-white p-[10px] shadow-[0px_12px_28px_0px_rgba(102,77,146,0.18)] ${
              openUp ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]"
            }`}
          >
            <div className="flex flex-col gap-[7px]">
              {entries.map((entry) => {
                const checked = selected.includes(entry.value);
                const blocked = !checked && limitReached;
                return (
                  <label
                    key={entry.value}
                    className={`flex items-start gap-[10px] rounded-[6px] px-[4px] py-[3px] text-[14px] leading-[20px] transition-colors ${
                      checked ? "text-ink" : "text-muted"
                    } ${
                      blocked
                        ? "cursor-not-allowed opacity-45"
                        : "cursor-pointer hover:bg-[#f4eff5] hover:text-plum"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={blocked}
                      onChange={() => onToggle(entry.value)}
                      className="mt-[2px] size-[16px] shrink-0 accent-violet"
                    />
                    {entry.text}
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {def.customOption && selected.includes(OTHER_VALUE) && (
        <input
          type="text"
          value={customText}
          onChange={(e) => onCustomTextChange(e.target.value)}
          onBlur={onTouched}
          placeholder={def.customPlaceholder}
          className={`mt-[8px] h-[49px] w-full rounded-[10px] border px-[14px] font-serif text-[14px] text-ink placeholder:text-[#757575] transition-colors focus:outline-none ${
            errorMessage && customTextMissing
              ? "border-[#c0455e] focus:border-[#c0455e]"
              : "border-line focus:border-lilac"
          }`}
        />
      )}
      {errorMessage && <FieldError message={errorMessage} />}
    </div>
  );
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

export default function JoinCta({
  content,
}: {
  content?: HomeContent["joinCta"];
}) {
  const c = content ?? HOME_DEFAULTS.joinCta;
  const perks = c.perks?.length ? c.perks : HOME_DEFAULTS.joinCta.perks;
  const [activeTab, setActiveTab] = useState<"plan" | "offer">("plan");
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [customTexts, setCustomTexts] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // Скрито поле за ботове — реалните потребители го оставят празно.
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const activeGroups =
    activeTab === "plan" ? PLAN_CHECKBOX_GROUPS : OFFER_CHECKBOX_GROUPS;

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (hash === "#form-plan") setActiveTab("plan");
      else if (hash === "#form-offer") setActiveTab("offer");
      else return;
      // The browser's own smooth anchor scroll handles the happy path. If it
      // stalls (tab-switch re-render or an embedded browser that never runs
      // the animation), cancel the stuck animation and jump to the form.
      // Re-check a few times and only intervene while there is no progress,
      // so a healthy smooth scroll is never interrupted.
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      let lastY = window.scrollY;
      const ensureScrolled = (attempts: number) => {
        setTimeout(() => {
          if (Math.abs(el.getBoundingClientRect().top) < 10) return;
          if (Math.abs(window.scrollY - lastY) < 5) {
            window.scrollTo({ top: window.scrollY, behavior: "instant" });
            window.scrollTo({
              top: window.scrollY + el.getBoundingClientRect().top,
              behavior: "instant",
            });
          }
          lastY = window.scrollY;
          if (attempts > 1) ensureScrolled(attempts - 1);
        }, 300);
      };
      ensureScrolled(4);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const markTouched = (key: string) =>
    setTouched((current) => ({ ...current, [key]: true }));

  const toggleOption = (def: CheckboxGroupDef, option: string) => {
    setSelections((current) => {
      const list = current[def.key] ?? [];
      const next = list.includes(option)
        ? list.filter((o) => o !== option)
        : list.length < def.max
          ? [...list, option]
          : list;
      return { ...current, [def.key]: next };
    });
  };

  const groupError = (def: CheckboxGroupDef): string | null => {
    const selected = selections[def.key] ?? [];
    if (selected.length < def.min) return "Изберете поне една опция";
    if (
      def.customOption &&
      selected.includes(OTHER_VALUE) &&
      !(customTexts[def.key] ?? "").trim()
    ) {
      return "Моля, напиши своя отговор";
    }
    return null;
  };

  const nameError = name.trim() ? null : "Моля, въведи името си";
  const emailError = email.trim()
    ? EMAIL_PATTERN.test(email.trim())
      ? null
      : "Невалиден имейл адрес"
    : "Моля, въведи имейл";
  const isValid =
    !nameError && !emailError && activeGroups.every((def) => !groupError(def));

  const showError = (key: string, error: string | null) =>
    error && (touched[key] || submitAttempted) ? error : null;

  // Заменя стойността "Друго" с текста, който потребителят е написал.
  const resolveSelection = (key: string) => {
    const def = [...PLAN_CHECKBOX_GROUPS, ...OFFER_CHECKBOX_GROUPS].find(
      (d) => d.key === key,
    );
    return (selections[key] ?? []).map((value) =>
      value === OTHER_VALUE
        ? (customTexts[key] || "").trim() || def?.customOption || "Друго"
        : value,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    let result: Awaited<ReturnType<typeof submitJoinCta>>;
    try {
      result = await submitJoinCta({
        side: activeTab,
        name,
        email,
        website,
        optIn,
        selections,
        customTexts,
        honeypot: company,
      });
    } catch {
      setSubmitError(
        "Записването не можа да бъде изпратено. Моля, опитай отново.",
      );
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    // GTM събитието тръгва само след потвърден запис в Payload.
    // Тригер "CE - generate_lead" (контейнер GTM-5RDG9GVR).
    pushEvent({
      event: "generate_lead",
      form_id: "waitlist",
      form_side: activeTab, // "plan" = клиент, "offer" = изпълнител
      event_type: joinSelections(resolveSelection("event")),
      first_service: joinSelections(
        resolveSelection(activeTab === "plan" ? "service" : "offerServices"),
      ),
      discovery_source: joinSelections(
        resolveSelection(activeTab === "plan" ? "source" : "offerDiscovery"),
      ),
      pain_points: joinSelections(resolveSelection("challenge")),
    });

    setSubmitted(true);
  };

  const shownNameError = showError("name", nameError);
  const shownEmailError = showError("email", emailError);

  return (
    <section
      className="relative overflow-hidden lg:min-h-[995px]"
      style={{
        backgroundImage:
          "radial-gradient(540px 449px at 216px 199px, rgba(127,100,174,0.55), rgba(127,100,174,0)), radial-gradient(520px 487px at 1296px 895px, rgba(235,191,219,0.35), rgba(235,191,219,0)), linear-gradient(145.36deg, #1f1633 0%, #3a2a64 50%, #1f1633 100%)",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1440px] -translate-x-1/2">
        <div className="absolute left-[-60px] top-[-80px] size-[320px] rounded-full bg-lilac opacity-55 blur-[60px]" />
        <div className="absolute left-[1122px] top-[597px] size-[260px] rounded-full bg-blush opacity-45 blur-[60px]" />
        <div className="absolute left-[713px] top-[319px] size-[180px] rounded-full bg-[#ff9bd1] opacity-25 blur-[60px]" />
        {SPARKLES.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              background:
                "radial-gradient(circle closest-side, rgba(255,255,255,0.9), transparent)",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-[600px] flex-col gap-[48px] px-[24px] py-[64px] lg:max-w-[1180px] lg:flex-row lg:justify-between lg:gap-[48px] lg:pt-[104px] lg:pb-[104px]">
        <div className="lg:mt-[253px] lg:max-w-[549px] lg:flex-1">
          <h2 className="text-[34px] leading-[44px] tracking-[-0.8px] text-white lg:text-[40px] lg:leading-[50px] xl:whitespace-nowrap xl:text-[48px] xl:leading-[57.24px] xl:tracking-[-1.08px]">
            {c.headingPrefix}{" "}
            <span
              className="bg-clip-text font-bold italic text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162deg, #ebbfdb 0%, #ffd9ee 50%, #ebbfdb 100%)",
              }}
            >
              {c.headingHighlight}
            </span>
          </h2>
          <p className="mt-[12px] w-full max-w-[460px] text-[16px] leading-[25.6px] text-white/72">
            {c.subtitle}
          </p>
          <div className="mt-[20px] flex h-[50px] w-fit items-center rounded-full border border-white/12 bg-white/6 pl-[29px] pr-[19px] text-[16px] leading-[21.7px] lg:mt-0">
            <p>
              <span className="text-white">{c.badgeStrong}</span>
              <span className="text-white/90">{c.badgeRest}</span>
            </p>
          </div>
          <ul className="mt-[21px] flex flex-col gap-[8px]">
            {perks.map((perk) => (
              <li
                key={perk.text}
                className="flex items-start text-[15px] leading-[23.25px] text-white/82"
              >
                <span className="w-[22px] shrink-0 text-center text-[14px] leading-[21.7px] text-blush">
                  ✦
                </span>
                {perk.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full lg:w-[523px] lg:shrink-0 lg:self-start">
          <span id="form-plan" aria-hidden className="absolute -top-[90px]" />
          <span id="form-offer" aria-hidden className="absolute -top-[90px]" />
          <div
            className="absolute -inset-[2px] rounded-[24px] opacity-35 blur-[12px]"
            style={{
              backgroundImage:
                "linear-gradient(124.25deg, #9b85bf 0%, #ebbfdb 50%, #9b85bf 100%)",
            }}
          />
          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative w-full rounded-[22px] border border-white/20 bg-white p-[24px] drop-shadow-[0px_30px_30px_rgba(0,0,0,0.35)] sm:p-[32px] lg:min-h-[767px]"
          >
            <p className="pt-[5px] text-[12px] leading-[17px] tracking-[2px] text-plum">
              {c.formEyebrow}
            </p>
            <h3 className="mt-[7px] text-[24px] font-bold italic leading-[37.2px] tracking-[-0.24px] text-ink">
              {c.formTitle}
            </h3>

            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center lg:min-h-[600px]">
                <span className="text-[28px] text-blush">✦</span>
                <h4 className="mt-[10px] text-[22px] font-bold italic text-ink">
                  {c.successTitle}
                </h4>
                <p className="mt-[8px] max-w-[360px] text-[14px] leading-[21px] text-muted">
                  {c.successText}
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
              <label htmlFor="joincta-company">Фирма</label>
              <input
                id="joincta-company"
                name="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="mt-[15px] flex rounded-[12px] bg-[#f4eff5] p-[4px]" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "plan"}
                onClick={() => setActiveTab("plan")}
                className={activeTab === "plan" ? TAB_ACTIVE_CLASSES : TAB_INACTIVE_CLASSES}
              >
                {c.tabPlanLabel}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "offer"}
                onClick={() => setActiveTab("offer")}
                className={activeTab === "offer" ? TAB_ACTIVE_CLASSES : TAB_INACTIVE_CLASSES}
              >
                {c.tabOfferLabel}
              </button>
            </div>

            <div className="mt-[24px] flex flex-col gap-[12px] sm:flex-row">
              <div className="flex-1">
                <label className="block">
                  <span className="text-[13px] leading-[20.15px] text-muted">
                    {c.nameLabel}
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => markTouched("name")}
                    placeholder={c.namePlaceholder}
                    className={inputClasses(!!shownNameError)}
                  />
                </label>
                {shownNameError && <FieldError message={shownNameError} />}
              </div>
              <div className="flex-1">
                <label className="block">
                  <span className="text-[13px] leading-[20.15px] text-muted">
                    {c.emailLabel}
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched("email")}
                    placeholder={c.emailPlaceholder}
                    className={inputClasses(!!shownEmailError)}
                  />
                </label>
                {shownEmailError && <FieldError message={shownEmailError} />}
              </div>
            </div>

            {activeTab === "offer" && (
              <label className="mt-[14px] block">
                <span className="text-[13px] leading-[20.15px] text-muted">
                  {c.websiteLabel}
                </span>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={c.websitePlaceholder}
                  className={inputClasses(false)}
                />
              </label>
            )}

            {activeGroups.map((def) => (
              <CheckboxDropdown
                key={def.key}
                def={def}
                selected={selections[def.key] ?? []}
                onToggle={(option) => toggleOption(def, option)}
                customText={customTexts[def.key] ?? ""}
                onCustomTextChange={(text) =>
                  setCustomTexts((current) => ({ ...current, [def.key]: text }))
                }
                errorMessage={showError(def.key, groupError(def))}
                onTouched={() => markTouched(def.key)}
              />
            ))}

            {activeTab === "plan" && (
              <label className="mt-[16px] flex cursor-pointer items-start gap-[10px] border-t border-line pt-[14px] text-[14px] leading-[20px] text-muted transition-colors hover:text-plum">
                <input
                  type="checkbox"
                  checked={optIn}
                  onChange={(e) => setOptIn(e.target.checked)}
                  className="mt-[2px] size-[16px] shrink-0 accent-violet"
                />
                {c.optInLabel}
              </label>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              aria-disabled={!isValid || isSubmitting}
              aria-busy={isSubmitting}
              className={`mt-[33px] h-[47px] w-full rounded-[12px] bg-violet text-[16px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-all ${
                isValid && !isSubmitting
                  ? "hover:bg-plum"
                  : "cursor-not-allowed opacity-45"
              }`}
            >
              {isSubmitting ? "Изпращане…" : c.submitLabel}
            </button>
            {!isValid && submitAttempted && (
              <p
                className="mt-[8px] text-center text-[12px] leading-[16px]"
                style={{ color: ERROR_COLOR }}
              >
                Моля, попълни оцветените в червено полета, за да се запишеш.
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
            <p className="mt-[10px] text-center text-[12px] leading-[18.6px] text-muted">
              {c.formDisclaimer}
            </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
