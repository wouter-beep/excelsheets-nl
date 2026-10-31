import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, FileSpreadsheet, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";
import { STATUS_LABELS, summaryRows } from "@/lib/server/requests";
import { Badge, STATUS_STYLE } from "@/components/admin/ui";
import { BUDGET, FREQUENCY, INTEGRATION, PLATFORMS, SOURCES, URGENCY, USERS, labelOf, type Situation, type SummaryData } from "@/lib/intake";
import type { Classification } from "@/lib/classify";
import { fileSize, formatDate, formatDateTime } from "@/lib/format";
import { addNote, setStatus, updateContactNotes } from "./actions";

export const metadata = { title: "Aanvraag" };

export default async function Page({ params }: { params: Promise<{ nr: string }> }) {
  const user = await requireUser("requests.read");
  const { nr } = await params;
  const r = await db.request.findUnique({ where: { number: nr }, include: {
    contact: { include: { requests: { select: { number: true, createdAt: true, status: true }, orderBy: { createdAt: "desc" } } } },
    attachments: { orderBy: { createdAt: "asc" } }, notes: { include: { author: { select: { name: true } } }, orderBy: { createdAt: "desc" } }, events: { orderBy: { createdAt: "desc" } },
  } });
  if (!r) notFound();
  await audit(user.id, "aanvraag.bekeken", nr);
  const c = r.classification as Classification;
  const s = r.situation as Situation;
  const sd = r.summaryData as SummaryData;
  const rows = summaryRows({ goal: r.goal, categories: r.categories as string[], urgency: r.urgency, budget: r.budget, summaryData: sd });
  const scanIcon = (st: string) => st === "CLEAN" ? <ShieldCheck className="h-4 w-4 text-excel" aria-label="Schoon" /> : st === "INFECTED" ? <ShieldAlert className="h-4 w-4 text-coral" aria-label="Besmet" /> : <ShieldQuestion className="h-4 w-4 text-amber-600" aria-label="Niet gescand" />;
  return (
    <>
      <Link href="/admin/aanvragen" className="inline-flex items-center gap-1 text-[14px] text-ink-500 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Alle aanvragen</Link>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-sm text-ink-400">{r.number} · {formatDateTime(r.createdAt)}</p>
          <h1 className="mt-1 font-display text-3xl font-bold">{r.contact.company}</h1>
          <div className="mt-3 flex flex-wrap gap-2"><Badge className={STATUS_STYLE[r.status]}>{STATUS_LABELS[r.status]}</Badge><Badge className="bg-paper-200 text-ink-700">{c.type}</Badge><Badge className="bg-paper-200 text-ink-700">Complexiteit {c.complexity.toLowerCase()}</Badge><Badge className="bg-paper-200 text-ink-700">Urgentie {c.urgency.toLowerCase()}</Badge></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`/api/aanvragen/${r.number}/overzicht`} className="btn-ghost"><Download className="h-4 w-4" aria-hidden />Samenvatting .xlsx</a>
          <form key={r.status} action={setStatus.bind(null, r.number)} className="flex gap-2">
            <label htmlFor="status" className="sr-only">Status</label>
            <select id="status" name="status" defaultValue={r.status} className="input w-auto py-2.5">{Object.entries(STATUS_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
            <button className="btn-dark">Wijzig</button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Samenvatting (zoals bevestigd door aanvrager)</h2>
            <p className="mt-3 border-l-4 border-emerald pl-4 font-display text-lg font-semibold leading-snug">{r.summary}</p>
            <dl className="mt-5 divide-y divide-ink/[0.06] text-[14px]">{rows.map(([k, v]) => <div key={k} className="grid gap-1 py-2.5 sm:grid-cols-[180px_1fr]"><dt className="font-semibold text-ink-500">{k}</dt><dd>{v}</dd></div>)}</dl>
          </section>
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Het verhaal van de aanvrager</h2>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed">{r.story}</p>
            <dl className="mt-5 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-2">
              {([["Bestaand bestand", s.hasFile === "ja" ? "Ja" : s.hasFile === "nee" ? "Nee" : "–"], ["Gebruikers", labelOf(USERS, s.users) ?? "–"], ["Frequentie", labelOf(FREQUENCY, s.frequency) ?? "–"], ["Bronnen", s.sources.map((x) => labelOf(SOURCES, x)).join(", ") || "–"], ["Koppeling", labelOf(INTEGRATION, s.integration) ?? "–"], ["Met", s.integrationWith || "–"], ["Platform", s.platforms.map((x) => labelOf(PLATFORMS, x)).join(", ") || "–"], ["Start", labelOf(URGENCY, r.urgency ?? undefined) ?? "–"], ["Budget", labelOf(BUDGET, r.budget ?? undefined) ?? "–"], ["Bron/aanleiding", r.source ?? "–"]] as const).map(([k, v]) => <div key={k}><dt className="text-ink-400">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          </section>
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Bijlagen</h2>
            {r.attachments.length === 0 ? <p className="mt-3 text-ink-500">Geen bijlagen.</p> : (
              <ul className="mt-3 space-y-2">{r.attachments.map((a) => (
                <li key={a.id} className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-3">
                  <FileSpreadsheet className="h-5 w-5 text-excel" aria-hidden />
                  <span className="min-w-0 flex-1"><span className="block truncate font-medium">{a.originalName}</span><span className="text-[12px] text-ink-400">{fileSize(a.size)} · sha256 {a.sha256.slice(0, 12)}… · {a.deleteAfter ? `verwijderen na ${formatDate(a.deleteAfter)}` : "bewaren (opdracht)"}</span></span>
                  <span className="flex items-center gap-1 text-[12px]">{scanIcon(a.scanStatus)}{a.scanStatus === "NOT_SCANNED" ? "niet gescand" : a.scanStatus.toLowerCase()}</span>
                  {a.scanStatus !== "INFECTED" && <a href={`/api/admin/bijlagen/${a.id}`} className="btn-ghost px-3 py-1.5 text-[13px]"><Download className="h-4 w-4" aria-hidden />Download</a>}
                </li>
              ))}</ul>
            )}
            {r.attachments.some((a) => a.scanStatus === "NOT_SCANNED") && <p className="mt-3 text-[13px] text-amber-600">Niet-gescande bestanden alleen openen op een beveiligde werkplek, bij voorkeur met macro&apos;s uitgeschakeld.</p>}
          </section>
        </div>

        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Contact</h2>
            <p className="mt-3 font-display text-lg font-bold">{r.contact.name}</p>
            <p className="text-ink-500">{r.contact.company}</p>
            <p className="mt-3 text-[14px]"><a className="text-excel underline" href={`mailto:${r.contact.email}?subject=${encodeURIComponent(`Je Excel-aanvraag ${r.number}`)}`}>{r.contact.email}</a></p>
            {r.contact.phone && <p className="text-[14px]"><a className="text-excel underline" href={`tel:${r.contact.phone.replace(/\s/g, "")}`}>{r.contact.phone}</a></p>}
            <p className="mt-2 text-[13px] text-ink-500">Voorkeur: {r.contact.preferredContact === "telefoon" ? "telefonisch" : "per e-mail"} · toestemming {formatDateTime(r.consentAt)}</p>
            {r.contact.requests.length > 1 && <p className="mt-3 text-[13px]">Eerdere aanvragen: {r.contact.requests.filter((x) => x.number !== r.number).map((x) => <Link key={x.number} href={`/admin/aanvragen/${x.number}`} className="mr-2 font-mono text-excel underline">{x.number}</Link>)}</p>}
            <form action={updateContactNotes.bind(null, r.contact.id, r.number)} className="mt-4">
              <label htmlFor="internalNotes" className="label">Interne notitie bij contact</label>
              <textarea id="internalNotes" name="internalNotes" rows={2} defaultValue={r.contact.internalNotes ?? ""} className="input" />
              <button className="btn-ghost mt-2 px-4 py-2 text-[13px]">Opslaan</button>
            </form>
          </section>
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Automatische classificatie</h2>
            <p className="mt-1 text-[12px] text-ink-400">Regelgebaseerd, zonder AI. Score {c.score}.</p>
            <p className="mt-3 text-[14px]"><strong>Expertise:</strong> {c.expertise.join(", ")}</p>
            {c.systems.length > 0 && <p className="mt-1 text-[14px]"><strong>Genoemde systemen:</strong> {c.systems.join(", ")}</p>}
            {c.followUps.length > 0 && <><p className="mt-4 text-[14px] font-semibold">Voorgestelde vervolgvragen</p><ul className="mt-2 list-disc space-y-1 pl-5 text-[14px]">{c.followUps.map((f) => <li key={f}>{f}</li>)}</ul></>}
            <details className="mt-4 text-[12px] text-ink-400"><summary className="cursor-pointer">Toegepaste regels</summary><ul className="mt-2 space-y-0.5 font-mono">{c.rules.map((x) => <li key={x}>{x}</li>)}</ul></details>
          </section>
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Notities</h2>
            <form action={addNote.bind(null, r.number)} className="mt-3">
              <label htmlFor="body" className="sr-only">Nieuwe notitie</label>
              <textarea id="body" name="body" rows={3} required className="input" placeholder="Bijvoorbeeld: gebeld, offerte volgt vrijdag" />
              <button className="btn-dark mt-2 px-4 py-2 text-[13px]">Notitie toevoegen</button>
            </form>
            <ul className="mt-5 space-y-3">{r.notes.map((n) => <li key={n.id} className="rounded-xl bg-paper p-3 text-[14px]"><p className="whitespace-pre-line">{n.body}</p><p className="mt-1 text-[12px] text-ink-400">{n.author?.name ?? "Onbekend"} · {formatDateTime(n.createdAt)}</p></li>)}</ul>
          </section>
          <section className="card p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-ink-400">Historie</h2>
            <ol className="mt-3 space-y-2 text-[13px]">{r.events.map((e) => <li key={e.id}><span className="text-ink-400">{formatDateTime(e.createdAt)}</span> · {e.fromState ? `${STATUS_LABELS[e.fromState as keyof typeof STATUS_LABELS]} → ` : ""}<strong>{STATUS_LABELS[e.toState as keyof typeof STATUS_LABELS]}</strong> <span className="text-ink-400">({e.actor})</span></li>)}</ol>
            <p className="mt-4 text-[12px] text-ink-400">{r.deleteAfter ? `Wordt automatisch verwijderd na ${formatDate(r.deleteAfter)} (bewaarbeleid).` : "Bewaard als opdracht (geen automatische verwijdering)."}</p>
          </section>
        </div>
      </div>
    </>
  );
}
