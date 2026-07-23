import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SERVICES, getService } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) {
    return { title: "Услугата не е намерена — EventAT" };
  }
  return {
    title: `${service.title} — EventAT`,
    description: service.intro,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.95) 0%, rgba(255,235,249,0.9) 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pt-[40px] pb-[48px]">
          <nav className="text-[13px] leading-[20px] text-muted">
            <a href="/#uslugi" className="transition-colors hover:text-plum">
              Услуги
            </a>
            <span className="mx-[8px] text-lilac">/</span>
            <span className="text-ink">{service.title}</span>
          </nav>

          <div className="mt-[28px] flex flex-col gap-[28px] lg:flex-row lg:items-center lg:gap-[40px]">
            <div className="lg:flex-1">
              <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
                УСЛУГА
              </p>
              <h1 className="mt-[12px] text-[32px] font-bold italic leading-[36px] tracking-[-0.5px] text-ink lg:text-[40px] lg:leading-[44px]">
                {service.title}
              </h1>
              <p className="mt-[10px] text-[18px] italic leading-[26px] text-plum">
                {service.tagline}
              </p>
              <p className="mt-[16px] max-w-[520px] text-[16px] leading-[25.6px] text-muted">
                {service.intro}
              </p>
              <div className="mt-[28px] flex flex-col gap-[12px] sm:flex-row">
                <a
                  href="/#form-plan"
                  className="flex h-[50px] w-full max-w-[280px] items-center justify-center rounded-[12px] bg-violet px-[24px] text-[15px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum sm:w-auto"
                >
                  Планирам събитие
                </a>
                <a
                  href="/#uslugi"
                  className="flex h-[50px] w-full max-w-[280px] items-center justify-center rounded-[12px] border border-line bg-white px-[24px] text-[15px] font-bold italic text-plum transition-colors hover:bg-[#f3edf8] sm:w-auto"
                >
                  Всички услуги
                </a>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-[18px] border border-line shadow-[0px_10px_28px_0px_rgba(102,77,146,0.12)] lg:w-[440px] lg:shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={service.title}
                src={service.image}
                className="h-[280px] w-full object-cover lg:h-[320px]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1">
        {/* Какво включва */}
        <section className="mx-auto w-full max-w-[1132px] px-[24px] pt-[56px]">
          <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
            КАКВО ВКЛЮЧВА
          </p>
          <h2 className="mt-[10px] text-[26px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[30px]">
            Всичко за {service.title.toLowerCase()}
          </h2>
          <ul className="mt-[28px] grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-[12px] rounded-[14px] border border-line bg-white p-[18px] shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)]"
              >
                <span className="mt-[1px] flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#f4eff5] text-[13px] text-plum">
                  ✓
                </span>
                <span className="text-[15px] leading-[21px] text-ink">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Защо през EventAT */}
        <section className="mx-auto w-full max-w-[1132px] px-[24px] pt-[56px] pb-[72px]">
          <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
            ЗАЩО ПРЕЗ EVENTAT
          </p>
          <h2 className="mt-[10px] text-[26px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[30px]">
            Спокойствие на всяка стъпка
          </h2>
          <div className="mt-[28px] grid grid-cols-1 gap-[20px] sm:grid-cols-3">
            {service.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-[18px] border border-line bg-white p-[24px] shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)]"
              >
                <h3 className="text-[18px] font-bold italic leading-[24px] text-ink">
                  {highlight.title}
                </h3>
                <p className="mt-[8px] text-[14px] leading-[21px] text-muted">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-[40px] overflow-hidden rounded-[22px] px-[32px] py-[40px] text-center"
            style={{
              backgroundImage:
                "linear-gradient(145.36deg, #1f1633 0%, #3a2a64 50%, #1f1633 100%)",
            }}
          >
            <h2 className="text-[24px] font-bold italic leading-[32px] text-white lg:text-[28px]">
              Готов ли си за {service.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-[10px] max-w-[520px] text-[15px] leading-[23px] text-white/72">
              Запиши се в листата и бъди сред първите, които ще резервират
              проверени изпълнители през EventAT.
            </p>
            <a
              href="/#form-plan"
              className="mt-[24px] inline-flex h-[50px] items-center justify-center rounded-[12px] bg-white px-[28px] text-[15px] font-bold italic text-plum transition-colors hover:bg-[#f3edf8]"
            >
              Резервирай своето място
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
