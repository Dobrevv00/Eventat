import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Открий",
    text: "Разгледай изпълнители и услуги, подходящи за твоя празник.",
    width: 197,
  },
  {
    number: "02",
    title: "Свържи се",
    text: "Говори директно с изпълнителя, обсъди визията си и получи персонална оферта.",
    width: 243,
  },
  {
    number: "03",
    title: "Резервирай",
    text: "Плати през EventAT със защита на купувача - парите ти са в безопасност до събитието.",
    width: 243,
  },
  {
    number: "04",
    title: "Празнувай",
    text: "Наслади се на перфектно изпълненото събитие, спокойно и без стрес.",
    width: 229,
  },
];

export default function Process() {
  return (
    <section className="mt-[64px] bg-[#fbf6fa] pt-[56px] pb-[56px] lg:mt-[88px] lg:h-[440px] lg:pb-0">
      <SectionHeading
        eyebrow="ЛЕСЕН ПРОЦЕС"
        title="От идея до празнуване"
        subtitle="Четири стъпки между теб и перфектно организираното събитие."
      />
      <div className="mx-auto mt-[45px] flex max-w-[420px] flex-col gap-[40px] px-[24px] lg:relative lg:block lg:h-[186px] lg:w-[1158px] lg:max-w-none lg:px-0">
        <div className="absolute left-[136px] top-[38px] hidden h-[2px] w-[860px] bg-lilac opacity-50 lg:block" />
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col items-center lg:absolute lg:top-[8px] lg:w-[291px]"
            style={{ left: i * 291 - 16 }}
          >
            <div className="flex size-[56px] items-center justify-center rounded-full border-2 border-lilac bg-white">
              <span className="font-noto text-[22px] font-bold text-plum">
                {step.number}
              </span>
            </div>
            <h3 className="mt-[18px] text-[20px] font-bold italic leading-[27.9px] text-ink">
              {step.title}
            </h3>
            <p
              className="mt-[8px] max-w-full text-center text-[16px] leading-[18px] text-muted"
              style={{ width: step.width }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
