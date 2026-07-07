import SectionHeading from "./SectionHeading";

const FEATURES = [
  {
    icon: "/images/icon-payments.svg",
    title: "Сигурни плащания",
    text: "Всяка транзакция минава през платформата със защита на купувача и изпълнителя.",
    width: 227,
  },
  {
    icon: "/images/icon-verified.svg",
    title: "Проверени изпълнители",
    text: "Всеки изпълнител е внимателно одобрен за качество и професионализъм.",
    width: 242,
  },
  {
    icon: "/images/icon-pricing.svg",
    title: "Прозрачни цени",
    text: "Без скрити такси. Ясни цени отначало и персонализирани оферти при нужда.",
    width: 201,
  },
  {
    icon: "/images/icon-booking.svg",
    title: "Бърза резервация",
    text: "Виж свободни дати в реално време и запази своята за минути.",
    width: 217,
  },
  {
    icon: "/images/icon-quality.svg",
    title: "Куратирано качество",
    text: "Подбрани изпълнители с доказана работа и реален опит.",
    width: 220,
  },
  {
    icon: "/images/icon-support.svg",
    title: "Спокойствие за деня",
    text: "Подкрепа преди и по време на събитието - никога не си сам.",
    width: 205,
  },
];

export default function WhyUs() {
  return (
    <section className="bg-white pt-[56px] pb-[56px] lg:h-[752px] lg:pb-0">
      <SectionHeading
        eyebrow="ЗАЩО EVENTAT"
        title="Изградено за доверие и спокойствие"
        subtitle="Поемаме трудната част, за да можеш да се съсредоточиш върху момента."
      />
      <div className="mx-auto mt-[40px] grid w-full max-w-[1132px] grid-cols-1 gap-y-[48px] px-[24px] sm:grid-cols-2 lg:mt-[47px] lg:grid-cols-3 lg:px-0">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center pt-[8px]">
            <div className="flex size-[84px] items-center justify-center rounded-full border border-[rgba(127,100,174,0.16)] bg-white drop-shadow-[0px_10px_13px_rgba(102,77,146,0.08)]">
              <img alt="" src={feature.icon} className="size-[32px]" />
            </div>
            <h3 className="mt-[23px] text-[20px] font-bold italic leading-[31px] tracking-[-0.2px] text-ink">
              {feature.title}
            </h3>
            <p
              className="mt-[4px] text-center text-[14px] leading-[20px] text-muted"
              style={{ width: feature.width }}
            >
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
