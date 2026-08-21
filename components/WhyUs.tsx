import SectionHeading from "./SectionHeading";
import {
  FEATURE_ICONS,
  HOME_DEFAULTS,
  WHY_US_FEATURE_WIDTHS,
} from "@/lib/defaults";

type WhyUsProps = {
  content?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    features: { icon?: string; title: string; text: string }[];
  };
};

export default function WhyUs({ content }: WhyUsProps) {
  const c = content ?? HOME_DEFAULTS.whyUsSection;
  const features = c.features?.length
    ? c.features
    : HOME_DEFAULTS.whyUsSection.features;

  return (
    <section className="bg-white pt-[56px] pb-[56px] lg:h-[752px] lg:pb-0">
      <SectionHeading
        eyebrow={c.eyebrow}
        title={c.title}
        subtitle={c.subtitle}
      />
      <div className="mx-auto mt-[40px] grid w-full max-w-[1132px] grid-cols-1 gap-y-[48px] px-[24px] sm:grid-cols-2 lg:mt-[47px] lg:grid-cols-3 lg:px-0">
        {features.map((feature, i) => (
          <div key={feature.title} className="flex flex-col items-center pt-[8px]">
            <div className="flex size-[84px] items-center justify-center rounded-full border border-[rgba(127,100,174,0.16)] bg-white drop-shadow-[0px_10px_13px_rgba(102,77,146,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={
                  FEATURE_ICONS[feature.icon ?? ""] ??
                  FEATURE_ICONS.payments
                }
                className="size-[32px]"
              />
            </div>
            <h3 className="mt-[23px] text-[20px] font-bold italic leading-[31px] tracking-[-0.2px] text-ink">
              {feature.title}
            </h3>
            <p
              className="mt-[4px] text-center text-[14px] leading-[20px] text-muted"
              style={{ width: WHY_US_FEATURE_WIDTHS[i] ?? 220 }}
            >
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
