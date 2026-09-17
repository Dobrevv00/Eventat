import type { Metadata } from "next";
import AnchorAssist from "@/components/AnchorAssist";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import JoinCta from "@/components/JoinCta";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  getFooterContent,
  getHeaderContent,
  getHomeContent,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import {
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  SHARE_DESCRIPTION,
  SHARE_TITLE,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return pageMetadata({
    title: settings.metaTitle,
    description: settings.metaDescription,
    path: "/",
    shareTitle: SHARE_TITLE,
    shareDescription: SHARE_DESCRIPTION,
    ...(settings.ogImage
      ? { image: { url: settings.ogImage, alt: settings.siteName } }
      : {}),
  });
}

export default async function Home() {
  const [header, footer, home, services, settings] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getHomeContent(),
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <main className="overflow-x-clip bg-white">
      <JsonLd
        data={jsonLdGraph(
          organizationJsonLd({
            email: settings.contactEmail,
            address: settings.contactAddress,
          }),
          websiteJsonLd(),
          webPageJsonLd({
            path: "/",
            name: settings.metaTitle,
            description: settings.metaDescription,
          }),
        )}
      />
      <AnchorAssist />
      <Header content={header} />
      <Hero content={home.hero} />
      <Services heading={home.servicesSection} services={services} />
      <Process content={home.processSection} />
      <WhyUs content={home.whyUsSection} />
      <JoinCta content={home.joinCta} />
      <Newsletter content={home.newsletter} />
      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
