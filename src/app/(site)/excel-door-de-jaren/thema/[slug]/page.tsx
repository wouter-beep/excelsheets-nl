import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/content/ArticleCard";
import { getArticles } from "@/lib/content";
import { TOPICS } from "@/content/articles/types";

export function generateStaticParams() { return TOPICS.map((t) => ({ slug: t.slug })); }
export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = TOPICS.find((x) => x.slug === slug);
  return t ? { title: `${t.name} in Excel, 2017–2026 | Excel door de jaren`, description: `${t.description} Alle artikelen over ${t.name.toLowerCase()} in het archief Excel door de jaren.`, alternates: { canonical: `/excel-door-de-jaren/thema/${t.slug}` } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = TOPICS.find((x) => x.slug === slug);
  if (!t) notFound();
  const list = (await getArticles()).filter((a) => a.topics.includes(t.slug));
  return (
    <>
      <PageHero crumbs={[{ href: "/excel-door-de-jaren", label: "Excel door de jaren" }, { href: `/excel-door-de-jaren/thema/${t.slug}`, label: t.name }]} eyebrow="Thema" title={t.name} lead={`${t.description} ${list.length} artikelen, van oud naar nieuw.`} />
      <Section tone="white" className="pt-0 md:pt-0"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => <ArticleCard key={a.slug} a={a} />)}</div></Section>
    </>
  );
}
