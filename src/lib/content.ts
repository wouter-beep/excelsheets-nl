/**
 * Content ophalen: eerst uit de database (aanpasbaar via het beheer), met de
 * broncontent in src/content als terugval zodat de site ook zonder seed werkt.
 */
import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { services as staticServices, type ServiceContent } from "@/content/services";
import { demoModels as staticModels, type DemoModelMeta } from "@/content/models";


export const getServices = cache(async (): Promise<ServiceContent[]> => {
  try {
    const rows = await db.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (rows.length) return rows.map((r) => ({ ...r, deliverables: r.deliverables as ServiceContent["deliverables"], example: r.example as ServiceContent["example"], benefits: r.benefits as ServiceContent["benefits"], approach: r.approach as ServiceContent["approach"], faq: r.faq as ServiceContent["faq"], relatedModels: r.relatedModels as string[] }));
  } catch {}
  return staticServices;
});
export const getService = cache(async (slug: string) => (await getServices()).find((s) => s.slug === slug) ?? null);

export const getDemoModels = cache(async (): Promise<DemoModelMeta[]> => {
  try {
    const rows = await db.demoModel.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (rows.length) return rows.map((r) => ({ ...r, highlights: r.highlights as string[], tabs: r.tabs as string[], interactions: staticModels.find((m) => m.slug === r.slug)?.interactions ?? [] }));
  } catch {}
  return staticModels;
});
export const getDemoModel = cache(async (slug: string) => (await getDemoModels()).find((m) => m.slug === slug) ?? null);

import { faqItems } from "@/content/faq";
import { demoCases, type CaseContent } from "@/content/cases";

export const getFaq = cache(async () => {
  try {
    const rows = await db.faqItem.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (rows.length) return rows.map((r) => ({ q: r.question, a: r.answer, category: r.category }));
  } catch {}
  return faqItems.map((f) => ({ q: f.question, a: f.answer, category: f.category }));
});

export type CaseItem = CaseContent & { isDemo: boolean };
export const getCases = cache(async (): Promise<CaseItem[]> => {
  try {
    const rows = await db.caseStudy.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } });
    if (rows.length) return rows.map((r) => ({ slug: r.slug, title: r.title, client: r.client, sector: r.sector, problem: r.problem, solution: r.solution, benefits: r.benefits as string[], modelSlug: r.modelSlug ?? "", isDemo: r.isDemo }));
  } catch {}
  return demoCases.map((c) => ({ ...c, isDemo: true }));
});

import { allArticles, type ArticleContent } from "@/content/articles";

export type ArticleView = Omit<ArticleContent, "status"> & { status: string; publishedAt: Date | null; id?: string };

/** Gepubliceerde artikelen. Database is leidend; zonder database tonen we de gepubliceerde broncontent. */
export const getArticles = cache(async (opts?: { includeUnpublished?: boolean }): Promise<ArticleView[]> => {
  try {
    const rows = await db.article.findMany({ where: opts?.includeUnpublished ? {} : { status: "PUBLISHED" }, orderBy: [{ subjectYear: "asc" }, { number: "asc" }], include: { topics: { select: { slug: true } } } });
    if (rows.length || (await db.article.count()) > 0) return rows.map((r) => ({
      id: r.id, number: r.number, slug: r.slug, title: r.title, subjectYear: r.subjectYear, summary: r.summary, body: r.body, practice: r.practice,
      sources: r.sources as ArticleContent["sources"], serviceLinks: r.serviceLinks as string[], topics: r.topics.map((t) => t.slug), visual: r.visual as ArticleContent["visual"],
      seoTitle: r.seoTitle, metaDescription: r.metaDescription, factNote: r.factNote ?? undefined, status: r.status, publishedAt: r.publishedAt,
    }));
  } catch {}
  return allArticles.filter((a) => opts?.includeUnpublished || a.status === "PUBLISHED").map((a) => ({ ...a, publishedAt: null }));
});
