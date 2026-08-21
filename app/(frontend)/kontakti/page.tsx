import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import {
  getContactsPageContent,
  getFooterContent,
  getHeaderContent,
  getSiteSettings,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакти — EventAT",
  description:
    "Свържи се с екипа на EventAT — пиши ни за въпроси, партньорства или обратна връзка.",
};

export default async function KontaktiPage() {
  const [header, footer, content, settings] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getContactsPageContent(),
    getSiteSettings(),
  ]);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Header content={header} />
      <div className="flex-1">
        <ContactSection
          content={content}
          contactEmail={settings.contactEmail}
          contactAddress={settings.contactAddress}
        />
      </div>
      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
