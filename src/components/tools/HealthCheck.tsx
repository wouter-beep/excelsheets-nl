"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

type Q = { key: string; q: string; help: string; options: { label: string; score: number; tip?: string }[] };
const QUESTIONS: Q[] = [
  { key: "users", q: "Hoeveel mensen werken met het bestand?", help: "Meer gebruikers vraagt om duidelijke invoervelden en beveiligde berekeningen.", options: [
    { label: "Alleen ik", score: 2 }, { label: "2 tot 5", score: 1, tip: "Leg vast wie wat invult en beveilig rekenbladen tegen per ongeluk overschrijven." }, { label: "Meer dan 5", score: 0, tip: "Bij veel gebruikers loont een opzet met aparte invoer en een centraal, beveiligd rekenmodel. Overweeg co-authoring via SharePoint of OneDrive." } ] },
  { key: "manual", q: "Hoeveel gegevens worden handmatig ingevoerd of geplakt?", help: "Kopiëren en plakken is de grootste bron van fouten in spreadsheets.", options: [
    { label: "Vrijwel niets", score: 2 }, { label: "Een deel", score: 1, tip: "Kijk of exports met Power Query automatisch kunnen worden ingelezen." }, { label: "Bijna alles", score: 0, tip: "Automatiseer de import met Power Query: vastgelegde stappen in plaats van elke maand kopiëren en plakken." } ] },
  { key: "errors", q: "Hoe vaak ontstaan er fouten of foutmeldingen?", help: "#N/B, #VERW! of totalen die niet aansluiten.", options: [
    { label: "Zelden", score: 2 }, { label: "Soms", score: 1, tip: "Bouw controletellingen in die direct laten zien als totalen niet aansluiten." }, { label: "Regelmatig", score: 0, tip: "Laat het bestand controleren. Structurele fouten zitten vaak in gekopieerde formules of verschoven bereiken." } ] },
  { key: "speed", q: "Hoe snel werkt het bestand?", help: "Wachten bij elke wijziging is een teken van inefficiënte formules.", options: [
    { label: "Snel", score: 2 }, { label: "Soms traag", score: 1, tip: "Vervang hele-kolomverwijzingen en volatiele functies (zoals INDIRECT en OFFSET) waar mogelijk." }, { label: "Erg traag of crasht", score: 0, tip: "Een herstructurering met tabellen, Power Query of een datamodel kan het bestand vele malen sneller maken." } ] },
  { key: "docs", q: "Weet iemand anders hoe het bestand werkt?", help: "Kennis die in één hoofd zit, is een bedrijfsrisico.", options: [
    { label: "Ja, het is gedocumenteerd", score: 2 }, { label: "Min of meer", score: 1, tip: "Voeg een uitlegblad toe: wat doet elk tabblad en wat vul je wanneer in." }, { label: "Nee, alleen de maker", score: 0, tip: "Documenteer het model en vereenvoudig de opbouw, zodat het overdraagbaar wordt." } ] },
  { key: "structure", q: "Hoe is het bestand opgebouwd?", help: "Scheiding van invoer, berekening en uitkomst maakt een model betrouwbaar.", options: [
    { label: "Invoer, berekening en rapport gescheiden", score: 2 }, { label: "Gedeeltelijk", score: 1, tip: "Scheid invoer, berekeningen en rapportages in aparte tabbladen met vaste kleuren voor invoercellen." }, { label: "Alles door elkaar", score: 0, tip: "Herstructureer het model: één plek per gegeven, heldere rekenstappen en een apart rapport." } ] },
];

export function HealthCheck() {
  const reduce = useReducedMotion();
  const [a, setA] = useState<Record<string, number>>({});
  const done = Object.keys(a).length === QUESTIONS.length;
  const score = Object.values(a).reduce((s, v) => s + v, 0);
  const pct = Math.round((score / (QUESTIONS.length * 2)) * 100);
  const tips = QUESTIONS.map((q) => (a[q.key] !== undefined ? q.options.find((o) => o.score === a[q.key])?.tip : undefined)).filter(Boolean) as string[];
  const verdict = pct >= 80 ? { t: "Gezond", c: "text-excel", d: "Je bestand is goed opgezet. Met kleine verbeteringen houd je het zo." } : pct >= 50 ? { t: "Aandacht nodig", c: "text-amber-600", d: "Het werkt, maar er zijn risico's die je met gerichte verbeteringen kunt wegnemen." } : { t: "Risicovol", c: "text-coral", d: "Er is een grote kans op fouten of tijdverlies. Een verbeterslag of nieuwe opzet loont waarschijnlijk." };
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <ol className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <li key={q.key} className="card p-5 md:p-6">
            <fieldset>
              <legend className="font-display text-lg font-bold"><span className="mr-2 font-mono text-[13px] text-excel">{i + 1}/6</span>{q.q}</legend>
              <p className="mt-1 text-[14px] text-ink-500">{q.help}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {q.options.map((o) => (
                  <button key={o.label} type="button" aria-pressed={a[q.key] === o.score} onClick={() => setA({ ...a, [q.key]: o.score })}
                    className={cn("min-h-[44px] rounded-xl border px-4 py-2 text-[15px] font-medium transition", a[q.key] === o.score ? "border-forest bg-forest text-white" : "border-ink/15 bg-white hover:border-emerald")}>{o.label}</button>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>
      <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <div className="card overflow-hidden">
          <div className="bg-forest px-5 py-3 font-mono text-[12px] text-mint">=HEALTHCHECK(B2:B7)</div>
          <div className="p-6">
            <div className="relative mx-auto h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#EEF2EC" strokeWidth="10" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke={pct >= 80 ? "#18B979" : pct >= 50 ? "#F2B84B" : "#E2574C"} strokeWidth="10" strokeLinecap="round" strokeDasharray={264} animate={{ strokeDashoffset: 264 - (264 * (done ? pct : (score / 12) * 100)) / 100 }} transition={{ duration: reduce ? 0 : 0.8 }} />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center"><div><p className="font-display text-4xl font-extrabold tabular">{done ? pct : "–"}</p><p className="text-[12px] text-ink-400">{done ? "van 100" : `${Object.keys(a).length}/6 beantwoord`}</p></div></div>
            </div>
            {done ? (
              <>
                <p className={cn("mt-5 text-center font-display text-2xl font-bold", verdict.c)}>{verdict.t}</p>
                <p className="mt-1 text-center text-[14px] text-ink-500">{verdict.d}</p>
                {tips.length > 0 && <><p className="mt-6 font-semibold">Praktische aandachtspunten</p><ul className="mt-2 space-y-2 text-[14px]">{tips.map((t) => <li key={t} className="flex gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-emerald" />{t}</li>)}</ul></>}
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/verzoekwijzer?doel=verbeteren" className="btn-primary">Laat je bestand verbeteren<ArrowRight className="h-4 w-4" aria-hidden /></Link>
                  <button type="button" onClick={() => setA({})} className="btn text-ink-500"><RotateCcw className="h-4 w-4" aria-hidden />Opnieuw</button>
                </div>
                <p className="mt-4 text-[12px] text-ink-400">Een indicatie op basis van zes vragen, geen volledige controle van je bestand. Er wordt niets opgeslagen of verstuurd.</p>
              </>
            ) : <p className="mt-5 text-center text-[14px] text-ink-500">Beantwoord de vragen voor je score en concrete aandachtspunten.</p>}
          </div>
        </div>
      </aside>
    </div>
  );
}
