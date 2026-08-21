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
      <div className="mx-auto mt-[45px] flex max-w-[420px] flex-col gap-[40px] px-[24px] xl:relative xl:block xl:h-[186px] xl:w-[1158px] xl:max-w-none xl:px-0">
        <div className="absolute left-[136px] top-[38px] hidden h-[2px] w-[860px] bg-lilac opacity-50 xl:block" />
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col items-center xl:absolute xl:top-[8px] xl:w-[291px]"
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
              style={{ width: PROCESS_STEP_WIDTHS[i] ?? 243 }}
            >
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
