import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getFooterContent,
  getHeaderContent,
  getServiceBySlug,
  getServices,
  getServicesPageContent,
} from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  jsonLdGraph,
  pageMetadata,
  serviceJsonLd,
  serviceSeoTitle,
  trimDescription,
  webPageJsonLd,
} from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return { title: "Страницата не е намерена — EventAT" };
  }
  return pageMetadata({
    title: service.seoTitle || serviceSeoTitle(service.title),
    description: service.seoDescription || trimDescription(service.intro),
    path: `/uslugi/${service.slug}`,
    shareTitle: `${service.title} — EventAT`,
    shareDescription: trimDescription(service.intro, 150),
    image: service.image ? { url: service.image, alt: service.title } : undefined,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const [service, services, header, footer, page] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getHeaderContent(),
    getFooterContent(),
    getServicesPageContent(),
  ]);

  if (!service) {
    notFound();
  }

  const path = `/uslugi/${service.slug}`;
  const description = service.seoDescription || trimDescription(service.intro);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <JsonLd
        data={jsonLdGraph(
          serviceJsonLd({
            slug: service.slug,
            title: service.title,
            description: service.intro,
            image: service.image,
            includes: service.includes,
          }),
          webPageJsonLd({
            path,
            name: service.seoTitle || serviceSeoTitle(service.title),
            description,
            extra: {
              mainEntity: { "@id": `${absoluteUrl(path)}#service` },
              ...(service.updatedAt ? { dateModified: service.updatedAt } : {}),
            },
          }),
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: page.breadcrumbLabel, path: "/uslugi" },
            { name: service.title, path },
          ]),
        )}
      />
      <Header content={header} />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.95) 0%, rgba(255,235,249,0.9) 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pt-[40px] pb-[48px]">
          <nav
            aria-label="Навигация"
            className="text-[13px] leading-[20px] text-muted"
          >
            <a href="/" className="fx-link">
              Начало
            </a>
            <span className="mx-[8px] text-lilac">/</span>
            <a href="/uslugi" className="fx-link">
              {page.breadcrumbLabel}
            </a>
            <span className="mx-[8px] text-lilac">/</span>
            <span aria-current="page" className="text-ink">
              {service.title}
            </span>
          </nav>

          <div className="mt-[28px] flex flex-col gap-[28px] lg:flex-row lg:items-center lg:gap-[40px]">
            <div className="lg:flex-1">
              <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
                {page.eyebrow}
              </p>
              <h1 className="mt-[12px] text-[32px] font-bold italic leading-[36px] tracking-[-0.5px] text-ink lg:text-[40px] lg:leading-[44px]">
                {service.title}
              </h1>
              <p className="mt-[10px] text-[18px] italic leading-[26px] text-plum">
                {service.shortDescription}
              </p>
              <p className="mt-[16px] max-w-[520px] text-[16px] leading-[25.6px] text-muted">
                {service.intro}
              </p>
              <div className="mt-[28px] flex flex-col gap-[12px] sm:flex-row">
                <a
                  href={page.primaryCtaHref}
                  className="fx-btn flex h-[50px] w-full items-center justify-center rounded-[12px] bg-violet px-[24px] text-[15px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] sm:w-auto"
                >
                  {page.primaryCtaLabel}
                </a>
                <a
                  href={page.secondaryCtaHref}
                  className="fx-btn-soft flex h-[50px] w-full items-center justify-center rounded-[12px] border border-line bg-white px-[24px] text-[15px] font-bold italic text-plum sm:w-auto"
                >
                  {page.secondaryCtaLabel}
                </a>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-[18px] border border-line shadow-[0px_10px_28px_0px_rgba(102,77,146,0.12)] lg:w-[440px] lg:shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={service.title}
                src={service.image}
                width={814}
                height={543}
                fetchPriority="high"
                decoding="async"
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
            {page.includesEyebrow}
          </p>
          <h2 className="mt-[10px] text-[26px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[30px]">
            {page.includesTitlePrefix} {service.title.toLowerCase()}
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
            {page.whyEyebrow}
          </p>
          <h2 className="mt-[10px] text-[26px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[30px]">
            {page.whyTitle}
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

          {/* Други услуги — вътрешни връзки между страниците на услугите */}
          {otherServices.length > 0 && (
            <div className="mt-[56px]">
              <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
                ОЩЕ УСЛУГИ
              </p>
              <div className="mt-[10px] flex flex-wrap items-end justify-between gap-x-[24px] gap-y-[8px]">
                <h2 className="text-[26px] font-bold italic leading-[30px] tracking-[-0.34px] text-ink lg:text-[30px]">
                  Разгледай и други услуги
                </h2>
                <a
                  href="/uslugi"
                  className="fx-link text-[15px] leading-[22px] text-plum"
                >
                  Всички услуги →
                </a>
              </div>
              <ul className="mt-[24px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-5">
                {otherServices.map((other) => (
                  <li key={other.slug} className="fx-card rounded-[14px]">
                    <a
                      href={`/uslugi/${other.slug}`}
                      className="block h-full overflow-hidden rounded-[14px] border border-line bg-white shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)]"
                    >
                      <div className="fx-card-media h-[110px] w-full overflow-hidden sm:h-[130px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={other.title}
                          src={other.image}
                          width={814}
                          height={543}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover"
                        />
                      </div>
                      <h3 className="fx-card-title px-[12px] py-[10px] text-[15px] font-bold italic leading-[19px] text-ink">
                        {other.title}
                      </h3>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="mt-[40px] overflow-hidden rounded-[22px] px-[20px] py-[36px] text-center sm:px-[32px] sm:py-[40px]"
            style={{
              backgroundImage:
                "linear-gradient(145.36deg, #1f1633 0%, #3a2a64 50%, #1f1633 100%)",
            }}
          >
            <h2 className="text-[24px] font-bold italic leading-[32px] text-white lg:text-[28px]">
              {service.ctaTitle ||
                `${page.bottomCtaTitlePrefix} ${service.title.toLowerCase()}?`}
            </h2>
            <p className="mx-auto mt-[10px] max-w-[520px] text-[15px] leading-[23px] text-white/72">
              {service.ctaSubtitle || page.bottomCtaSubtitle}
            </p>
            <a
              href={service.ctaButtonHref || page.bottomCtaButtonHref}
              className="fx-btn-soft mt-[24px] inline-flex h-[50px] w-full items-center justify-center rounded-[12px] bg-white px-[28px] sm:w-auto text-[15px] font-bold italic text-plum [--fx-shadow:var(--color-blush)]"
            >
              {service.ctaButtonLabel || page.bottomCtaButtonLabel}
            </a>
          </div>
        </section>
      </div>

      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
