import path from "path";
import { fileURLToPath } from "url";
import type { Payload } from "payload";

import { SERVICES } from "../services";
import {
  CONTACTS_PAGE_DEFAULTS,
  FOOTER_DEFAULTS,
  HEADER_DEFAULTS,
  HOME_DEFAULTS,
  LEGACY_SEO_DEFAULTS,
  SERVICES_PAGE_DEFAULTS,
  SITE_SETTINGS_DEFAULTS,
} from "../defaults";

const filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(filename), "../..");

/**
 * Първоначално попълване на CMS с ТОЧНО текущото съдържание на сайта.
 *
 * Идемпотентност:
 *  • Globals — пазят скрит флаг `seeded`. Ако е вдигнат, се пропускат изцяло,
 *    така че по-късните редакции на клиента никога не се презаписват.
 *  • Services — записва се само услуга, чийто slug още не съществува.
 *    Съществуващите не се докосват.
 *  • Media — файл със същото име не се качва повторно.
 */

async function ensureMedia(
  payload: Payload,
  filenameOnly: string,
  alt: string,
): Promise<number | null> {
  try {
    const existing = await payload.find({
      collection: "media",
      where: { filename: { equals: filenameOnly } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) {
      return Number(existing.docs[0].id);
    }

    const created = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.join(projectRoot, "public", "images", filenameOnly),
      overrideAccess: true,
    });

    return Number(created.id);
  } catch {
    // Липсващ файл или проблем с upload не бива да спира останалия seed.
    payload.logger.warn(`[seed] media skipped: ${filenameOnly}`);
    return null;
  }
}

/**
 * Версия на началното съдържание. Увеличава се, когато се добавят НОВИ полета,
 * които трябва да получат стойност в вече засети Globals.
 */
const SEED_VERSION = 4;

/** Seed-ът работи при старт, извън заявка — без прегенериране на страници. */
const SEED_CONTEXT = { disableRevalidate: true };

type GlobalSlug =
  | "site-settings"
  | "header"
  | "footer"
  | "home-page"
  | "services-page"
  | "contacts-page";

/**
 * Заменя стойност САМО ако в CMS още стои старият текст по подразбиране.
 * Ако клиентът е написал свой текст, той остава непроменен.
 */
class ReplaceIfUnchanged {
  constructor(
    readonly from: string,
    readonly to: string,
  ) {}
}

/**
 * Точкови допълнения след версия 2: само ключовете, добавени в съответната
 * версия. Така поле, което клиентът умишлено е изчистил, не се попълва
 * отново при следващо вдигане на версията.
 */
const VERSION_BACKFILLS: Record<
  number,
  Partial<Record<GlobalSlug, Record<string, unknown>>>
> = {
  3: {
    "home-page": {
      joinCta: {
        socialLabel: HOME_DEFAULTS.joinCta.socialLabel,
        socialPlaceholder: HOME_DEFAULTS.joinCta.socialPlaceholder,
      },
    },
  },
  // SEO: по-информативни заглавие и описание на началната страница.
  4: {
    "site-settings": {
      metaTitle: new ReplaceIfUnchanged(
        LEGACY_SEO_DEFAULTS.metaTitle,
        SITE_SETTINGS_DEFAULTS.metaTitle,
      ),
      metaDescription: new ReplaceIfUnchanged(
        LEGACY_SEO_DEFAULTS.metaDescription,
        SITE_SETTINGS_DEFAULTS.metaDescription,
      ),
    },
    // „Всички услуги“ води към новата страница /uslugi.
    "services-page": {
      secondaryCtaHref: new ReplaceIfUnchanged(
        LEGACY_SEO_DEFAULTS.servicesSecondaryCtaHref,
        SERVICES_PAGE_DEFAULTS.secondaryCtaHref,
      ),
    },
  },
};

const isEmpty = (value: unknown): boolean =>
  value === null ||
  value === undefined ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

/**
 * Връща обект с ключовете на defaults, като запазва вече съществуващите
 * стойности и попълва само липсващите. Никога не презаписва въведен текст.
 */
function fillMissing(
  existing: Record<string, unknown> | undefined,
  defaults: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, fallback] of Object.entries(defaults)) {
    const current = existing?.[key];

    if (
      fallback !== null &&
      typeof fallback === "object" &&
      !Array.isArray(fallback)
    ) {
      out[key] = fillMissing(
        (current ?? {}) as Record<string, unknown>,
        fallback as Record<string, unknown>,
      );
      continue;
    }

    out[key] = isEmpty(current) ? fallback : current;
  }

  return out;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/**
 * Копие на existing, в което са попълнени САМО празните ключове от patch.
 * Всички останали стойности в засегнатите групи се запазват непроменени.
 */
function withBackfill(
  existing: unknown,
  patch: Record<string, unknown>,
): Record<string, unknown> {
  const base = isPlainObject(existing) ? existing : {};
  const out: Record<string, unknown> = { ...base };

  for (const [key, fallback] of Object.entries(patch)) {
    if (fallback instanceof ReplaceIfUnchanged) {
      if (isEmpty(base[key]) || base[key] === fallback.from) {
        out[key] = fallback.to;
      }
    } else if (isPlainObject(fallback)) {
      out[key] = withBackfill(base[key], fallback);
    } else if (isEmpty(base[key])) {
      out[key] = fallback;
    }
  }

  return out;
}

/** Събира точковите допълнения за всички версии след `fromVersion`. */
function versionBackfill(
  slug: GlobalSlug,
  current: Record<string, unknown>,
  fromVersion: number,
): Record<string, unknown> {
  const next: Record<string, unknown> = {};

  for (let v = fromVersion + 1; v <= SEED_VERSION; v++) {
    const patch = VERSION_BACKFILLS[v]?.[slug];
    if (!patch) continue;

    for (const [key, value] of Object.entries(patch)) {
      const base = key in next ? next[key] : current[key];
      if (value instanceof ReplaceIfUnchanged) {
        if (isEmpty(base) || base === value.from) next[key] = value.to;
      } else if (isPlainObject(value)) {
        next[key] = withBackfill(base, value);
      } else if (isEmpty(base)) {
        next[key] = value;
      }
    }
  }

  return next;
}

async function seedGlobal(
  payload: Payload,
  slug: GlobalSlug,
  data: Record<string, unknown>,
): Promise<"seeded" | "backfilled" | "skipped"> {
  const current = (await payload.findGlobal({
    slug,
    depth: 0,
    overrideAccess: true,
  })) as unknown as Record<string, unknown>;

  // Първо попълване — глобалът още е празен.
  if (!current?.seeded) {
    await payload.updateGlobal({
      slug,
      data: { ...data, seeded: true, seedVersion: SEED_VERSION },
      overrideAccess: true,
      context: SEED_CONTEXT,
    });
    return "seeded";
  }

  // Добавени са нови полета след предишния seed — попълваме САМО празните.
  // От версия 2 нататък допълваме единствено новодобавените ключове.
  const version = Number(current.seedVersion ?? 1);
  if (version < SEED_VERSION) {
    const backfill =
      version < 2
        ? fillMissing(current, data)
        : versionBackfill(slug, current, version);

    await payload.updateGlobal({
      slug,
      data: {
        ...backfill,
        seeded: true,
        seedVersion: SEED_VERSION,
      },
      overrideAccess: true,
      context: SEED_CONTEXT,
    });
    return "backfilled";
  }

  return "skipped";
}

export async function runSeed(payload: Payload): Promise<void> {
  // ---- Media + Services -------------------------------------------------
  let createdServices = 0;

  for (let i = 0; i < SERVICES.length; i++) {
    const service = SERVICES[i];

    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: service.slug } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs.length > 0) continue;

    const imageFile = service.image.replace("/images/", "");
    const heroImage = await ensureMedia(payload, imageFile, service.title);

    await payload.create({
      collection: "services",
      data: {
        title: service.title,
        slug: service.slug,
        shortDescription: service.tagline,
        intro: service.intro,
        ...(heroImage ? { heroImage } : {}),
        includes: service.includes.map((item) => ({ item })),
        highlights: service.highlights.map((h) => ({
          title: h.title,
          text: h.text,
        })),
        order: i,
        active: true,
      },
      overrideAccess: true,
      context: SEED_CONTEXT,
    });

    createdServices++;
  }

  // ---- Globals ----------------------------------------------------------
  const heroBg = await ensureMedia(payload, "hero-bg.jpg", "EventAT");

  const touched: string[] = [];

  const record = async (
    slug: Parameters<typeof seedGlobal>[1],
    data: Record<string, unknown>,
  ) => {
    const result = await seedGlobal(payload, slug, data);
    if (result !== "skipped") touched.push(`${slug}:${result}`);
  };

  await record("site-settings", SITE_SETTINGS_DEFAULTS);
  await record("header", HEADER_DEFAULTS);
  await record("footer", FOOTER_DEFAULTS);
  await record("home-page", {
    ...HOME_DEFAULTS,
    hero: {
      ...HOME_DEFAULTS.hero,
      ...(heroBg ? { backgroundImage: heroBg } : {}),
    },
  });
  await record("services-page", SERVICES_PAGE_DEFAULTS);
  await record("contacts-page", CONTACTS_PAGE_DEFAULTS);

  if (createdServices > 0 || touched.length > 0) {
    payload.logger.info(
      `[seed] services created: ${createdServices}; globals: ${
        touched.join(", ") || "none"
      }`,
    );
  }
}
