import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";

import type { Service as StaticService } from "./services";
import { SERVICES as STATIC_SERVICES } from "./services";
import {
  CONTACTS_PAGE_DEFAULTS,
  FOOTER_DEFAULTS,
  HEADER_DEFAULTS,
  HOME_DEFAULTS,
  SERVICES_PAGE_DEFAULTS,
  SITE_SETTINGS_DEFAULTS,
} from "./defaults";

/**
 * Четене на съдържание през Payload Local API (без HTTP заявки).
 *
 * Всяка функция има fallback към статичните стойности в lib/defaults.ts и
 * lib/services.ts, така че липсващо поле, празна база или недостъпен Payload
 * никога не чупят страницата и не я оставят празна.
 */

type Dict = Record<string, unknown>;

const isFilled = (value: unknown): boolean =>
  value !== null && value !== undefined && value !== "";

/** Връща стойност от CMS само ако е попълнена, иначе fallback-а. */
export function pick<T>(value: unknown, fallback: T): T {
  if (Array.isArray(value)) {
    return (value.length > 0 ? value : fallback) as T;
  }
  return (isFilled(value) ? value : fallback) as T;
}

/** Изважда URL от Payload upload поле; null, ако липсва. */
export function mediaUrl(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const url = (value as { url?: unknown }).url;
  return typeof url === "string" && url.length > 0 ? url : null;
}

const getPayloadClient = cache(async () => getPayload({ config }));

async function readGlobal(slug: string, depth = 1): Promise<Dict | null> {
  try {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({ slug: slug as never, depth });
    return (doc ?? null) as Dict | null;
  } catch {
    // Няма лог с детайли — базата може да е недостъпна при build.
    return null;
  }
}

export const getSiteSettings = cache(async () => {
  const doc = (await readGlobal("site-settings")) ?? {};
  const d = SITE_SETTINGS_DEFAULTS;
  return {
    siteName: pick(doc.siteName, d.siteName),
    metaTitle: pick(doc.metaTitle, d.metaTitle),
    metaDescription: pick(doc.metaDescription, d.metaDescription),
    ogImage: mediaUrl(doc.ogImage),
    contactEmail: pick(doc.contactEmail, d.contactEmail),
    contactAddress: pick(doc.contactAddress, d.contactAddress),
  };
});

export type HeaderContent = typeof HEADER_DEFAULTS;

export const getHeaderContent = cache(async (): Promise<HeaderContent> => {
  const doc = (await readGlobal("header", 0)) ?? {};
  const d = HEADER_DEFAULTS;
  return {
    logoText: pick(doc.logoText, d.logoText),
    logoSubtext: pick(doc.logoSubtext, d.logoSubtext),
    navItems: pick(doc.navItems, d.navItems),
    ctaLabel: pick(doc.ctaLabel, d.ctaLabel),
    ctaHref: pick(doc.ctaHref, d.ctaHref),
    showFavorites:
      typeof doc.showFavorites === "boolean"
        ? doc.showFavorites
        : d.showFavorites,
  };
});

export type FooterContent = typeof FOOTER_DEFAULTS;

export const getFooterContent = cache(async (): Promise<FooterContent> => {
  const doc = (await readGlobal("footer", 0)) ?? {};
  const d = FOOTER_DEFAULTS;
  return {
    links: pick(doc.links, d.links),
    cookieSettingsLabel: pick(doc.cookieSettingsLabel, d.cookieSettingsLabel),
    copyright: pick(doc.copyright, d.copyright),
  };
});

export const getHomeContent = cache(async () => {
  const doc = (await readGlobal("home-page")) ?? {};
  const d = HOME_DEFAULTS;

  const hero = (doc.hero ?? {}) as Dict;
  const services = (doc.servicesSection ?? {}) as Dict;
  const process = (doc.processSection ?? {}) as Dict;
  const whyUs = (doc.whyUsSection ?? {}) as Dict;
  const join = (doc.joinCta ?? {}) as Dict;
  const news = (doc.newsletter ?? {}) as Dict;

  return {
    hero: {
      headingLine1: pick(hero.headingLine1, d.hero.headingLine1),
      headingHighlight: pick(hero.headingHighlight, d.hero.headingHighlight),
      headingSuffix: pick(hero.headingSuffix, d.hero.headingSuffix),
      subtitle: pick(hero.subtitle, d.hero.subtitle),
      primaryCtaLabel: pick(hero.primaryCtaLabel, d.hero.primaryCtaLabel),
      primaryCtaHref: pick(hero.primaryCtaHref, d.hero.primaryCtaHref),
      secondaryCtaLabel: pick(hero.secondaryCtaLabel, d.hero.secondaryCtaLabel),
      secondaryCtaHref: pick(hero.secondaryCtaHref, d.hero.secondaryCtaHref),
      backgroundImage: mediaUrl(hero.backgroundImage),
    },
    servicesSection: {
      eyebrow: pick(services.eyebrow, d.servicesSection.eyebrow),
      title: pick(services.title, d.servicesSection.title),
      subtitle: pick(services.subtitle, d.servicesSection.subtitle),
    },
    processSection: {
      eyebrow: pick(process.eyebrow, d.processSection.eyebrow),
      title: pick(process.title, d.processSection.title),
      subtitle: pick(process.subtitle, d.processSection.subtitle),
      steps: pick(process.steps, d.processSection.steps),
    },
    whyUsSection: {
      eyebrow: pick(whyUs.eyebrow, d.whyUsSection.eyebrow),
      title: pick(whyUs.title, d.whyUsSection.title),
      subtitle: pick(whyUs.subtitle, d.whyUsSection.subtitle),
      features: pick(whyUs.features, d.whyUsSection.features),
    },
    joinCta: {
      headingPrefix: pick(join.headingPrefix, d.joinCta.headingPrefix),
      headingHighlight: pick(join.headingHighlight, d.joinCta.headingHighlight),
      subtitle: pick(join.subtitle, d.joinCta.subtitle),
      badgeStrong: pick(join.badgeStrong, d.joinCta.badgeStrong),
      badgeRest: pick(join.badgeRest, d.joinCta.badgeRest),
      perks: pick(join.perks, d.joinCta.perks),
      formEyebrow: pick(join.formEyebrow, d.joinCta.formEyebrow),
      formTitle: pick(join.formTitle, d.joinCta.formTitle),
      tabPlanLabel: pick(join.tabPlanLabel, d.joinCta.tabPlanLabel),
      tabOfferLabel: pick(join.tabOfferLabel, d.joinCta.tabOfferLabel),
      nameLabel: pick(join.nameLabel, d.joinCta.nameLabel),
      namePlaceholder: pick(join.namePlaceholder, d.joinCta.namePlaceholder),
      emailLabel: pick(join.emailLabel, d.joinCta.emailLabel),
      emailPlaceholder: pick(join.emailPlaceholder, d.joinCta.emailPlaceholder),
      websiteLabel: pick(join.websiteLabel, d.joinCta.websiteLabel),
      websitePlaceholder: pick(
        join.websitePlaceholder,
        d.joinCta.websitePlaceholder,
      ),
      optInLabel: pick(join.optInLabel, d.joinCta.optInLabel),
      submitLabel: pick(join.submitLabel, d.joinCta.submitLabel),
      formDisclaimer: pick(join.formDisclaimer, d.joinCta.formDisclaimer),
      successTitle: pick(join.successTitle, d.joinCta.successTitle),
      successText: pick(join.successText, d.joinCta.successText),
    },
    newsletter: {
      title: pick(news.title, d.newsletter.title),
      subtitle: pick(news.subtitle, d.newsletter.subtitle),
      placeholder: pick(news.placeholder, d.newsletter.placeholder),
      buttonLabel: pick(news.buttonLabel, d.newsletter.buttonLabel),
      disclaimer: pick(news.disclaimer, d.newsletter.disclaimer),
    },
  };
});

export type HomeContent = Awaited<ReturnType<typeof getHomeContent>>;

export const getServicesPageContent = cache(async () => {
  const doc = (await readGlobal("services-page", 0)) ?? {};
  const d = SERVICES_PAGE_DEFAULTS;
  const out = {} as Record<keyof typeof d, string>;
  (Object.keys(d) as (keyof typeof d)[]).forEach((key) => {
    out[key] = pick(doc[key], d[key]);
  });
  return out;
});

export const getContactsPageContent = cache(async () => {
  const doc = (await readGlobal("contacts-page", 0)) ?? {};
  const d = CONTACTS_PAGE_DEFAULTS;
  const out = {} as Record<keyof typeof d, string>;
  (Object.keys(d) as (keyof typeof d)[]).forEach((key) => {
    out[key] = pick(doc[key], d[key]);
  });
  return out;
});

export type ContactsPageContent = Awaited<
  ReturnType<typeof getContactsPageContent>
>;

/** Нормализиран вид на услуга — еднакъв за CMS и за статичния fallback. */
export type ServiceContent = {
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  image: string;
  includes: string[];
  highlights: { title: string; text: string }[];
  seoTitle?: string;
  seoDescription?: string;
  /** По избор — заменя общия долен CTA само за тази услуга. */
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
};

const fromStatic = (s: StaticService): ServiceContent => ({
  slug: s.slug,
  title: s.title,
  shortDescription: s.tagline,
  intro: s.intro,
  image: s.image,
  includes: s.includes,
  highlights: s.highlights,
});

export const getServices = cache(async (): Promise<ServiceContent[]> => {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "services",
      where: { active: { not_equals: false } },
      sort: "order",
      limit: 100,
      depth: 1,
    });

    if (res.docs.length === 0) return STATIC_SERVICES.map(fromStatic);

    return res.docs.map((doc) => {
      const d = doc as unknown as Dict;
      const staticMatch = STATIC_SERVICES.find((s) => s.slug === d.slug);
      return {
        slug: String(d.slug ?? ""),
        title: pick(d.title, staticMatch?.title ?? ""),
        shortDescription: pick(
          d.shortDescription,
          staticMatch?.tagline ?? "",
        ),
        intro: pick(d.intro, staticMatch?.intro ?? ""),
        image:
          mediaUrl(d.heroImage) ?? staticMatch?.image ?? "/images/hero-bg.jpg",
        includes: pick(
          (d.includes as { item?: string }[] | undefined)
            ?.map((row) => row?.item ?? "")
            .filter(Boolean),
          staticMatch?.includes ?? [],
        ),
        highlights: pick(
          (d.highlights as { title?: string; text?: string }[] | undefined)
            ?.filter((row) => row?.title)
            .map((row) => ({ title: row.title ?? "", text: row.text ?? "" })),
          staticMatch?.highlights ?? [],
        ),
        seoTitle: typeof d.seoTitle === "string" ? d.seoTitle : undefined,
        seoDescription:
          typeof d.seoDescription === "string" ? d.seoDescription : undefined,
        ctaTitle: typeof d.ctaTitle === "string" ? d.ctaTitle : undefined,
        ctaSubtitle:
          typeof d.ctaSubtitle === "string" ? d.ctaSubtitle : undefined,
        ctaButtonLabel:
          typeof d.ctaButtonLabel === "string" ? d.ctaButtonLabel : undefined,
        ctaButtonHref:
          typeof d.ctaButtonHref === "string" ? d.ctaButtonHref : undefined,
      };
    });
  } catch {
    return STATIC_SERVICES.map(fromStatic);
  }
});

export async function getServiceBySlug(
  slug: string,
): Promise<ServiceContent | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}
