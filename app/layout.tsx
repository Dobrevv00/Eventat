import type { Metadata } from "next";
import { Noto_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";

// Единственият tracking код на сайта. GA4 и Meta Pixel се конфигурират
// като тагове вътре в контейнера, не като отделни снипети тук.
const GTM_ID = "GTM-5RDG9GVR";

// Consent Mode v2 — изпълнява се ПРЕДИ GTM. По подразбиране всичко е
// "denied"; ако посетителят вече е избрал, възстановяваме избора му веднага,
// за да не тръгнат таговете постоянно отказани.
const CONSENT_DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try{
  var stored = window.localStorage.getItem('eventat-cookie-consent');
  if(stored){
    var c = JSON.parse(stored);
    gtag('consent','update',{
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied'
    });
  }
}catch(e){}
`;

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = "EventAT — Планирай своето събитие";
const DESCRIPTION =
  "Резервирай проверени изпълнители за сватби, рождени дни и корпоративни събития със сигурни плащания през платформата.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "EventAT",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EventAT — Твоето следващо незабравимо събитие започва тук",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${notoSans.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        <Script id="consent-mode-defaults" strategy="beforeInteractive">
          {CONSENT_DEFAULTS}
        </Script>
        <Script id="gtm-base" strategy="afterInteractive">
          {GTM_SNIPPET}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
