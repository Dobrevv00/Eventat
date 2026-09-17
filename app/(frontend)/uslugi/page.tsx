import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Services from "@/components/Services";
import {
  getFooterContent,
  getHeaderContent,
  getHomeContent,
  getServices,
  getServicesPageContent,
} from "@/lib/content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  jsonLdGraph,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const TITLE = "Услуги за сватби, рождени дни и събития — EventAT";
const HEADING = "Услуги за сватби, рождени дни и събития";
const DESCRIPTION =
  "DJ-и и музиканти, фотографи, декорация, фотобудки, кетъринг и танцови изпълнители — всички услуги за твоето събитие на едно място в EventAT.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/uslugi",
});

export default async function ServicesIndexPage() {
  const [header, footer, home, services, page] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getHomeContent(),
    getServices(),
    getServicesPageContent(),
  ]);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <JsonLd
        data={jsonLdGraph(
          webPageJsonLd({
            path: "/uslugi",
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
            extra: {
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: services.length,
                itemListElement: services.map((service, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: service.title,
                  url: absoluteUrl(`/uslugi/${service.slug}`),
                })),
              },
            },
          }),
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: page.breadcrumbLabel, path: "/uslugi" },
          ]),
        )}
      />
      <Header content={header} />

      <section
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.95) 0%, rgba(255,235,249,0.9) 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[1132px] px-[24px] pt-[40px] pb-[48px] lg:px-0">
          <nav
            aria-label="Навигация"
            className="text-[13px] leading-[20px] text-muted"
          >
            <a href="/" className="fx-link">
              Начало
            </a>
            <span className="mx-[8px] text-lilac">/</span>
            <span aria-current="page" className="text-ink">
              {page.breadcrumbLabel}
            </span>
          </nav>
          <p className="mt-[28px] text-[12px] leading-[14px] tracking-[2px] text-plum">
            {home.servicesSection.eyebrow}
          </p>
          <h1 className="mt-[12px] max-w-[760px] text-[32px] font-bold italic leading-[36px] tracking-[-0.5px] text-ink lg:text-[40px] lg:leading-[44px]">
            {HEADING}
          </h1>
          <p className="mt-[12px] max-w-[620px] text-[16px] leading-[25.6px] text-muted">
            {home.servicesSection.subtitle}
          </p>
        </div>
      </section>

      <div className="flex-1 pb-[72px]">
        <Services services={services} showHeading={false} />

        <div className="mx-auto w-full max-w-[1132px] px-[24px] lg:px-0">
          <div
            className="mt-[56px] overflow-hidden rounded-[22px] px-[20px] py-[36px] text-center sm:px-[32px] sm:py-[40px]"
            style={{
              backgroundImage:
                "linear-gradient(145.36deg, #1f1633 0%, #3a2a64 50%, #1f1633 100%)",
            }}
          >
            <h2 className="text-[24px] font-bold italic leading-[32px] text-white lg:text-[28px]">
              {page.bottomCtaTitlePrefix} своето събитие?
            </h2>
            <p className="mx-auto mt-[10px] max-w-[520px] text-[15px] leading-[23px] text-white/72">
              {page.bottomCtaSubtitle}
            </p>
            <a
              href={page.bottomCtaButtonHref}
              className="fx-btn-soft mt-[24px] inline-flex h-[50px] w-full items-center justify-center rounded-[12px] bg-white px-[28px] text-[15px] font-bold italic text-plum [--fx-shadow:var(--color-blush)] sm:w-auto"
            >
              {page.bottomCtaButtonLabel}
            </a>
          </div>
        </div>
      </div>

      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
