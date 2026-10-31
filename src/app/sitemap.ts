import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getArticles, getCases, getDemoModels, getServices } from "@/lib/content";
import { timeline } from "@/content/timeline";
import { TOPICS } from "@/content/articles";

export const revalidate = 3600;

/** Alleen openbare, indexeerbare pagina's. Beheer, API, bevestigingspagina's en concepten blijven buiten de sitemap. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (p: string) => `${siteConfig.url}${p}`;
  const now = new Date();
  const staticPaths: [string, number][] = [
    ["/", 1], ["/verzoekwijzer", 0.9], ["/oplossingen", 0.8], ["/voorbeelden", 0.8], ["/werkwijze", 0.7], ["/over-ons", 0.6],
    ["/kwaliteit", 0.6], ["/vertrouwelijkheid", 0.6], ["/veelgestelde-vragen", 0.6], ["/cases", 0.5], ["/contact", 0.6],
    ["/health-check", 0.6], ["/modelvergelijker", 0.6], ["/excel-door-de-jaren", 0.7], ["/excel-door-de-jaren/tijdlijn", 0.6],
    ["/privacy", 0.2], ["/cookies", 0.2], ["/toegankelijkheid", 0.2],
  ];
  const [services, models, cases, articles] = await Promise.all([getServices(), getDemoModels(), getCases(), getArticles()]);
  return [
    ...staticPaths.map(([p, priority]) => ({ url: u(p), lastModified: now, priority })),
    ...services.map((s) => ({ url: u(`/diensten/${s.slug}`), lastModified: now, priority: 0.8 })),
    ...models.map((m) => ({ url: u(`/voorbeelden/${m.slug}`), lastModified: now, priority: 0.7 })),
    ...cases.map((c) => ({ url: u(`/cases/${c.slug}`), lastModified: now, priority: 0.4 })),
    ...timeline.map((t) => ({ url: u(`/excel-door-de-jaren/${t.year}`), lastModified: now, priority: 0.5 })),
    ...TOPICS.map((t) => ({ url: u(`/excel-door-de-jaren/thema/${t.slug}`), lastModified: now, priority: 0.4 })),
    ...articles.map((a) => ({ url: u(`/excel-door-de-jaren/${a.subjectYear}/${a.slug}`), lastModified: a.publishedAt ?? now, priority: 0.5 })),
  ];
}
