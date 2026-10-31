import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Timeline } from "@/components/content/Timeline";
import { getArticles } from "@/lib/content";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "Tien jaar Excel-ontwikkeling: interactieve tijdlijn 2017–2026",
  description: "Van Power Query en dynamische matrices tot Python en Copilot. Scroll door tien jaar Excel-ontwikkeling en zie per jaar de belangrijkste innovatie.",
  alternates: { canonical: "/excel-door-de-jaren/tijdlijn" },
};
export const revalidate = 300;

export default async function Page() {
  const counts: Record<number, number> = {};
  (await getArticles()).forEach((a) => { counts[a.subjectYear] = (counts[a.subjectYear] ?? 0) + 1; });
  return (
    <section className="relative overflow-hidden bg-forest pb-20 pt-8 text-white md:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-grid-light" aria-hidden />
      <div className="container relative">
        <Breadcrumbs tone="dark" items={[{ href: "/excel-door-de-jaren", label: "Excel door de jaren" }, { href: "/excel-door-de-jaren/tijdlijn", label: "Tijdlijn" }]} />
        <p className="eyebrow-light">Tijdlijn</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-6xl">Tien jaar Excel-ontwikkeling</h1>
        <p className="mt-4 max-w-2xl text-lg text-mint/75">Scroll, swipe of gebruik de pijltjestoetsen. Per jaar de belangrijkste ontwikkelingen en één opvallende innovatie.</p>
      </div>
      <div className="relative mt-12"><Timeline years={timeline} counts={counts} /></div>
    </section>
  );
}
