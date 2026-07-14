import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Контакти — EventAT",
  description:
    "Свържи се с екипа на EventAT — пиши ни за въпроси, партньорства или обратна връзка.",
};

export default function KontaktiPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <div className="flex-1">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
