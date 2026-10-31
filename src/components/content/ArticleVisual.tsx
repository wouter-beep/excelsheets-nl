/** Abstracte illustraties per thema, in de huisstijl (SVG, decoratief). */
export function ArticleVisual({ kind, year, className }: { kind: string; year?: number; className?: string }) {
  const g = "#147D52", e = "#18B979", m = "#CBF8E0", f = "#073B2A", a = "#F2B84B";
  const cells = (fn: (r: number, c: number) => string | null) => Array.from({ length: 6 }).flatMap((_, r) => Array.from({ length: 10 }).map((_, c) => { const fill = fn(r, c); return fill ? <rect key={`${r}-${c}`} x={20 + c * 36} y={30 + r * 22} width="32" height="18" rx="3" fill={fill} /> : null; }));
  const art: Record<string, React.ReactNode> = {
    grid: cells((r, c) => (r + c) % 5 === 0 ? e : (r * c) % 7 === 1 ? g : "rgba(203,248,224,.12)"),
    query: <>{[0, 1, 2].map((i) => <rect key={i} x="24" y={36 + i * 42} width="80" height="30" rx="5" fill="rgba(203,248,224,.15)" />)}<path d="M108 51 C 160 51, 160 93, 200 93 M108 93 L200 93 M108 135 C 160 135, 160 93, 200 93" stroke={e} strokeWidth="3" fill="none" />{[0, 1, 2, 3].map((i) => <rect key={i} x={208} y={60 + i * 18} width="150" height="13" rx="2" fill={i === 0 ? e : "rgba(203,248,224,.25)"} />)}</>,
    array: <>{<rect x="24" y="40" width="70" height="22" rx="4" fill={e} />}{Array.from({ length: 5 }).map((_, r) => Array.from({ length: 4 }).map((_, c) => <rect key={`${r}${c}`} x={24 + c * 74} y={66 + r * 20} width="70" height="16" rx="3" fill={c === 0 && r === 0 ? "transparent" : `rgba(24,185,121,${0.15 + (0.6 * (4 - r)) / 5})`} />))}<path d="M330 50 l18 0 m-6 -6 l6 6 l-6 6" stroke={m} strokeWidth="2.5" fill="none" /></>,
    lookup: <>{Array.from({ length: 6 }).map((_, r) => <g key={r}><rect x="30" y={34 + r * 22} width="90" height="18" rx="3" fill={r === 3 ? e : "rgba(203,248,224,.15)"} /><rect x="250" y={34 + r * 22} width="110" height="18" rx="3" fill={r === 3 ? a : "rgba(203,248,224,.15)"} /></g>)}<path d="M124 109 C 180 109, 190 109, 246 109" stroke={a} strokeWidth="3" strokeDasharray="6 5" fill="none" /><circle cx="246" cy="109" r="5" fill={a} /></>,
    ai: <>{cells((r, c) => ((r - 2.5) ** 2 + (c - 4.5) ** 2 < 8 ? `rgba(24,185,121,${0.9 - ((r - 2.5) ** 2 + (c - 4.5) ** 2) / 10})` : "rgba(203,248,224,.08)"))}<path d="M200 70 l6 16 16 6 -16 6 -6 16 -6 -16 -16 -6 16 -6z" fill="#fff" /></>,
    python: <><rect x="24" y="36" width="330" height="26" rx="5" fill="rgba(203,248,224,.15)" /><text x="36" y="54" fontFamily="monospace" fontSize="13" fill={m}>=PY( df.groupby(&quot;maand&quot;).sum() )</text>{[40, 64, 52, 88, 74, 104, 96].map((h, i) => <rect key={i} x={40 + i * 44} y={170 - h} width="28" height={h} rx="3" fill={i === 5 ? a : e} />)}</>,
    chart: <>{[50, 70, 62, 90, 84, 110, 104, 128].map((h, i) => <rect key={i} x={30 + i * 42} y={170 - h} width="26" height={h} rx="3" fill={i > 5 ? "rgba(24,185,121,.45)" : e} />)}<polyline points="43,110 85,95 127,100 169,75 211,80 253,58 295,62 337,40" fill="none" stroke={a} strokeWidth="3" /></>,
    collab: <>{cells(() => "rgba(203,248,224,.1)")}<rect x="92" y="52" width="68" height="22" rx="3" fill="none" stroke={a} strokeWidth="3" /><rect x="236" y="96" width="68" height="22" rx="3" fill="none" stroke={e} strokeWidth="3" /><rect x="92" y="38" width="30" height="13" rx="3" fill={a} /><rect x="236" y="82" width="30" height="13" rx="3" fill={e} /></>,
    shield: <>{cells((r, c) => (c < 3 ? "rgba(24,185,121,.35)" : "rgba(203,248,224,.08)"))}<path d="M250 40 l50 18 v34 c0 30 -22 48 -50 58 c-28 -10 -50 -28 -50 -58 v-34z" fill={g} stroke={e} strokeWidth="3" /><path d="M232 96 l14 14 26 -30" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
    text: <>{["Naam;Plaats;Bedrag", "Jansen;Utrecht;1.250", "De Vries;Zwolle;980"].map((t, i) => <text key={i} x="30" y={58 + i * 24} fontFamily="monospace" fontSize="14" fill={i === 0 ? e : m}>{t}</text>)}<path d="M200 105 l20 0 m-7 -7 l7 7 l-7 7" stroke={a} strokeWidth="3" fill="none" />{[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={240 + c * 42} y={92 + r * 22} width="38" height="18" rx="3" fill={r === 0 ? e : "rgba(203,248,224,.2)"} />))}</>,
    script: <><rect x="24" y="34" width="160" height="136" rx="6" fill="rgba(203,248,224,.1)" />{[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={36 + (i % 3) * 8} y={48 + i * 19} width={[90, 110, 70, 120, 60, 100][i]} height="8" rx="2" fill={i === 1 || i === 4 ? e : "rgba(203,248,224,.35)"} />)}<circle cx="270" cy="102" r="44" fill="none" stroke={e} strokeWidth="5" strokeDasharray="200 80" /><path d="M262 84 l22 18 -22 18z" fill={a} /></>,
    forty: <><text x="190" y="140" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="120" fill={e}>40</text><text x="190" y="170" textAnchor="middle" fontFamily="monospace" fontSize="13" fill={m}>1985 → 2025</text></>,
  };
  return (
    <svg viewBox="0 0 380 200" className={className} role="img" aria-label={`Illustratie${year ? ` bij ${year}` : ""}`}>
      <rect width="380" height="200" rx="16" fill={f} />
      {art[kind] ?? art.grid}
      {year && <text x="356" y="186" textAnchor="end" fontFamily="monospace" fontSize="12" fill="rgba(203,248,224,.6)">{year}</text>}
    </svg>
  );
}
