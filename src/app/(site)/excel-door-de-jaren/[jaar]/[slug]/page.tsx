import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/content/ArticleBody";
import { getArticles } from "@/lib/content";
import { allArticles } from "@/content/articles";
import { siteConfig } from "@/config/site";

export function generateStaticParams() { return allArticles.filter((a) => a.status === "PUBLISHED").map((a) => ({ jaar: String(a.subjectYear), slug: a.slug })); }
export const revalidate = 300;

async function find(jaar: string, slug: string) { return (await getArticles()).find((a) => a.slug === slug && String(a.subjectYear) === jaar) ?? null; }

export async function generateMetadata({ params }: { params: Promise<{ jaar: string; slug: string }> }): Promise<Metadata> {
  const { jaar, slug } = await params;
  const a = await find(jaar, slug);
  if (!a) return {};
  const url = `/excel-door-de-jaren/${a.subjectYear}/${a.slug}`;
  return { title: a.seoTitle || `${a.title} | Excel door de jaren`, description: a.metaDescription || a.summary.slice(0, 158), alternates: { canonical: url },
    openGraph: { type: "article", title: a.title, description: a.summary, url, ...(a.publishedAt ? { publishedTime: a.publishedAt.toISOString() } : {}) } };
}

export default async function Page({ params }: { params: Promise<{ jaar: string; slug: string }> }) {
  const { jaar, slug } = await params;
  const a = await find(jaar, slug);
  if (!a) notFound();
  const all = await getArticles();
  const related = all.filter((x) => x.slug !== a.slug && x.topics.some((t) => a.topics.includes(t))).sort((x, y) => Math.abs(x.subjectYear - a.subjectYear) - Math.abs(y.subjectYear - a.subjectYear)).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, inLanguage: "nl-NL", about: `Excel in ${a.subjectYear}`,
    ...(a.publishedAt ? { datePublished: a.publishedAt.toISOString() } : {}), publisher: { "@type": "Organization", name: siteConfig.brand, url: siteConfig.url }, mainEntityOfPage: `${siteConfig.url}/excel-door-de-jaren/${a.subjectYear}/${a.slug}` };
  return (<><ArticleBody a={a} related={related} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /></>);
}
