"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Mini-dashboard als merkelement: cellen die oplopen tot een grafiek. Puur decoratief. */
export function FooterDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const bars = [32, 41, 38, 52, 49, 61, 58, 70, 76, 84];
  return (
    <div ref={ref} aria-hidden className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-mint/50">
        <span>=TREND(B2:B11)</span><span className="text-emerald">▲ groei</span>
      </div>
      <div className="flex h-24 items-end gap-1.5">
        {bars.map((b, i) => (
          <motion.span key={i} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-excel to-emerald"
            initial={{ height: reduce ? `${b}%` : "8%" }} animate={inView ? { height: `${b}%` } : {}} transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5 font-mono text-[9px] text-mint/30">
        {bars.map((_, i) => <span key={i} className="text-center">B{i + 2}</span>)}
      </div>
    </div>
  );
}
