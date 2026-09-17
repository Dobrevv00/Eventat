import type { Metadata } from "next";

/** Основният домейн (eventat.bg пренасочва към www). */
const PRODUCTION_URL = "https://www.eventat.bg";

/**
 * Абсолютен адрес на сайта за og:image, og:url, canonical и sitemap.
 * Без NEXT_PUBLIC_SITE_URL продукцията досега връщаше http://localhost:3000
 * и снимката при споделяне не се зареждаше във Facebook/Viber.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Preview deploy-ите във Vercel не бива да влизат в Google. */
export const IS_INDEXABLE =
  process.env.VERCEL_ENV === undefined ||
  process.env.VERCEL_ENV === "production";

export const SITE_NAME = "EventAT";
export const LEGAL_NAME = "ЧЕРИ ЕСТЕЙТ ЕООД";
const COMPANY_ID = "202013913";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO = { url: "/icons/icon-512.png", width: 512, height: 512 };

/**
 * Текстове за споделяне на началната страница. Заглавието повтаря надписа
 * върху самата картинка, а описанието е кратко (под 120 знака), за да не се
 * отрязва във Facebook, Messenger, Viber и LinkedIn.
 */
export const SHARE_TITLE = "Твоето следващо незабравимо събитие започва тук";
export const SHARE_DESCRIPTION =
  "DJ-и, фотографи, декорация и кетъринг на едно място. Проверени изпълнители и сигурни плащания през EventAT.";

export const DEFAULT_SHARE_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "EventAT — Твоето следващо незабравимо събитие започва тук",
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Съкращава текст до дължината, която Google показва (~160 знака), като
 * реже по край на изречение или дума — никога по средата на дума.
 */
export function trimDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const sentenceEnd = Math.max(
    cut.lastIndexOf(". "),
    cut.lastIndexOf("! "),
    cut.lastIndexOf("? "),
  );
  if (sentenceEnd >= max / 2) return cut.slice(0, sentenceEnd + 1);

  const space = cut.lastIndexOf(" ");
  const words = cut.slice(0, space > 0 ? space : max - 1);
  return `${words.replace(/[\s,;:—–-]+$/, "")}…`;
}

/** Заглавие за Google на страница на услуга, ако в CMS няма собствено. */
export function serviceSeoTitle(serviceTitle: string): string {
  return `${serviceTitle} за сватби и събития — ${SITE_NAME}`;
}

type ShareImage = { url: string; width?: number; height?: number; alt?: string };

type SiteSeoSettings = {
  metaTitle: string;
  metaDescription: string;
  ogImage: string | null;
};

/**
 * Общи метаданни за всички страници (layout). Отделните страници добавят
 * собствени заглавие, описание, og:url и canonical чрез pageMetadata().
 */
export function baseMetadata(settings: SiteSeoSettings): Metadata {
  const image = settings.ogImage
    ? { url: settings.ogImage, alt: SITE_NAME }
    : DEFAULT_SHARE_IMAGE;
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE_URL),
    title: settings.metaTitle,
    description: settings.metaDescription,
    applicationName: SITE_NAME,
    publisher: LEGAL_NAME,
    category: "events",
    formatDetection: { telephone: false, email: false, address: false },
    robots: IS_INDEXABLE
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    openGraph: {
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      siteName: SITE_NAME,
      locale: "bg_BG",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: SHARE_TITLE,
      description: SHARE_DESCRIPTION,
      images: [image.url],
    },
  };
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Път на страницата, напр. "/kontakti". */
  path: string;
  shareTitle?: string;
  shareDescription?: string;
  image?: ShareImage;
};

/**
 * Метаданни за конкретна страница. Всяка страница има собствени og:url и
 * canonical — иначе Facebook третира споделен линк към подстраница като
 * началната страница.
 */
export function pageMetadata({
  title,
  description,
  path,
  shareTitle = title,
  shareDescription = description,
  image = DEFAULT_SHARE_IMAGE,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: path,
      siteName: SITE_NAME,
      locale: "bg_BG",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [image.url],
    },
  };
}

// ---------------------------------------------------------------------------
// Структурирани данни (schema.org JSON-LD) — помагат на Google да разбере
// кой стои зад сайта, какви услуги има и как са подредени страниците.
// ---------------------------------------------------------------------------

type JsonLdNode = Record<string, unknown>;

export function jsonLdGraph(...nodes: JsonLdNode[]): JsonLdNode {
  return { "@context": "https://schema.org", "@graph": nodes };
}

const COUNTRY = { "@type": "Country", name: "България" };

/** „гр. София, бул. Свети Наум 30, етаж 5“ → структуриран адрес. */
function postalAddress(address: string): JsonLdNode {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  const cityIndex = parts.findIndex((part) => /^(гр\.|град)\s*/i.test(part));
  const locality =
    cityIndex >= 0 ? parts[cityIndex].replace(/^(гр\.|град)\s*/i, "") : undefined;
  const street = parts.filter((_, i) => i !== cityIndex).join(", ");

  return {
    "@type": "PostalAddress",
    ...(street ? { streetAddress: street } : {}),
    ...(locality ? { addressLocality: locality } : {}),
    addressCountry: "BG",
  };
}

export function organizationJsonLd(contact: {
  email: string;
  address: string;
}): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "ЕИК",
      value: COMPANY_ID,
    },
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO.url),
      width: LOGO.width,
      height: LOGO.height,
    },
    image: absoluteUrl(DEFAULT_SHARE_IMAGE.url),
    email: contact.email,
    address: postalAddress(contact.address),
    areaServed: COUNTRY,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      availableLanguage: ["bg"],
      areaServed: "BG",
    },
  };
}

export function websiteJsonLd(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage: "bg-BG",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
  extra = {},
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  extra?: JsonLdNode;
}): JsonLdNode {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "bg-BG",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...extra,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  description: string;
  image: string;
  includes: string[];
}): JsonLdNode {
  const url = absoluteUrl(`/uslugi/${service.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url,
    image: absoluteUrl(service.image),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: COUNTRY,
    ...(service.includes.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} — какво включва`,
            itemListElement: service.includes.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }
      : {}),
  };
}
