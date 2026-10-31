import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { Faq } from "@/components/content/Faq";
import { getFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over Excel op maat | ExcelSheets.nl",
  description: "Wat kost Excel-maatwerk, kan Excel koppelen met Exact Online, is VBA nodig en wanneer is Excel niet de beste keuze? Eerlijke antwoorden op veelgestelde vragen.",
  alternates: { canonical: "/veelgestelde-vragen" },
};
export const revalidate = 300;
const CAT: Record<string, string> = { kosten: "Kosten", aanpak: "Aanpak en samenwerking", techniek: "Techniek", vertrouwelijkheid: "Vertrouwelijkheid", advies: "Advies", algemeen: "Algemeen" };

export default async function Page() {
  const faq = await getFaq();
  const cats = [...new Set(faq.map((f) => f.category))];
  return (
    <>
      <PageHero crumbs={[{ href: "/veelgestelde-vragen", label: "Veelgestelde vragen" }]} eyebrow="Veelgestelde vragen" cell="Q1" title="Eerlijke antwoorden op goede vragen" lead="We beloven niets wat we niet kunnen waarmaken. Staat je vraag er niet bij, of hangt het antwoord af van jouw situatie? Dan bespreken we het graag." />
      <Section tone="white" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Categorieën" className="hidden lg:block"><ul className="sticky top-28 space-y-1 text-[14px]">{cats.map((c) => <li key={c}><a href={`#${c}`} className="block rounded-lg px-3 py-2 text-ink-500 hover:bg-mint-50 hover:text-forest">{CAT[c] ?? c}</a></li>)}</ul></nav>
          <div className="space-y-10">
            {cats.map((c) => (
              <section key={c} id={c} className="scroll-mt-28">
                <h2 className="mb-4 font-display text-2xl font-bold">{CAT[c] ?? c}</h2>
                <Faq items={faq.filter((f) => f.category === c)} schema={false} />
              </section>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) }} />
      </Section>
      <section className="container pb-20"><CtaBand title="Nog een vraag?" text={undefined} cta="Stel je vraag" href="/contact" secondary={{ href: "/verzoekwijzer", label: "Start de Verzoekwijzer" }} /></section>
    </>
  );
}
