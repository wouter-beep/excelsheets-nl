"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const CARDS = [
  { title: "Mijn Excel-bestand wordt steeds ingewikkelder.", text: "Niemand weet precies meer welke formules werken en welke niet.", anim: "tangle", ref: "#VERW!" },
  { title: "Mijn rapportage kost iedere maand uren.", text: "Gegevens worden handmatig gekopieerd en samengevoegd.", anim: "copy", ref: "Ctrl+C" },
  { title: "Ik heb een goed idee, maar kan het niet bouwen.", text: "Een begroting, planning of rekentool die precies moet doen wat ik wil.", anim: "idea", ref: "=IDEE()" },
  { title: "Ik wil meer inzicht in mijn bedrijf.", text: "Budgetten, scenario's en resultaten inzichtelijk maken.", anim: "insight", ref: "=INZICHT" },
];

function Anim({ kind }: { kind: string }) {
  const reduce = useReducedMotion();
  const loop = reduce ? {} : { repeat: Infinity, repeatType: "reverse" as const, duration: 2.4, ease: "easeInOut" as const };
  if (kind === "tangle") return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => <rect key={i} x={6 + i * 28} y="8" width="22" height="12" rx="2" fill="#fff" stroke="#E2E8E0" />)}
      {[0, 1, 2, 3].map((i) => <rect key={i} x={6 + i * 28} y="44" width="22" height="12" rx="2" fill={i === 2 ? "#FBE3E1" : "#fff"} stroke="#E2E8E0" />)}
      {[[17, 101], [45, 17], [73, 45], [101, 73]].map(([a, b], i) => (
        <motion.path key={i} d={`M${a} 20 C ${a} 34, ${b} 30, ${b} 44`} fill="none" stroke={i === 1 ? "#E2574C" : "#147D52"} strokeWidth="1.5"
          initial={{ pathLength: 0.2 }} animate={{ pathLength: 1 }} transition={{ ...loop, delay: i * 0.3 }} />
      ))}
    </svg>
  );
  if (kind === "copy") return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      <rect x="6" y="10" width="40" height="44" rx="3" fill="#fff" stroke="#E2E8E0" />
      <rect x="74" y="10" width="40" height="44" rx="3" fill="#fff" stroke="#E2E8E0" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="11" y={16 + i * 9} width="30" height="4" rx="1" fill="#A9B5AE" />)}
      <motion.g initial={{ x: 0, opacity: 1 }} animate={{ x: 63, opacity: [1, 1, 0.2] }} transition={{ ...loop, repeatType: "loop", duration: 1.8 }}>
        <rect x="11" y="25" width="30" height="13" rx="2" fill="#CBF8E0" stroke="#18B979" strokeDasharray="2 2" />
      </motion.g>
    </svg>
  );
  if (kind === "idea") return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.rect key={i} x={20 + (i % 4) * 21} y={8 + Math.floor(i / 4) * 17} width="18" height="14" rx="2" fill="#147D52"
          initial={{ opacity: 0.08 }} animate={{ opacity: [0.08, 0.9, 0.08] }} transition={{ duration: 2.6, repeat: reduce ? 0 : Infinity, delay: ((i % 4) + Math.floor(i / 4)) * 0.18 }} />
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
      {[18, 26, 22, 34, 30, 42, 48].map((hh, i) => (
        <motion.rect key={i} x={10 + i * 15} width="10" rx="2" fill={i === 6 ? "#18B979" : "#147D52"} initial={{ height: 4, y: 58 }} animate={{ height: hh, y: 60 - hh }} transition={{ ...loop, delay: i * 0.08 }} />
      ))}
    </svg>
  );
}

export function ProblemCards() {
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.08}>
          <article className="card group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift">
            <div className="mb-5 rounded-xl bg-paper p-3"><Anim kind={c.anim} /></div>
            <span className="cellref mb-2">{c.ref}</span>
            <h3 className="font-display text-lg font-bold leading-snug">{c.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{c.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
