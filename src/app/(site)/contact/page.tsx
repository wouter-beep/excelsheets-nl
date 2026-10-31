import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/content/ContactForm";
import { getCompany } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact: bespreek je Excel-vraagstuk | ExcelSheets.nl",
  description: "Neem contact op met ExcelSheets.nl. Start de Verzoekwijzer voor een complete aanvraag of stel direct een korte vraag.",
  alternates: { canonical: "/contact" },
};
export const revalidate = 300;

export default async function Page() {
  const c = await getCompany();
  const details = [
    c.email && { icon: Mail, label: c.email, href: `mailto:${c.email}` },
    c.phone && { icon: Phone, label: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    c.address && { icon: MapPin, label: c.address },
    c.openingHours && { icon: Clock, label: c.openingHours },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string }[];
  return (
    <>
      <PageHero crumbs={[{ href: "/contact", label: "Contact" }]} eyebrow="Contact" cell="H1" title="Vertel ons waar je tegenaan loopt" lead={c.responseTime} />
      <Section tone="white" className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Link href="/verzoekwijzer" className="group block rounded-3xl bg-forest p-8 text-white transition hover:-translate-y-1">
              <p className="eyebrow-light">Aanbevolen</p>
              <p className="mt-3 font-display text-2xl font-bold">Start de Excel Verzoekwijzer</p>
              <p className="mt-2 text-mint/75">In een paar minuten een complete aanvraag, met samenvatting en de mogelijkheid om bestanden te delen. Daarmee kunnen we je het snelst goed helpen.</p>
              <span className="btn-primary mt-6">Begin<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden /></span>
            </Link>
            {details.length > 0 && (
              <ul className="card space-y-3 p-6">{details.map((d) => <li key={d.label} className="flex items-start gap-3"><d.icon className="mt-0.5 h-5 w-5 text-excel" aria-hidden />{d.href ? <a href={d.href} className="text-excel underline">{d.label}</a> : <span className="whitespace-pre-line">{d.label}</span>}</li>)}</ul>
            )}
            {(c.legalName || c.kvk) && <p className="text-[13px] text-ink-400">{[c.legalName, c.kvk && `KvK ${c.kvk}`, c.vat && `btw ${c.vat}`].filter(Boolean).join(" · ")}</p>}
          </div>
          <div className="card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold">Of stel direct een korte vraag</h2>
            <p className="mb-6 mt-1 text-ink-500">Voor een snelle vraag, of als je liever eerst even contact hebt.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
