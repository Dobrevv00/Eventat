import type { MetadataRoute } from "next";

import { IS_INDEXABLE, SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Индексираме само продукцията — preview deploy-ите не бива да влизат в Google.
  if (!IS_INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      // Качените в CMS снимки се сервират от /api/media/file/ — оставяме ги
      // достъпни за Google Images, а останалото API и админ панелът — не.
      allow: ["/", "/api/media/file/"],
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
