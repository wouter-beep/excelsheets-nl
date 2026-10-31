"use client";
import { motion, useReducedMotion } from "framer-motion";
import { chart } from "./palette";
import { useEffect, useId, useRef, useState } from "react";

/** Meet de breedte van de container, zodat tekst in grafieken altijd op ware grootte wordt getoond. */
function useWidth(fallback = 640) {
  const ref = useRef<HTMLElement | null>(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => { const x = Math.round(e.contentRect.width); if (x > 0) setW(Math.max(260, x)); });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

type Fmt = (v: number) => string;
const T = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * p;
}

function useT() {
  const reduce = useReducedMotion();
  return reduce ? { duration: 0 } : T;
}

export type Series = { name: string; values: number[]; color?: string; type?: "bar" | "line" | "area"; dashed?: boolean };

/** Gecombineerde staaf-/lijngrafiek met gedeelde y-as. */
export function ComboChart({
  labels, series, height = 220, format, highlightIndex, minZero = true, ariaLabel,
}: { labels: string[]; series: Series[]; height?: number; format: Fmt; highlightIndex?: number; minZero?: boolean; ariaLabel: string }) {
  const t = useT();
  const [ref, W] = useWidth();
  const H = height, pl = 56, pr = 12, pt = 12, pb = 26;
  const all = series.flatMap((s) => s.values);
  const maxV = niceMax(Math.max(...all, 0));
  const minRaw = Math.min(...all, 0);
  const minV = minZero ? Math.min(0, -niceMax(-minRaw || 0) * (minRaw < 0 ? 1 : 0)) : minRaw;
  const iw = W - pl - pr, ih = H - pt - pb;
  const y = (v: number) => pt + ih - ((v - minV) / (maxV - minV || 1)) * ih;
  const n = labels.length;
  const bw = iw / n;
  const bars = series.filter((s) => (s.type ?? "bar") === "bar");
  const lines = series.filter((s) => s.type === "line" || s.type === "area");
  const gw = Math.min(bw * 0.72, 46);
  const each = gw / Math.max(bars.length, 1);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => minV + (maxV - minV) * k);
  const gid = useId();
  return (
    <figure ref={ref as React.RefObject<HTMLElement>} className="w-full" role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible">
        {ticks.map((tv, i) => (
          <g key={i}>
            <line x1={pl} x2={W - pr} y1={y(tv)} y2={y(tv)} stroke={chart.grid} strokeDasharray={tv === 0 ? "" : "3 4"} />
            <text x={pl - 8} y={y(tv) + 4} textAnchor="end" className="fill-ink-400 font-mono text-[10px]">{format(tv)}</text>
          </g>
        ))}
        {labels.map((l, i) => (
          <g key={l + i}>
            {highlightIndex === i && <rect x={pl + i * bw + 2} y={pt} width={bw - 4} height={ih} rx={6} fill="rgba(24,185,121,0.08)" />}
            {(bw >= 26 || i % 2 === 0) && <text x={pl + i * bw + bw / 2} y={H - 8} textAnchor="middle" className="fill-ink-500 font-mono text-[10px]">{l}</text>}
          </g>
        ))}
        {bars.map((s, si) =>
          s.values.map((v, i) => {
            const x = pl + i * bw + (bw - gw) / 2 + si * each;
            const y0 = y(0), y1 = y(v);
            return (
              <motion.rect key={s.name + i} initial={false} animate={{ y: Math.min(y0, y1), height: Math.max(Math.abs(y1 - y0), 0.5) }} transition={t}
                x={x + 1} width={Math.max(each - 2, 2)} rx={2.5} fill={s.color ?? chart.series[si]} opacity={highlightIndex === undefined || highlightIndex === i ? 1 : 0.55}>
                <title>{`${s.name} ${labels[i]}: ${format(v)}`}</title>
              </motion.rect>
            );
          })
        )}
        {lines.map((s, si) => {
          const pts = s.values.map((v, i) => [pl + i * bw + bw / 2, y(v)] as const);
          const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
          const area = `${d} L${pts[pts.length - 1][0].toFixed(1)},${y(Math.max(minV, 0))} L${pts[0][0].toFixed(1)},${y(Math.max(minV, 0))} Z`;
          const c = s.color ?? chart.series[(si + bars.length) % chart.series.length];
          return (
            <g key={s.name}>
              {s.type === "area" && (
                <>
                  <defs>
                    <linearGradient id={`${gid}-${si}`} x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity="0.28" />
                      <stop offset="100%" stopColor={c} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path initial={false} animate={{ d: area }} transition={t} fill={`url(#${gid}-${si})`} />
                </>
              )}
              <motion.path initial={false} animate={{ d }} transition={t} fill="none" stroke={c} strokeWidth={2.25} strokeDasharray={s.dashed ? "5 4" : undefined} strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) => (
                <motion.circle key={i} initial={false} animate={{ cx: p[0], cy: p[1] }} transition={t} r={2.8} fill="#fff" stroke={c} strokeWidth={1.8}>
                  <title>{`${s.name} ${labels[i]}: ${format(s.values[i])}`}</title>
                </motion.circle>
              ))}
            </g>
          );
        })}
      </svg>
      <Legend items={series.map((s, i) => ({ name: s.name, color: s.color ?? chart.series[i % chart.series.length], line: s.type === "line" || s.type === "area", dashed: s.dashed }))} />
    </figure>
  );
}

export function Legend({ items }: { items: { name: string; color: string; line?: boolean; dashed?: boolean }[] }) {
  return (
    <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-500">
      {items.map((it) => (
        <span key={it.name} className="inline-flex items-center gap-1.5">
          {it.line ? (
            <svg width="16" height="6" aria-hidden><line x1="0" x2="16" y1="3" y2="3" stroke={it.color} strokeWidth="2.5" strokeDasharray={it.dashed ? "4 3" : undefined} /></svg>
          ) : (
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: it.color }} />
          )}
          {it.name}
        </span>
      ))}
    </figcaption>
  );
}

export type WaterfallStep = { label: string; value: number; total?: boolean };

/** Watervalgrafiek: van startwaarde via verschillen naar eindwaarde. */
export function Waterfall({ steps, height = 220, format, ariaLabel, zoom = false }: { steps: WaterfallStep[]; height?: number; format: Fmt; ariaLabel: string; zoom?: boolean }) {
  const t = useT();
  const [ref, W] = useWidth();
  const H = height, pl = 56, pr = 12, pt = 18, pb = 30;
  let run = 0;
  const bars = steps.map((s) => {
    if (s.total) { run = s.value; return { ...s, from: 0, to: s.value }; }
    const from = run; run += s.value; return { ...s, from, to: run };
  });
  const maxRaw = Math.max(...bars.map((b) => Math.max(b.from, b.to)));
  const maxV = zoom ? maxRaw * 1.04 : niceMax(maxRaw);
  // zoom: as begint niet bij nul, zodat kleine verschillen zichtbaar worden (wordt in de grafiek vermeld)
  const minV = zoom ? Math.min(...bars.map((b) => (b.total ? b.to : Math.min(b.from, b.to)))) * 0.94 : Math.min(0, ...bars.map((b) => Math.min(b.from, b.to)));
  const iw = W - pl - pr, ih = H - pt - pb;
  const y = (v: number) => pt + ih - ((v - minV) / (maxV - minV || 1)) * ih;
  const bw = iw / steps.length;
  return (
    <figure ref={ref as React.RefObject<HTMLElement>} role="img" aria-label={ariaLabel}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible">
        {zoom && <text x={pl} y={10} className="fill-ink-400 text-[9.5px]">as begint niet bij 0</text>}
        {[0, 0.5, 1].map((k) => { const v = minV + (maxV - minV) * k; return (
          <g key={k}><line x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke={chart.grid} strokeDasharray="3 4" />
            <text x={pl - 8} y={y(v) + 4} textAnchor="end" className="fill-ink-400 font-mono text-[10px]">{format(v)}</text></g>); })}
        {bars.map((b, i) => {
          const x = pl + i * bw + bw * 0.18, w = bw * 0.64;
          const lo = b.total ? Math.max(minV, 0) : Math.min(b.from, b.to);
          const top = y(Math.max(b.from, b.to)), h = Math.max(Math.abs(y(b.total ? lo : b.from) - y(b.to)), 1);
          const color = b.total ? chart.actual : b.value >= 0 ? chart.positive : chart.negative;
          const next = bars[i + 1];
          return (
            <g key={b.label}>
              <motion.rect initial={false} animate={{ y: top, height: h }} transition={t} x={x} width={w} rx={3} fill={color} opacity={b.total ? 1 : 0.9}>
                <title>{`${b.label}: ${format(b.value)}`}</title>
              </motion.rect>
              <motion.text initial={false} animate={{ y: top - 5 }} transition={t} x={x + w / 2} textAnchor="middle" className="fill-ink font-mono text-[10px] font-semibold">
                {b.total ? format(b.value) : (b.value > 0 ? "+" : "") + format(b.value)}
              </motion.text>
              {next && <motion.line initial={false} animate={{ y1: y(b.to), y2: y(b.to) }} transition={t} x1={x + w} x2={x + bw} stroke={chart.neutral} strokeDasharray="2 2" opacity={0.5} />}
              <text x={x + w / 2} y={H - 10} textAnchor="middle" className="fill-ink-500 text-[10px]">{bw < 52 ? b.label.slice(0, 5) : b.label}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export function Donut({ parts, size = 132, format, center, ariaLabel }: { parts: { name: string; value: number; color?: string }[]; size?: number; format: Fmt; center?: string; ariaLabel: string }) {
  const t = useT();
  const total = parts.reduce((s, p) => s + Math.max(p.value, 0), 0) || 1;
  const r = 52, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <figure className="flex items-center gap-4" role="img" aria-label={ariaLabel}>
      <svg viewBox="0 0 132 132" width={size} height={size} className="shrink-0 -rotate-90">
        <circle cx="66" cy="66" r={r} fill="none" stroke={chart.grid} strokeWidth="14" />
        {parts.map((p, i) => {
          const len = (Math.max(p.value, 0) / total) * c;
          const off = acc; acc += len;
          return (
            <motion.circle key={p.name} cx="66" cy="66" r={r} fill="none" stroke={p.color ?? chart.series[i]} strokeWidth="14"
              initial={false} animate={{ strokeDasharray: `${Math.max(len - 2, 0)} ${c}`, strokeDashoffset: -off }} transition={t}>
              <title>{`${p.name}: ${format(p.value)}`}</title>
            </motion.circle>
          );
        })}
        {center && <text x="66" y="70" textAnchor="middle" transform="rotate(90 66 66)" className="fill-ink font-display text-[15px] font-bold">{center}</text>}
      </svg>
      <ul className="space-y-1 text-[12px]">
        {parts.map((p, i) => (
          <li key={p.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: p.color ?? chart.series[i] }} />
            <span className="text-ink-500">{p.name}</span>
            <span className="ml-auto pl-3 font-mono tabular text-ink">{format(p.value)}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export function Sparkline({ values, color = chart.actualLight, height = 32, width = 110 }: { values: number[]; color?: string; height?: number; width?: number }) {
  const t = useT();
  const max = Math.max(...values), min = Math.min(...values);
  const d = values.map((v, i) => `${i ? "L" : "M"}${((i / (values.length - 1)) * width).toFixed(1)},${(height - 3 - ((v - min) / (max - min || 1)) * (height - 6)).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden className="overflow-visible">
      <motion.path initial={false} animate={{ d }} transition={t} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Horizontale staven, bijvoorbeeld voor rangschikking of capaciteit. */
export function HBars({ items, format, max, ariaLabel }: { items: { label: string; value: number; color?: string; marker?: number }[]; format: Fmt; max?: number; ariaLabel: string }) {
  const t = useT();
  const m = max ?? Math.max(...items.map((i) => Math.max(i.value, i.marker ?? 0)), 1);
  return (
    <ul className="space-y-2.5" role="img" aria-label={ariaLabel}>
      {items.map((it) => (
        <li key={it.label} className="grid grid-cols-[minmax(84px,30%)_1fr_auto] items-center gap-3 text-[12px]">
          <span className="truncate text-ink-500">{it.label}</span>
          <span className="relative h-2.5 rounded-full bg-ink/[0.06]">
            <motion.span initial={false} animate={{ width: `${Math.min(100, (Math.max(it.value, 0) / m) * 100)}%` }} transition={t}
              className="absolute inset-y-0 left-0 rounded-full" style={{ background: it.color ?? chart.actual }} />
            {it.marker !== undefined && <span className="absolute -top-1 h-[18px] w-0.5 rounded bg-ink" style={{ left: `${Math.min(100, (it.marker / m) * 100)}%` }} />}
          </span>
          <span className="w-20 text-right font-mono tabular text-ink">{format(it.value)}</span>
        </li>
      ))}
    </ul>
  );
}
