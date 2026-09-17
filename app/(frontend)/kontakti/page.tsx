import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  pageMetadata,
  webPageJsonLd,
} from "@/lib/seo";
import {
  getContactsPageContent,
  getFooterContent,
  getHeaderContent,
  getSiteSettings,
} from "@/lib/content";

const TITLE = "Контакти — EventAT";
const DESCRIPTION =
  "Свържи се с екипа на EventAT — пиши ни за въпроси, партньорства или обратна връзка.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/kontakti",
});

export default async function KontaktiPage() {
  const [header, footer, content, settings] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
    getContactsPageContent(),
    getSiteSettings(),
  ]);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <JsonLd
        data={jsonLdGraph(
          organizationJsonLd({
            email: settings.contactEmail,
            address: settings.contactAddress,
          }),
          webPageJsonLd({
            path: "/kontakti",
            name: TITLE,
            description: DESCRIPTION,
            type: "ContactPage",
          }),
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: "Контакти", path: "/kontakti" },
          ]),
        )}
      />
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
