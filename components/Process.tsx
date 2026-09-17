import SectionHeading from "./SectionHeading";
import { HOME_DEFAULTS, PROCESS_STEP_WIDTHS } from "@/lib/defaults";

type ProcessProps = {
  content?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { number: string; title: string; text: string }[];
  };
};

export default function Process({ content }: ProcessProps) {
  const c = content ?? HOME_DEFAULTS.processSection;
  const steps = c.steps?.length ? c.steps : HOME_DEFAULTS.processSection.steps;

  return (
    <section
      id="kak-raboti"
      className="mt-[64px] scroll-mt-[70px] bg-[#fbf6fa] pt-[56px] pb-[56px] lg:mt-[88px] xl:h-[440px] xl:pb-0"
    >
      <SectionHeading
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      {/*
        Мобилно: вертикална времева линия (номер вляво, текст вдясно).
        Таблет: 2×2. Desktop (xl): оригиналната хоризонтална композиция.
      */}
      <div className="mx-auto mt-[36px] grid max-w-[520px] grid-cols-1 px-[24px] md:mt-[45px] md:max-w-[760px] md:grid-cols-2 md:gap-x-[48px] md:gap-y-[40px] xl:relative xl:block xl:h-[186px] xl:w-[1158px] xl:max-w-none xl:px-0">
        <div className="absolute left-[136px] top-[38px] hidden h-[2px] w-[860px] bg-lilac opacity-50 xl:block" />
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          return (
            <div
              key={step.number}
              className="flex items-stretch gap-[16px] xl:absolute xl:top-[8px] xl:left-(--step-left) xl:w-[291px] xl:flex-col xl:items-center xl:gap-0"
              style={
                {
                  "--step-left": `${i * 291 - 16}px`,
                  "--step-text-width": `${PROCESS_STEP_WIDTHS[i] ?? 243}px`,
                } as React.CSSProperties
              }
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex size-[48px] items-center justify-center rounded-full border-2 border-lilac bg-white md:size-[56px]">
                  <span className="font-noto text-[19px] font-bold text-plum md:text-[22px]">
                    {step.number}
                  </span>
                </div>
                {!isLast && (
                  <div
                    aria-hidden
                    className="my-[6px] min-h-[20px] w-[2px] flex-1 rounded-full bg-lilac opacity-50 md:hidden"
                  />
                )}
              </div>
              <div
                className={`min-w-0 flex-1 pt-[10px] md:pt-[14px] xl:flex xl:flex-col xl:items-center xl:pt-0 ${
                  isLast ? "" : "pb-[22px] md:pb-0"
                }`}
              >
                <h3 className="text-[19px] font-bold italic leading-[26px] text-ink xl:mt-[18px] xl:text-[20px] xl:leading-[27.9px]">
                  {step.title}
                </h3>
                <p className="mt-[4px] text-[15px] leading-[22px] text-muted xl:mt-[8px] xl:w-(--step-text-width) xl:max-w-full xl:text-center xl:text-[16px] xl:leading-[18px]">
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
