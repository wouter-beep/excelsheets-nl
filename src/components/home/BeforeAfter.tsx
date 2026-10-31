"use client";
import { useId, useState } from "react";
import { MoveHorizontal } from "lucide-react";

const MESSY = [
  ["omzet jan", "", "45122", "=B2*1,21", "???"],
  ["Omzet feb ", "44.980", "", "#VERW!", ""],
  ["MRT", "51200", "51.200,00", "=C4+C2", "check!!"],
  ["apr (incl?)", "48760", "48760", "48760", ""],
  ["totaal", "", "189.062", "=SOM(C2:C4)", "klopt niet?"],
  ["kosten", "-12000", "12.000", "", "zie oude file"],
  ["", "", "", "", ""],
  ["marge%", "0,31", "31%", "=D5/C5", "#DEEL/0!"],
];

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lift" style={{ aspectRatio: "16 / 9.5" }}>
        {/* Na */}
        <div className="absolute inset-0 bg-paper p-3 sm:p-5">
          <div className="mb-2 flex items-center justify-between"><span className="font-display text-sm font-extrabold text-forest sm:text-base">Omzetrapportage 2026</span><span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-forest">Controles OK ✓</span></div>
          <div className="grid grid-cols-3 gap-2">
            {[["Omzet YTD", "€ 2,84 mln", "+4,2%"], ["Brutomarge", "41,8%", "+0,6 pp"], ["Resultaat", "€ 412k", "+8,1%"]].map(([l, v, d]) => (
              <div key={l} className="rounded-lg border border-ink/10 bg-white p-2"><div className="text-[8px] font-semibold uppercase tracking-wider text-ink-400 sm:text-[10px]">{l}</div><div className="font-display text-[13px] font-extrabold sm:text-lg">{v}</div><div className="font-mono text-[9px] text-excel sm:text-[11px]">{d}</div></div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-5 gap-2">
            <div className="col-span-3 flex h-[min(18vw,140px)] items-end gap-1 rounded-lg border border-ink/10 bg-white p-2">
              {[40, 46, 52, 49, 58, 61, 55, 64, 70].map((v, i) => <span key={i} className="flex-1 rounded-t bg-excel" style={{ height: `${v}%` }} />)}
            </div>
            <div className="col-span-2 space-y-1 rounded-lg border border-ink/10 bg-white p-2 text-[8px] sm:text-[11px]">
              {[["Invoer", "bg-amber-100"], ["Berekening", "bg-white"], ["Totaal", "bg-mint"], ["Controle", "bg-mint"]].map(([l, c]) => (
                <div key={l} className={`flex justify-between rounded px-1.5 py-1 ${c}`}><span>{l}</span><span className="font-mono">✓</span></div>
              ))}
            </div>
          </div>
        </div>
        {/* Voor */}
        <div className="absolute inset-0 bg-[#fffef6]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
          <div className="h-full overflow-hidden p-3 font-[Arial,sans-serif] sm:p-5">
            <div className="mb-2 text-[11px] font-bold text-[#c00] sm:text-sm">OMZET 2026 DEFINITIEF (2) - kopie.xlsx</div>
            <table className="w-full border-collapse text-[8px] sm:text-[12px]">
              <tbody>
                {MESSY.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (
                    <td key={j} className="border border-[#ccc] px-1 py-[3px]" style={{ background: (i * 3 + j) % 7 === 0 ? "#ffff66" : (i + j) % 5 === 0 ? "#ffc7ce" : i === 4 ? "#ddebf7" : undefined, textAlign: j === 0 ? "left" : (i + j) % 2 ? "right" : "center", fontWeight: i % 3 === 0 ? 700 : 400, color: c.startsWith("#") ? "#c00" : undefined, width: j === 0 ? "26%" : undefined }}>{c}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-emerald" />
          <div className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full bg-emerald text-forest shadow-lift"><MoveHorizontal className="h-5 w-5" /></div>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-coral px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" aria-hidden>Voor</span>
        <span className="absolute bottom-3 right-3 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" aria-hidden>Na</span>
        <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" aria-label="Schuif om het verschil tussen het oude en het verbeterde bestand te bekijken" aria-valuetext={`${pos}% oud bestand zichtbaar`} />
      </div>
      <p className="mt-3 text-center text-sm text-ink-400">Sleep de schuif of gebruik de pijltjestoetsen. Illustratie met fictieve gegevens.</p>
    </div>
  );
}
