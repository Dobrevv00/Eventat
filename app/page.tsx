import AnchorAssist from "@/components/AnchorAssist";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import JoinCta from "@/components/JoinCta";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-white">
      <AnchorAssist />
      <Header />
      <Hero />
      <Services />
      <Process />
      <WhyUs />
      <JoinCta />
      <Newsletter />
      <Footer />
    </main>
  );
}
