"use client";
import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { euro } from "@/lib/format";

/** Formule naar resultaat: wijzig invoer en zie de uitkomst van een eenvoudig model veranderen. */
export function FormulaToResult() {
  const [rev, setRev] = useState(125_000);
  const [margin, setMargin] = useState(0.38);
  const [costs, setCosts] = useState(31_500);
  const result = rev * margin - costs;
  const ids = [useId(), useId(), useId()];
  const rows = [
    { cell: "B2", label: "Omzet", value: rev, set: setRev, min: 50_000, max: 250_000, step: 2_500, fmt: euro },
    { cell: "B3", label: "Brutomarge", value: margin, set: setMargin, min: 0.1, max: 0.6, step: 0.01, fmt: (v: number) => `${Math.round(v * 100)}%` },
    { cell: "B4", label: "Vaste kosten", value: costs, set: setCosts, min: 10_000, max: 60_000, step: 500, fmt: euro },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-2.5 text-[13px]">
        <span className="w-10 font-mono text-ink-400">B5</span><span className="font-mono text-excel">fx</span>
        <code className="font-mono text-ink">=B2*B3-B4</code>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_200px]">
        <div className="divide-y divide-ink/[0.06]">
          {rows.map((r, i) => (
            <div key={r.cell} className="grid grid-cols-[34px_1fr] items-center gap-3 px-4 py-3">
              <span className="font-mono text-[11px] text-ink-400">{r.cell}</span>
              <div>
                <label htmlFor={ids[i]} className="flex justify-between text-[13px]"><span className="text-ink-500">{r.label}</span><span className="rounded bg-amber-100 px-1.5 font-mono font-semibold text-cobalt">{r.fmt(r.value)}</span></label>
                <input id={ids[i]} type="range" min={r.min} max={r.max} step={r.step} value={r.value} onChange={(e) => r.set(Number(e.target.value))} className="mt-1 w-full accent-[#147D52]" aria-valuetext={r.fmt(r.value)} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center bg-forest p-5 text-white">
          <span className="font-mono text-[11px] text-mint/60">B5 · Resultaat</span>
          <AnimatePresence mode="popLayout">
            <motion.span key={Math.round(result / 100)} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}
              className={`mt-1 font-display text-3xl font-extrabold tabular ${result < 0 ? "text-coral" : "text-emerald"}`} aria-live="polite">
              {euro(result)}
            </motion.span>
          </AnimatePresence>
          <span className="mt-2 text-[12px] text-mint/60">{euro(rev)} × {Math.round(margin * 100)}% − {euro(costs)}</span>
        </div>
      </div>
    </div>
  );
}
