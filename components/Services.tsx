import SectionHeading from "./SectionHeading";
import { SERVICES } from "@/lib/services";

export default function Services() {
  return (
    <section
      id="uslugi"
      className="mx-auto mt-[56px] w-full max-w-[1132px] scroll-mt-[88px] px-[24px] lg:px-0"
    >
      <SectionHeading
        eyebrow="УСЛУГИ"
        title="За всеки специален момент"
        subtitle="От професионални DJ-и до елегантна украса - намери перфектния избор за твоето събитие."
      />
      <div className="mt-[40px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:mt-[64px] lg:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.slug}
            href={`/uslugi/${service.slug}`}
            className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0px_12px_28px_0px_rgba(102,77,146,0.14)]"
          >
            <div className="h-[271.5px] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={service.title}
                src={service.image}
                className="size-full object-cover"
              />
            </div>
            <div className="flex h-[68px] flex-col justify-center gap-[2px] px-[16px]">
              <h3 className="text-[20px] font-bold italic leading-[19.5px] text-ink">
                {service.title}
              </h3>
              <p className="text-[14px] leading-[18.6px] text-muted">
                {service.tagline}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
