"use client";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FunctionSquare, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import type { Cell, GridSheet } from "@/lib/sheet/types";
import { A1, colLetter } from "@/lib/sheet/types";
import { displayCell } from "@/lib/sheet/display";
import { cn } from "@/lib/cn";

export type CustomSheet = { name: string; kind: "custom"; content: ReactNode };
export type SheetView = GridSheet | CustomSheet;
export type Inspect = { ref: string; formula: string; note?: string };

const InspectCtx = createContext<(i: Inspect) => void>(() => {});
/** Laat een element (bijv. een KPI-tegel) zijn formule in de formulebalk tonen. */
export const useInspect = () => useContext(InspectCtx);

const styleMap: Record<string, string> = {
  title: "font-display text-[14px] font-extrabold text-forest",
  subtitle: "text-ink-400 italic",
  header: "bg-excel text-white font-semibold text-[11px] tracking-wide",
  label: "text-ink-700",
  input: "bg-amber-100/80 text-cobalt font-semibold cursor-text",
  calc: "text-ink",
  sub: "font-semibold text-ink border-t border-ink/20",
  total: "font-bold text-forest bg-mint-100 border-t-2 border-forest/60",
  pos: "text-excel font-medium",
  neg: "text-coral font-medium",
  muted: "text-ink-400",
  "check-ok": "bg-mint text-forest font-semibold",
  "check-bad": "bg-coral-100 text-coral font-semibold",
  note: "text-ink-400 italic text-[11px]",
  warn: "bg-amber-100 text-amber-600 font-semibold",
  shift: "font-semibold text-center",
};

export function Workbook({
  fileName, sheets, controls, checks, onEdit, downloadHref, demo = true, initialSheet = 0,
  height = 520, className, sheetIndex, onSheetChange, footerNote,
}: {
  fileName: string;
  sheets: SheetView[];
  controls?: ReactNode;
  checks?: { label: string; ok: boolean }[];
  onEdit?: (key: string, value: number) => void;
  downloadHref?: string;
  demo?: boolean;
  initialSheet?: number;
  height?: number | string;
  className?: string;
  sheetIndex?: number;
  onSheetChange?: (i: number) => void;
  footerNote?: string;
}) {
  const [inner, setInner] = useState(initialSheet);
  const active = sheetIndex ?? inner;
  const setActive = (i: number) => { setInner(i); onSheetChange?.(i); setInspect(null); };
  const [inspect, setInspect] = useState<Inspect | null>(null);
  const sheet = sheets[Math.min(active, sheets.length - 1)];
  const allOk = checks?.every((c) => c.ok) ?? true;
  const tabsId = useId();

  return (
    <InspectCtx.Provider value={setInspect}>
      <div className={cn("overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lift", className)}>
        {/* Titelbalk */}
        <div className="flex items-center gap-3 border-b border-ink/10 bg-forest px-4 py-2.5 text-white">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" />
          </span>
          <span className="truncate font-mono text-[12px] text-mint/90">{fileName}</span>
          {demo && <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mint">Demo · fictieve gegevens</span>}
          {downloadHref && (
            <a href={downloadHref} className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald px-3 py-1 text-[11px] font-bold text-forest-900 hover:bg-emerald-400", !demo && "ml-auto")} download>
              <Download className="h-3.5 w-3.5" aria-hidden /> .xlsx
            </a>
          )}
        </div>
        {/* Lint met besturing */}
        {controls && <div className="flex flex-wrap items-end gap-x-5 gap-y-3 border-b border-ink/10 bg-paper px-4 py-3">{controls}</div>}
        {/* Formulebalk */}
        <div className="flex min-h-[38px] items-stretch border-b border-ink/10 text-[12px]">
          <div className="flex w-16 shrink-0 items-center justify-center border-r border-ink/10 font-mono text-ink-500">{inspect?.ref ?? "A1"}</div>
          <div className="flex items-center border-r border-ink/10 px-2 text-excel"><FunctionSquare className="h-4 w-4" aria-label="Formule" /></div>
          <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-1" aria-live="polite">
            <span className="truncate font-mono text-ink">{inspect?.formula ?? <span className="text-ink-400">Klik op een cel of KPI om de formule te bekijken</span>}</span>
            {inspect?.note && <span className="truncate text-[11px] text-ink-400">{inspect.note}</span>}
          </div>
        </div>
        {/* Werkblad */}
        <div role="tabpanel" id={`${tabsId}-panel`} aria-labelledby={`${tabsId}-tab-${active}`} className="relative overflow-auto scrollbar-thin" style={{ height }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sheet.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-h-full">
              {sheet.kind === "grid" ? <Grid sheet={sheet} onInspect={setInspect} onEdit={onEdit} /> : <div className="bg-paper/60 p-3 sm:p-4">{sheet.content}</div>}
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Tabs + status */}
        <div className="flex items-stretch border-t border-ink/10 bg-paper text-[12px]">
          <div role="tablist" aria-label="Werkbladen" className="no-scrollbar flex min-w-0 flex-1 overflow-x-auto">
            {sheets.map((s, i) => (
              <button key={s.name} id={`${tabsId}-tab-${i}`} role="tab" aria-selected={i === active} aria-controls={`${tabsId}-panel`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") { e.preventDefault(); setActive((i + 1) % sheets.length); }
                  if (e.key === "ArrowLeft") { e.preventDefault(); setActive((i - 1 + sheets.length) % sheets.length); }
                }}
                tabIndex={i === active ? 0 : -1}
                className={cn("relative shrink-0 whitespace-nowrap border-r border-ink/10 px-4 py-2 font-medium transition-colors",
                  i === active ? "bg-white text-excel" : "text-ink-500 hover:bg-white/60 hover:text-ink")}>
                {s.name}
                {i === active && <motion.span layoutId={`${tabsId}-ul`} className="absolute inset-x-2 bottom-0 h-[3px] rounded-t bg-emerald" />}
              </button>
            ))}
          </div>
          {checks && checks.length > 0 && (
            <div className={cn("hidden shrink-0 items-center gap-1.5 border-l border-ink/10 px-3 sm:flex", allOk ? "text-excel" : "text-coral")} title={checks.map((c) => `${c.ok ? "✓" : "✗"} ${c.label}`).join("\n")}>
              {allOk ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <AlertTriangle className="h-4 w-4" aria-hidden />}
              <span className="font-medium">{allOk ? `Controles OK (${checks.length})` : `${checks.filter((c) => !c.ok).length} controle(s) wijken af`}</span>
            </div>
          )}
        </div>
        {footerNote && (
          <p className="flex items-start gap-2 border-t border-ink/10 bg-white px-4 py-2 text-[11px] text-ink-500"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />{footerNote}</p>
        )}
      </div>
    </InspectCtx.Provider>
  );
}

function Grid({ sheet, onInspect, onEdit }: { sheet: GridSheet; onInspect: (i: Inspect) => void; onEdit?: (key: string, v: number) => void }) {
  const [sel, setSel] = useState<[number, number] | null>(null);
  const [editing, setEditing] = useState<[number, number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const nCols = sheet.cols.length;

  const select = useCallback((r: number, c: number) => {
    setSel([r, c]);
    const cell = sheet.rows[r]?.[c];
    const addr = A1(c, r + 1);
    if (!cell || cell.v === null) { onInspect({ ref: addr, formula: "" }); return; }
    const formula = cell.f ? `=${cell.f}` : displayCell(cell);
    const note = cell.note ?? (cell.edit ? "Invoercel: klik en wijzig de waarde" : undefined);
    onInspect({ ref: addr, formula, note });
  }, [sheet, onInspect]);

  useEffect(() => { setSel(null); setEditing(null); }, [sheet.name]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (editing) return;
    const [r, c] = sel ?? [0, 0];
    const moves: Record<string, [number, number]> = { ArrowDown: [1, 0], ArrowUp: [-1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    const m = moves[e.key];
    if (m) {
      e.preventDefault();
      select(Math.max(0, Math.min(sheet.rows.length - 1, r + m[0])), Math.max(0, Math.min(nCols - 1, c + m[1])));
    } else if ((e.key === "Enter" || e.key === "F2") && sel) {
      const cell = sheet.rows[r]?.[c];
      if (cell?.edit && onEdit) { e.preventDefault(); setEditing([r, c]); }
    }
  };

  const gridTemplate = useMemo(() => `40px ${sheet.cols.map((w) => `${w}px`).join(" ")}`, [sheet.cols]);
  const totalW = 40 + sheet.cols.reduce((a, b) => a + b, 0);

  return (
    <div ref={ref} tabIndex={0} onKeyDown={onKey} aria-label={`Werkblad ${sheet.name}. Gebruik de pijltjestoetsen om cellen te selecteren.`}
      className="relative text-[12px] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald" style={{ minWidth: totalW }}>
      {/* kolomkoppen */}
      <div className="sticky top-0 z-20 grid border-b border-ink/10 bg-paper-200/95 backdrop-blur" style={{ gridTemplateColumns: gridTemplate }}>
        <div className="sticky left-0 z-10 border-r border-ink/10 bg-paper-200" />
        {sheet.cols.map((_, c) => (
          <div key={c} className={cn("border-r border-ink/10 py-1 text-center font-mono text-[10px] text-ink-400", sel?.[1] === c && "bg-mint text-forest")}>{colLetter(c)}</div>
        ))}
      </div>
      {sheet.rows.map((row, r) => (
        <div key={r} className="grid" style={{ gridTemplateColumns: gridTemplate }}>
          <div className={cn("sticky left-0 z-10 flex items-center justify-center border-b border-r border-ink/10 bg-paper-200 font-mono text-[10px] text-ink-400", sel?.[0] === r && "bg-mint text-forest")}>{r + 1}</div>
          {Array.from({ length: nCols }).map((_, c) => {
            const cell = row[c];
            const isSel = sel?.[0] === r && sel?.[1] === c;
            const isEdit = editing?.[0] === r && editing?.[1] === c;
            if (cell === undefined && c > 0) {
              // overspanning van vorige cel
              let k = c - 1; while (k >= 0 && row[k] === undefined) k--;
              const prev = k >= 0 ? row[k] : null;
              if (prev && prev.span && k + prev.span > c) return null;
            }
            const isNum = typeof cell?.v === "number";
            const span = cell?.span ? Math.min(cell.span, nCols - c) : 1;
            return (
              <div key={c} role="gridcell" aria-selected={isSel}
                onClick={() => { select(r, c); if (cell?.edit && onEdit) setEditing([r, c]); }}
                className={cn("relative flex min-h-[26px] items-center overflow-hidden whitespace-nowrap border-b border-r border-ink/[0.07] px-2",
                  isNum ? "justify-end tabular font-mono text-[11.5px]" : "justify-start",
                  cell?.s && styleMap[cell.s], isSel && "z-[5] shadow-cell")}
                style={{ gridColumn: span > 1 ? `span ${span}` : undefined, background: cell?.bg }}>
                {isEdit && cell?.edit ? (
                  <EditInput cell={cell} onDone={(v) => { setEditing(null); if (v !== null) onEdit?.(cell.edit!.key, v); ref.current?.focus(); }} />
                ) : cell ? displayCell(cell) : null}
                {cell?.f && isSel && <span className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[6px] border-t-[6px] border-l-transparent border-t-emerald" />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function EditInput({ cell, onDone }: { cell: Cell; onDone: (v: number | null) => void }) {
  const pct = cell.fmt === "pct";
  const initial = typeof cell.v === "number" ? (pct ? +(cell.v * 100).toFixed(2) : cell.v) : 0;
  const [val, setVal] = useState(String(initial).replace(".", ","));
  const commit = () => {
    const raw = Number(val.replace(/\./g, "").replace(",", "."));
    if (!Number.isFinite(raw)) return onDone(null);
    let v = pct ? raw / 100 : raw;
    if (cell.edit?.min !== undefined) v = Math.max(cell.edit.min, v);
    if (cell.edit?.max !== undefined) v = Math.min(cell.edit.max, v);
    onDone(v);
  };
  return (
    <input autoFocus inputMode="decimal" aria-label="Waarde wijzigen" value={val} onChange={(e) => setVal(e.target.value)}
      onBlur={commit} onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") onDone(null); e.stopPropagation(); }}
      className="absolute inset-0 w-full bg-white px-2 text-right font-mono text-[12px] text-cobalt outline-none ring-2 ring-inset ring-cobalt" />
  );
}

/* ---------- Bedieningselementen voor het lint ---------- */

export function RibbonSelect<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}
        className="h-8 rounded-lg border border-ink/15 bg-white pl-2.5 pr-8 text-[12px] font-medium text-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function RibbonSegment<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">{label}</span>
      <div role="radiogroup" aria-label={label} className="inline-flex h-8 rounded-lg border border-ink/15 bg-white p-0.5">
        {options.map((o) => (
          <button key={o.value} role="radio" aria-checked={o.value === value} onClick={() => onChange(o.value)}
            className={cn("rounded-md px-2.5 text-[12px] font-medium transition", o.value === value ? "bg-forest text-white" : "text-ink-500 hover:text-ink")}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RibbonSlider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  const id = useId();
  return (
    <div className="flex min-w-[170px] flex-col gap-1">
      <label htmlFor={id} className="flex justify-between gap-3 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        <span>{label}</span><span className="font-mono normal-case tracking-normal text-forest">{format(value)}</span>
      </label>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 w-full cursor-pointer accent-[#147D52]" aria-valuetext={format(value)} />
    </div>
  );
}

/* ---------- Bouwstenen voor dashboardbladen ---------- */

export function Kpi({ label, value, delta, deltaGood, sub, formula, refCell, note, spark }: {
  label: string; value: string; delta?: string; deltaGood?: boolean; sub?: string; formula?: string; refCell?: string; note?: string; spark?: ReactNode;
}) {
  const inspect = useInspect();
  const Comp = formula ? "button" : "div";
  return (
    <Comp type={formula ? "button" : undefined} onClick={formula ? () => inspect({ ref: refCell ?? "KPI", formula, note }) : undefined}
      className={cn("group flex flex-col rounded-xl border border-ink/[0.08] bg-white p-3 text-left transition", formula && "hover:border-emerald/60 hover:shadow-card")}>
      <span className="flex items-center justify-between gap-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">
        {label}{formula && <FunctionSquare className="h-3.5 w-3.5 text-ink-300 transition group-hover:text-emerald" aria-hidden />}
      </span>
      <span className="mt-1 font-display text-[20px] font-extrabold tabular tracking-tight text-ink sm:text-[22px]">{value}</span>
      <span className="mt-0.5 flex items-center gap-2 text-[11px]">
        {delta && <span className={cn("rounded-md px-1.5 py-0.5 font-mono font-semibold", deltaGood ? "bg-mint text-forest" : "bg-coral-100 text-coral")}>{delta}</span>}
        {sub && <span className="text-ink-400">{sub}</span>}
      </span>
      {spark && <span className="mt-2">{spark}</span>}
    </Comp>
  );
}

export function Panel({ title, children, className, aside }: { title: string; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <section className={cn("rounded-xl border border-ink/[0.08] bg-white p-3 sm:p-4", className)}>
      <header className="mb-2 flex items-center justify-between gap-2">
        <h4 className="font-display text-[13px] font-bold text-ink">{title}</h4>
        {aside}
      </header>
      {children}
    </section>
  );
}
