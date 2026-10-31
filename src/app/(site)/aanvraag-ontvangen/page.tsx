import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download, Mail, MessageSquare, FileSearch, PenLine } from "lucide-react";
import { db } from "@/lib/db";
import { getCompany } from "@/lib/settings";
import { emailMode } from "@/lib/server/email";

export const metadata: Metadata = { title: "Aanvraag ontvangen", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<{ nr?: string; t?: string }> }) {
  const { nr, t } = await searchParams;
  if (!nr || !t) notFound();
  const r = await db.request.findUnique({ where: { number: nr }, select: { number: true, publicToken: true, summary: true, contact: { select: { name: true, email: true } }, _count: { select: { attachments: true } } } });
  if (!r || r.publicToken !== t) notFound();
  const company = await getCompany();
  const demo = emailMode() === "demo";
  const steps = [
    { icon: FileSearch, title: "We lezen je aanvraag", text: "Met je samenvatting en eventuele bestanden bereiden we het gesprek voor." },
    { icon: MessageSquare, title: "Kort kennismakingsgesprek", text: "We stellen de vragen die nodig zijn om je situatie goed te begrijpen." },
    { icon: PenLine, title: "Voorstel op maat", text: "Je ontvangt een helder voorstel met aanpak, planning en prijs. Je zit nergens aan vast." },
  ];
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial" aria-hidden />
      <div className="container relative max-w-3xl">
        <div className="flex items-center gap-3 text-excel"><CheckCircle2 className="h-8 w-8" aria-hidden /><span className="font-mono text-sm uppercase tracking-widest">Ontvangen</span></div>
        <h1 className="h-display mt-4 text-4xl md:text-5xl">Bedankt, {r.contact.name.split(" ")[0]}. Je aanvraag is binnen.</h1>
        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
          <p className="font-mono text-[12px] uppercase tracking-wider text-ink-400">Aanvraagnummer</p>
          <p className="mt-1 font-mono text-3xl font-bold text-forest">{r.number}</p>
          <p className="mt-5 border-l-4 border-emerald pl-4 font-display text-lg font-semibold leading-snug">{r.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`/api/aanvragen/${r.number}/overzicht?t=${r.publicToken}`} className="btn-primary"><Download className="h-4 w-4" aria-hidden />Download samenvatting (.xlsx)</a>
          </div>
          <p className="mt-5 flex items-start gap-2 text-[14px] text-ink-500"><Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {demo ? <>Demomodus: er is nog geen e-mailserver ingesteld, dus de bevestiging is niet echt verstuurd maar lokaal bewaard.</> : <>We hebben een bevestiging met deze samenvatting gestuurd naar {r.contact.email}.</>}
            {r._count.attachments > 0 && <> Je {r._count.attachments} bestand(en) zijn afgeschermd opgeslagen.</>}
          </p>
        </div>
        <h2 className="mt-14 font-display text-2xl font-bold">Wat gebeurt er nu?</h2>
        <p className="mt-2 text-ink-500">{company.responseTime}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="card p-5">
              <span className="font-mono text-[12px] text-excel">Stap {i + 1}</span>
              <s.icon className="mt-3 h-6 w-6 text-forest" aria-hidden />
              <p className="mt-3 font-display font-bold">{s.title}</p>
              <p className="mt-1 text-[14px] text-ink-500">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/voorbeelden" className="btn-ghost">Bekijk ondertussen voorbeeldmodellen</Link>
          <Link href="/" className="btn">Terug naar home</Link>
        </div>
      </div>
    </section>
  );
}
