import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Buiten productie (staging, previews) niets laten indexeren.
  const indexable = process.env.SITE_INDEXABLE === "true";
  return indexable
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/aanvraag-ontvangen", "/zoeken"] }], sitemap: `${siteConfig.url}/sitemap.xml`, host: siteConfig.url }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
