"use client";

import { useState } from "react";

const SPARKLES = [
  { left: 317, top: 144, size: 13, opacity: 0.62 },
  { left: 1164, top: 237, size: 19, opacity: 0.91 },
  { left: 1023, top: 640, size: 13, opacity: 0.6 },
  { left: 595, top: 724, size: 19, opacity: 0.92 },
];

const PERKS = [
  "Ексклузивни условия при стартирането",
  "Приоритет пред всички следващи регистрации",
  "Изненади и оферти само за нашата общност",
];

const PLAN_SELECT_FIELDS = [
  { label: "Какъв тип събитие планирате?", placeholder: "Изберете събитие" },
  {
    label: "Ако EventAT стартира утре, коя услуга бихте резервирали първо?",
    placeholder: "Изберете услуга",
  },
  {
    label: "Как обикновено намирате изпълнители?",
    placeholder: "Изберете източник",
  },
  {
    label: "Кое е най-досадното при организацията на събитие?",
    placeholder: "Изберете предизвикателство",
  },
];

const OFFER_SELECT_FIELDS = [
  { label: "Какви услуги предлагате?", placeholder: "Изберете услуга" },
  {
    label: "Как клиентите най-често откриват вашите услуги?",
    placeholder: "Изберете опция",
  },
  {
    label: "В кои градове предлагате услугите си?",
    placeholder: "Изберете град",
  },
];

const INPUT_CLASSES =
  "mt-[6px] h-[49px] w-full rounded-[10px] border border-line px-[14px] font-serif text-[14px] text-ink placeholder:text-[#757575] transition-colors focus:border-lilac focus:outline-none";

const TAB_ACTIVE_CLASSES =
  "h-[42px] flex-1 cursor-default rounded-[9px] bg-white text-[14px] font-bold italic text-plum drop-shadow-[0px_4px_5px_rgba(102,77,146,0.08)]";
const TAB_INACTIVE_CLASSES =
  "h-[42px] flex-1 rounded-[9px] text-[14px] text-muted transition-colors hover:text-plum";

function SelectField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="mt-[14px] block">
      <span className="text-[13px] leading-[20.15px] text-muted">{label}</span>
      <span className="relative mt-[6px] block">
        <select
          defaultValue=""
          className="h-[49px] w-full appearance-none rounded-[10px] border border-line bg-white px-[13px] font-serif text-[14px] text-[#757575] transition-colors focus:border-lilac focus:outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
        </select>
        <img
          alt=""
          src="/images/icon-chevron.svg"
          className="pointer-events-none absolute right-[14px] top-1/2 size-[16px] -translate-y-1/2"
        />
      </span>
    </label>
  );
}

export default function JoinCta() {
  const [activeTab, setActiveTab] = useState<"plan" | "offer">("plan");

  return (
    <section
      className="relative overflow-hidden lg:h-[995px]"
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

      <div className="relative mx-auto flex w-full max-w-[600px] flex-col gap-[48px] px-[24px] py-[64px] lg:max-w-[1180px] lg:flex-row lg:justify-between lg:gap-[48px] lg:pt-[104px] lg:pb-0">
        <div className="lg:mt-[253px] lg:max-w-[549px] lg:flex-1">
          <h2 className="text-[34px] leading-[44px] tracking-[-0.8px] text-white lg:text-[40px] lg:leading-[50px] xl:whitespace-nowrap xl:text-[48px] xl:leading-[57.24px] xl:tracking-[-1.08px]">
            Стани част от{" "}
            <span
              className="bg-clip-text font-bold italic text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(162deg, #ebbfdb 0%, #ffd9ee 50%, #ebbfdb 100%)",
              }}
            >
              EventAT
            </span>
          </h2>
          <p className="mt-[12px] w-full max-w-[460px] text-[16px] leading-[25.6px] text-white/72">
            Подсигури си ранен достъп, ексклузивни условия и приоритет пред
            всички, които ще се присъединят след старта.
          </p>
          <div className="mt-[20px] flex h-[50px] w-fit items-center rounded-full border border-white/12 bg-white/6 pl-[29px] pr-[19px] text-[16px] leading-[21.7px] lg:mt-0">
            <p>
              <span className="text-white">500+ души</span>
              <span className="text-white/90"> вече се записаха</span>
            </p>
          </div>
          <ul className="mt-[21px] flex flex-col gap-[8px]">
            {PERKS.map((perk) => (
              <li
                key={perk}
                className="flex items-start text-[15px] leading-[23.25px] text-white/82"
              >
                <span className="w-[22px] shrink-0 text-center text-[14px] leading-[21.7px] text-blush">
                  ✦
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative w-full lg:w-[523px] lg:shrink-0">
          <div
            className="absolute -inset-[2px] rounded-[24px] opacity-35 blur-[12px]"
            style={{
              backgroundImage:
                "linear-gradient(124.25deg, #9b85bf 0%, #ebbfdb 50%, #9b85bf 100%)",
            }}
          />
          <form className="relative w-full rounded-[22px] border border-white/20 bg-white p-[24px] drop-shadow-[0px_30px_30px_rgba(0,0,0,0.35)] sm:p-[32px] lg:h-[767px]">
            <p className="pt-[5px] text-[12px] leading-[17px] tracking-[2px] text-plum">
              ЗАПИШИ СЕ БЕЗПЛАТНО
            </p>
            <h3 className="mt-[7px] text-[24px] font-bold italic leading-[37.2px] tracking-[-0.24px] text-ink">
              Резервирай своето място
            </h3>

            <div className="mt-[15px] flex rounded-[12px] bg-[#f4eff5] p-[4px]" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "plan"}
                onClick={() => setActiveTab("plan")}
                className={activeTab === "plan" ? TAB_ACTIVE_CLASSES : TAB_INACTIVE_CLASSES}
              >
                Планирам събитие
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "offer"}
                onClick={() => setActiveTab("offer")}
                className={activeTab === "offer" ? TAB_ACTIVE_CLASSES : TAB_INACTIVE_CLASSES}
              >
                Предлагам услуга
              </button>
            </div>

            <div className="mt-[24px] flex flex-col gap-[12px] sm:flex-row">
              <label className="block flex-1">
                <span className="text-[13px] leading-[20.15px] text-muted">
                  Име
                </span>
                <input type="text" placeholder="Твоето име" className={INPUT_CLASSES} />
              </label>
              <label className="block flex-1">
                <span className="text-[13px] leading-[20.15px] text-muted">
                  Имейл
                </span>
                <input
                  type="email"
                  placeholder="ime@example.com"
                  className={INPUT_CLASSES}
                />
              </label>
            </div>

            {activeTab === "plan" ? (
              PLAN_SELECT_FIELDS.map((field) => (
                <SelectField key={field.label} {...field} />
              ))
            ) : (
              <>
                <label className="mt-[14px] block">
                  <span className="text-[13px] leading-[20.15px] text-muted">
                    Уебсайт
                  </span>
                  <input type="url" placeholder="https://" className={INPUT_CLASSES} />
                </label>
                {OFFER_SELECT_FIELDS.map((field) => (
                  <SelectField key={field.label} {...field} />
                ))}
              </>
            )}

            <button
              type="submit"
              className="mt-[33px] h-[47px] w-full rounded-[12px] bg-violet text-[16px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum"
            >
              Запиши се в листата
            </button>
            <p className="mt-[10px] text-center text-[12px] leading-[18.6px] text-muted">
              Никога няма да изпратим спам. Само новина за старта.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
