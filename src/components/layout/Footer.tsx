import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FooterDashboard } from "./FooterDashboard";
import { serviceNav } from "@/content/services";
import { demoModels } from "@/content/models";
import { getCompany } from "@/lib/settings";

export async function Footer() {
  const c = await getCompany();
  const cols = [
    { title: "Oplossingen", links: [...serviceNav.map((s) => ({ href: s.href, label: s.title })), { href: "/oplossingen", label: "Alle oplossingen" }] },
    { title: "Voorbeelden", links: [...demoModels.slice(0, 8).map((m) => ({ href: `/voorbeelden/${m.slug}`, label: m.title })), { href: "/voorbeelden", label: "Alle voorbeelden" }] },
    { title: "Kennis & tools", links: [
      { href: "/excel-door-de-jaren", label: "Excel door de jaren" }, { href: "/excel-door-de-jaren/tijdlijn", label: "Tijdlijn 2017–2026" },
      { href: "/health-check", label: "Excel Health Check" }, { href: "/modelvergelijker", label: "Modelvergelijker" },
      { href: "/veelgestelde-vragen", label: "Veelgestelde vragen" }, { href: "/zoeken", label: "Zoeken" },
    ] },
    { title: "Over ExcelSheets.nl", links: [
      { href: "/over-ons", label: "Over ons" }, { href: "/werkwijze", label: "Werkwijze" }, { href: "/kwaliteit", label: "Kwaliteit van onze modellen" },
      { href: "/vertrouwelijkheid", label: "Vertrouwelijkheid" }, { href: "/cases", label: "Cases" }, { href: "/contact", label: "Contact" },
    ] },
  ];
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-60 mask-fade-b" aria-hidden />
      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="space-y-6">
            <Logo tone="light" />
            <p className="max-w-sm text-[15px] leading-relaxed text-mint/70">Wij maken Excel slimmer. En jouw bedrijf sterker. Maatwerk in Excel voor financiële, operationele en planningsvraagstukken.</p>
            <FooterDashboard />
            <Link href="/verzoekwijzer" className="btn-primary">Vertel ons wat je nodig hebt</Link>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-300">{col.title}</h2>
                <ul className="space-y-2.5">
                  {col.links.map((l) => <li key={l.href}><Link href={l.href} className="text-[14px] text-mint/70 transition hover:text-white">{l.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-mint/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {c.legalName ?? "ExcelSheets.nl"}
            {c.kvk && <> · KvK {c.kvk}</>}{c.vat && <> · btw {c.vat}</>}
            {c.email && <> · <a className="hover:text-white" href={`mailto:${c.email}`}>{c.email}</a></>}
            {c.phone && <> · <a className="hover:text-white" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a></>}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/privacy" className="hover:text-white">Privacyverklaring</Link></li>
            <li><Link href="/cookies" className="hover:text-white">Cookie-instellingen</Link></li>
            <li><Link href="/algemene-voorwaarden" className="hover:text-white">Algemene voorwaarden</Link></li>
            <li><Link href="/toegankelijkheid" className="hover:text-white">Toegankelijkheid</Link></li>
          </ul>
        </div>
        <p className="mt-4 text-[12px] text-mint/35">Microsoft en Excel zijn handelsmerken van Microsoft Corporation. ExcelSheets.nl is een zelfstandige dienstverlener en is niet verbonden aan Microsoft.</p>
      </div>
    </footer>
  );
}
