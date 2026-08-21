import AnchorAssist from "@/components/AnchorAssist";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import JoinCta from "@/components/JoinCta";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import {
  getFooterContent,
  getHeaderContent,
  getHomeContent,
  getServices,
} from "@/lib/content";

export default async function Home() {
  const [header, footer, home, services] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getHomeContent(),
    getServices(),
  ]);

  return (
    <main className="overflow-x-clip bg-white">
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
