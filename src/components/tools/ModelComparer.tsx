"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { number } from "@/lib/format";

type Side = { title: string; points: { ok: boolean; t: string }[]; steps: string[] };
const PAIRS: { key: string; label: string; a: Side; b: Side; model: string }[] = [
  { key: "rapportage", label: "Handmatige vs. geautomatiseerde rapportage", model: "managementdashboard",
    a: { title: "Handmatig", steps: ["Exporteren uit boekhouding", "Kopiëren naar nieuw tabblad", "Formules doortrekken", "Totalen controleren", "Grafieken bijwerken", "PDF maken"], points: [{ ok: false, t: "Elke maand dezelfde handelingen" }, { ok: false, t: "Fouten door verschoven bereiken" }, { ok: false, t: "Afhankelijk van één persoon" }, { ok: true, t: "Geen voorbereiding nodig" }] },
    b: { title: "Geautomatiseerd", steps: ["Export in de map zetten", "Op Vernieuwen klikken", "Controles checken"], points: [{ ok: true, t: "Power Query leest exports automatisch in" }, { ok: true, t: "Controles signaleren afwijkingen" }, { ok: true, t: "Iedereen kan de rapportage verversen" }, { ok: false, t: "Vraagt eenmalig een goede opzet" }] } },
  { key: "forecast", label: "Statische begroting vs. rolling forecast", model: "begroting-rolling-forecast",
    a: { title: "Statische begroting", steps: ["Begroting in november", "Maandelijks realisatie naast budget", "Afwijkingen verklaren"], points: [{ ok: true, t: "Eenvoudig en vertrouwd" }, { ok: false, t: "Na een paar maanden achterhaald" }, { ok: false, t: "Geen zicht op de verwachte jaaruitkomst" }, { ok: false, t: "Bijsturen gebeurt laat" }] },
    b: { title: "Rolling forecast", steps: ["Begroting als vertrekpunt", "Realisatie tot en met peilmaand", "Prognose voor de rest van het jaar", "Actuele jaarverwachting"], points: [{ ok: true, t: "Altijd een actuele verwachting" }, { ok: true, t: "Effect van keuzes direct zichtbaar" }, { ok: true, t: "Budget blijft als referentie bestaan" }, { ok: false, t: "Vraagt maandelijks een korte update" }] } },
  { key: "structuur", label: "Losse bestanden vs. één gestructureerd model", model: "jaarrekeningwerkboek",
    a: { title: "Losse bestanden", steps: ["Bestand per afdeling", "Bestand per maand", "Samenvoegbestand met koppelingen", "Koppelingen repareren"], points: [{ ok: false, t: "Verbroken koppelingen" }, { ok: false, t: "Onduidelijk welke versie klopt" }, { ok: false, t: "Wijzigingen moeten op meerdere plekken" }, { ok: true, t: "Ieder werkt in zijn eigen bestand" }] },
    b: { title: "Gestructureerd model", steps: ["Invoer", "Berekening", "Uitkomst", "Controle"], points: [{ ok: true, t: "Eén plek per gegeven" }, { ok: true, t: "Herleidbaar van bron tot rapport" }, { ok: true, t: "Groeit mee met nieuwe afdelingen of jaren" }, { ok: false, t: "Afspraken nodig over wie wat invult" }] } },
];

export function ModelComparer() {
  const reduce = useReducedMotion();
  const [k, setK] = useState(PAIRS[0].key);
  const [view, setView] = useState<"a" | "b">("b");
  const [hours, setHours] = useState(8);
  const [share, setShare] = useState(60);
  const p = PAIRS.find((x) => x.key === k)!;
  return (
    <div>
      <div role="tablist" aria-label="Kies een vergelijking" className="flex flex-wrap gap-2">
        {PAIRS.map((x) => <button key={x.key} role="tab" aria-selected={x.key === k} onClick={() => setK(x.key)} className={cn("rounded-full border px-4 py-2 text-[14px] font-medium transition", x.key === k ? "border-forest bg-forest text-white" : "border-ink/15 bg-white hover:border-emerald")}>{x.label}</button>)}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {(["a", "b"] as const).map((side) => {
          const s = p[side];
          return (
            <button key={side} type="button" onClick={() => setView(side)} aria-pressed={view === side} className={cn("card p-6 text-left transition", view === side ? "ring-4 ring-emerald/30" : "opacity-80 hover:opacity-100")}>
              <p className={cn("font-mono text-[12px] uppercase tracking-wider", side === "b" ? "text-excel" : "text-ink-400")}>{side === "a" ? "Zo gaat het vaak" : "Zo kan het ook"}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{s.title}</h3>
              <ol className="mt-5 flex flex-wrap items-center gap-1.5">
                <AnimatePresence initial={false}>
                  {s.steps.map((st, i) => (
                    <motion.li key={st} initial={reduce ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-1.5">
                      <span className={cn("rounded-md border px-2.5 py-1 text-[12.5px]", side === "b" ? "border-emerald/40 bg-mint-50 text-forest" : "border-ink/10 bg-paper")}>{st}</span>
                      {i < s.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ink-300" aria-hidden />}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ol>
              <ul className="mt-6 space-y-2">{s.points.map((pt) => <li key={pt.t} className="flex gap-2 text-[14.5px]">{pt.ok ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-excel" aria-label="Voordeel" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-coral" aria-label="Nadeel" />}{pt.t}</li>)}</ul>
            </button>
          );
        })}
      </div>
      {k === "rapportage" && (
        <div className="card mt-8 grid gap-6 p-6 md:grid-cols-[1fr_280px] md:items-center">
          <div className="space-y-5">
            <p className="font-display text-lg font-bold">Rekenvoorbeeld met je eigen inschatting</p>
            <div><label htmlFor="mc-h" className="label">Uren per maand aan handmatige rapportage: <span className="font-mono text-excel">{hours}</span></label><input id="mc-h" type="range" min={1} max={40} value={hours} onChange={(e) => setHours(+e.target.value)} className="w-full accent-[#18B979]" /></div>
            <div><label htmlFor="mc-s" className="label">Deel dat je verwacht te automatiseren: <span className="font-mono text-excel">{share}%</span></label><input id="mc-s" type="range" min={10} max={90} step={5} value={share} onChange={(e) => setShare(+e.target.value)} className="w-full accent-[#18B979]" /></div>
          </div>
          <div className="rounded-2xl bg-forest p-6 text-white">
            <p className="font-mono text-[12px] text-mint/70">=B1*B2*12</p>
            <p className="mt-1 font-display text-4xl font-extrabold tabular">{number(Math.round(hours * (share / 100) * 12))} uur</p>
            <p className="text-[14px] text-mint/75">per jaar minder handwerk</p>
          </div>
          <p className="text-[12px] text-ink-400 md:col-span-2">Dit is een eenvoudige rekensom met jouw eigen invoer, geen belofte. Wat haalbaar is, hangt af van je bronsystemen en het type rapportage.</p>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`/voorbeelden/${p.model}`} className="btn-ghost">Bekijk een werkend voorbeeld</Link>
        <Link href="/verzoekwijzer" className="btn-primary">Bespreek jouw situatie<ArrowRight className="h-4 w-4" aria-hidden /></Link>
      </div>
    </div>
  );
}
