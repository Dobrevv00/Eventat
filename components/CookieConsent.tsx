"use client";

import { useEffect, useState } from "react";
import {
  OPEN_SETTINGS_EVENT,
  readConsent,
  saveConsent,
} from "@/lib/cookieConsent";

const CATEGORIES = [
  {
    key: "necessary",
    title: "Необходими",
    text: "Нужни за основната работа на сайта — навигация, сигурност и запазване на избора ти. Не могат да бъдат изключени.",
    always: true,
  },
  {
    key: "analytics",
    title: "Аналитични",
    text: "Помагат ни да разберем как посетителите използват сайта, за да го подобряваме. Данните са обобщени и анонимни.",
    always: false,
  },
  {
    key: "marketing",
    title: "Маркетингови",
    text: "Позволяват ни да ти показваме по-подходящи съобщения и оферти в други платформи.",
    always: false,
  },
] as const;

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors ${
        checked ? "bg-violet" : "bg-[#d9d2e4]"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-[3px] size-[20px] rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

const OUTLINE_BTN =
  "flex h-[44px] items-center justify-center rounded-[12px] border border-line bg-white px-[18px] text-[14px] font-bold italic text-plum transition-colors hover:bg-[#f4eff5]";
const SOLID_BTN =
  "flex h-[44px] items-center justify-center rounded-[12px] bg-violet px-[18px] text-[14px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum";

export default function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setBannerVisible(true);
    } else {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }

    const openHandler = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openHandler);
  }, []);

  const persist = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setAnalytics(a);
    setMarketing(m);
    setBannerVisible(false);
    setSettingsOpen(false);
  };

  const closeSettings = () => {
    // Затваряне без запис връща банера, ако още няма избор.
    setSettingsOpen(false);
    if (!readConsent()) setBannerVisible(true);
  };

  const values: Record<string, boolean> = {
    necessary: true,
    analytics,
    marketing,
  };
  const setters: Record<string, (v: boolean) => void> = {
    analytics: setAnalytics,
    marketing: setMarketing,
  };

  if (!bannerVisible && !settingsOpen) return null;

  return (
    <>
      {bannerVisible && !settingsOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[60] p-[16px] sm:p-[24px]">
          <div className="mx-auto max-w-[1132px] rounded-[18px] border border-line bg-white/90 p-[20px] shadow-[0px_12px_40px_rgba(31,22,51,0.18)] backdrop-blur-md sm:p-[24px]">
            <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between lg:gap-[32px]">
              <div className="lg:flex-1">
                <h2 className="text-[18px] font-bold italic text-ink">
                  Използваме бисквитки 🍪
                </h2>
                <p className="mt-[6px] text-[14px] leading-[21px] text-muted">
                  Използваме бисквитки, за да работи сайтът и да подобряваме
                  твоето изживяване. Можеш да приемеш всички или сам да избереш
                  кои да позволиш. Виж{" "}
                  <a
                    href="/poveritelnost"
                    className="text-plum underline transition-colors hover:text-violet"
                  >
                    Политиката за поверителност
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-[10px] sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className={OUTLINE_BTN}
                >
                  Настройки
                </button>
                <button
                  type="button"
                  onClick={() => persist(false, false)}
                  className={OUTLINE_BTN}
                >
                  Само необходими
                </button>
                <button
                  type="button"
                  onClick={() => persist(true, true)}
                  className={SOLID_BTN}
                >
                  Приемам всички
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-[16px] sm:items-center">
          <div
            className="absolute inset-0 bg-[#1f1633]/50 backdrop-blur-sm"
            onClick={closeSettings}
          />
          <div className="relative flex max-h-[88vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0px_30px_60px_rgba(0,0,0,0.35)]">
            <div className="border-b border-line p-[24px] sm:p-[28px]">
              <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
                НАСТРОЙКИ ЗА БИСКВИТКИ
              </p>
              <h2 className="mt-[8px] text-[22px] font-bold italic leading-[28px] text-ink">
                Управлявай своите предпочитания
              </h2>
              <p className="mt-[8px] text-[14px] leading-[21px] text-muted">
                Избери кои категории бисквитки да позволиш. Необходимите са
                винаги активни, за да работи сайтът.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-[24px] py-[8px] sm:px-[28px]">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-start justify-between gap-[16px] border-b border-line py-[18px] last:border-b-0"
                >
                  <div>
                    <h3 className="text-[16px] font-bold italic text-ink">
                      {cat.title}
                      {cat.always && (
                        <span className="ml-[8px] align-middle text-[11px] font-normal not-italic tracking-[1px] text-plum">
                          ВИНАГИ АКТИВНИ
                        </span>
                      )}
                    </h3>
                    <p className="mt-[4px] text-[13px] leading-[19px] text-muted">
                      {cat.text}
                    </p>
                  </div>
                  <Toggle
                    label={cat.title}
                    checked={cat.always ? true : values[cat.key]}
                    disabled={cat.always}
                    onChange={setters[cat.key]}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[10px] border-t border-line p-[24px] sm:flex-row sm:p-[28px]">
              <button
                type="button"
                onClick={() => persist(false, false)}
                className={`${OUTLINE_BTN} sm:flex-1`}
              >
                Само необходими
              </button>
              <button
                type="button"
                onClick={() => persist(analytics, marketing)}
                className={`${OUTLINE_BTN} sm:flex-1`}
              >
                Запази избора
              </button>
              <button
                type="button"
                onClick={() => persist(true, true)}
                className={`${SOLID_BTN} sm:flex-1`}
              >
                Приемам всички
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
