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
      {/* Мобилно: компактни редове (икона вляво). От sm нагоре: оригиналната мрежа. */}
      <div className="mx-auto mt-[32px] grid w-full max-w-[520px] grid-cols-1 gap-y-[26px] px-[24px] sm:mt-[40px] sm:max-w-[1132px] sm:grid-cols-2 sm:gap-y-[48px] lg:mt-[47px] lg:grid-cols-3 lg:px-0">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="flex items-start gap-[16px] sm:flex-col sm:items-center sm:gap-0 sm:pt-[8px]"
            style={
              {
                "--feature-text-width": `${WHY_US_FEATURE_WIDTHS[i] ?? 220}px`,
              } as React.CSSProperties
            }
          >
            <div className="flex size-[58px] shrink-0 items-center justify-center rounded-full border border-[rgba(127,100,174,0.16)] bg-white drop-shadow-[0px_8px_10px_rgba(102,77,146,0.08)] sm:size-[84px] sm:drop-shadow-[0px_10px_13px_rgba(102,77,146,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                src={
                  FEATURE_ICONS[feature.icon ?? ""] ??
                  FEATURE_ICONS.payments
                }
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="size-[24px] sm:size-[32px]"
              />
            </div>
            <div className="min-w-0 flex-1 pt-[4px] sm:flex sm:flex-col sm:items-center sm:pt-0">
              <h3 className="text-[18px] font-bold italic leading-[26px] tracking-[-0.2px] text-ink sm:mt-[23px] sm:text-[20px] sm:leading-[31px]">
                {feature.title}
              </h3>
              <p className="mt-[2px] text-[14px] leading-[20px] text-muted sm:mt-[4px] sm:w-(--feature-text-width) sm:text-center">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
