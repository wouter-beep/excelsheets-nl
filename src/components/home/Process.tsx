"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export const STEPS = [
  { n: "01", title: "Vertel ons jouw uitdaging.", text: "Je hoeft geen uitgebreide technische specificatie te schrijven. Beschrijf in je eigen woorden wat je wilt bereiken, en stuur eventueel je huidige bestand mee." },
  { n: "02", title: "Wij denken met je mee.", text: "We bespreken de gewenste oplossing en onderzoeken wat er al beschikbaar is: welke gegevens, welke systemen, welke mensen gaan ermee werken." },
  { n: "03", title: "Wij bouwen jouw Excel-oplossing.", text: "Met tussentijdse afstemming en aandacht voor betrouwbaarheid, gebruiksgemak en vormgeving. Je ziet het model groeien en kunt bijsturen." },
  { n: "04", title: "Jij kunt verder.", text: "We leveren het model op, testen de werking met jouw gegevens, geven uitleg en ondersteunen waar nodig." },
];

/** Proceslijn met een werkblad dat per stap completer wordt. */
export function Process() {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.i)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const filled = (r: number, c: number) => {
    if (step >= 3) return "done";
    if (step === 2) return r < 6 ? "calc" : "empty";
    if (step === 1) return c === 0 || r === 0 ? "label" : "empty";
    return r === 0 && c < 2 ? "label" : "empty";
  };
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ol className="relative space-y-6 lg:space-y-24 lg:py-16">
        <span className="absolute bottom-6 left-[22px] top-6 hidden w-px bg-white/15 lg:block" aria-hidden />
        {STEPS.map((s, i) => (
          <li key={s.n} ref={(el) => { refs.current[i] = el; }} data-i={i} className="relative flex gap-5">
            <span className={cn("relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-sm transition", step >= i ? "border-emerald bg-emerald text-forest-900" : "border-white/25 text-mint/70")}>{s.n}</span>
            <div>
              <h3 className="font-display text-xl font-bold text-white md:text-2xl">{s.title}</h3>
              <p className="mt-2 max-w-md text-mint/70">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="lg:sticky lg:top-28 lg:h-fit" aria-hidden>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-mint/60">
            <span>Jouw_model.xlsx</span>
            <span>{["Intake", "Ontwerp", "Bouw", "Opgeleverd ✓"][step]}</span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 8 }).map((_, r) => Array.from({ length: 6 }).map((_, c) => {
              const f = filled(r, c);
              return (
                <motion.span key={`${r}-${c}`} layout className={cn("h-7 rounded-[4px] transition-colors duration-500",
                  f === "empty" && "bg-white/[0.05]", f === "label" && "bg-mint/25", f === "calc" && (r === 0 ? "bg-excel" : "bg-mint/40"),
                  f === "done" && (r === 0 ? "bg-excel" : r === 7 ? "bg-emerald" : c === 5 ? "bg-emerald/70" : "bg-mint/55"))}
                  style={{ transitionDelay: `${(r + c) * 25}ms` }} />
              );
            }))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Invoer", "Berekening", "Rapportage"].map((l, i) => (
              <div key={l} className={cn("rounded-lg border px-3 py-2 text-center text-[11px] transition", step >= i + 1 ? "border-emerald/60 bg-emerald/15 text-white" : "border-white/10 text-mint/40")}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
