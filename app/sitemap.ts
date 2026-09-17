import type { MetadataRoute } from "next";

import { getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** Дата на последната редакция на правните страници (виж LAST_UPDATED в тях). */
const LEGAL_UPDATED = new Date("2026-08-20");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices();

  const serviceDates = services
    .map((service) => (service.updatedAt ? new Date(service.updatedAt) : null))
    .filter((date): date is Date => date !== null && !Number.isNaN(date.getTime()));
  const latestService = serviceDates.length
    ? new Date(Math.max(...serviceDates.map((date) => date.getTime())))
    : undefined;

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/og-image.jpg")],
    },
    {
      url: absoluteUrl("/uslugi"),
      ...(latestService ? { lastModified: latestService } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
      images: services.map((service) => absoluteUrl(service.image)),
    },
    ...services.map((service) => ({
      url: absoluteUrl(`/uslugi/${service.slug}`),
      ...(service.updatedAt ? { lastModified: new Date(service.updatedAt) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(service.image)],
    })),
    {
      url: absoluteUrl("/kontakti"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/poveritelnost"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/politika-biskvitki"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/obshti-usloviya"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
