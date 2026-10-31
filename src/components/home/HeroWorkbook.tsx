"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Workbook, Kpi, Panel, RibbonSlider, useInspect, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, Waterfall } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { MONTHS, euroCompact, percent, signedPercent, sum } from "@/lib/format";
import { SheetBuilder, h, t, n, fx } from "@/lib/sheet/types";
import { cn } from "@/lib/cn";

// Fictief: Lindenhof Groothandel B.V. — bedragen in euro's
const PY = [880, 910, 1010, 985, 1040, 1060, 920, 870, 1050, 1095, 1120, 1240].map((v) => v * 1000);
const BUDGET = PY.map((v) => Math.round(v * 1.06));
const DEV = [-0.02, 0.01, 0.03, 0.02, 0.04, 0.01, 0.05, 0.03, 0.04];
const ACTUAL_MONTHS = 9;
const COGS = 0.584, COGS_B = 0.58, PERS = 192_000, OTHER = 64_000;

function compute(growth: number) {
  const rev = PY.map((py, m) => (m < ACTUAL_MONTHS ? Math.round(BUDGET[m] * (1 + DEV[m])) : Math.round(py * (1 + growth))));
  const cogs = rev.map((r) => Math.round(r * COGS));
  const res = rev.map((r, m) => r - cogs[m] - PERS - OTHER);
  const resB = BUDGET.map((b) => Math.round(b - b * COGS_B - PERS - OTHER));
  const R = sum(rev), C = sum(cogs), P = PERS * 12, O = OTHER * 12, E = R - C - P - O;
  return { rev, cogs, res, resB, R, C, P, O, E, B: sum(BUDGET), EB: sum(resB) };
}

function Intro({ onDone }: { onDone: () => void }) {
  const inspect = useInspect();
  const reduce = useReducedMotion();
  const formula = "=SUM(Omzet!C5:C16)";
  useEffect(() => {
    if (reduce) { onDone(); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      inspect({ ref: "C17", formula: formula.slice(0, i), note: i >= formula.length ? "Totaalomzet 2026: realisatie + forecast" : undefined });
      if (i >= formula.length) { clearInterval(id); setTimeout(onDone, 650); }
    }, 55);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid grid-cols-4 gap-1 p-1 sm:grid-cols-6" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, backgroundColor: i < 6 ? "#147D52" : i % 7 === 3 ? "#CBF8E0" : "#FFFFFF" }} transition={{ delay: i * 0.025, duration: 0.3 }}
          className={cn("h-9 rounded border border-ink/[0.06] px-2 py-1.5 text-right font-mono text-[11px] text-ink-500", i < 6 && "bg-excel font-semibold text-white")}>
          {i < 6 ? ["Maand", "Budget", "Omzet", "Inkoop", "Marge", "Res."][i] : euroCompact(PY[i % 12] * (1 + (i % 5) / 50))}
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroWorkbook() {
  const [growth, setGrowth] = useState(0.08);
  const [sheet, setSheet] = useState(0);
  const [intro, setIntro] = useState(true);
  const r = useMemo(() => compute(growth), [growth]);
  const gm = (r.R - r.C) / r.R;

  const dashboard = intro ? <Intro onDone={() => setIntro(false)} /> : (
    <motion.div className="grid gap-3" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }}>
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <Kpi label="Omzet 2026" value={euroCompact(r.R)} delta={signedPercent(r.R / r.B - 1)} deltaGood={r.R >= r.B} sub="vs budget" formula="=SUM(Omzet!C5:C16)" refCell="Omzet!C17" note="Realisatie t/m september + forecast" />
        <Kpi label="Brutomarge" value={percent(gm)} sub={`budget ${percent(1 - COGS_B)}`} formula="=(C17-Kosten!B17)/C17" refCell="Dashboard!B2" />
        <Kpi label="Resultaat" value={euroCompact(r.E)} delta={signedPercent((r.E - r.EB) / Math.abs(r.EB))} deltaGood={r.E >= r.EB} sub="vs budget" formula="=Omzet−Inkoop−Personeel−Overig" refCell="Dashboard!C2" />
        <Kpi label="Groei t.o.v. 2025" value={signedPercent(r.R / sum(PY) - 1)} sub="jaaromzet" formula="=C17/Omzet!E17−1" refCell="Dashboard!D2" />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid gap-2.5 lg:grid-cols-5">
        <Panel title="Omzettrend 2026" className="lg:col-span-3" aside={<span className="font-mono text-[10px] text-ink-400">realisatie · forecast · budget</span>}>
          <ComboChart ariaLabel="Omzet per maand met budget" labels={MONTHS} format={euroCompact} height={190} highlightIndex={ACTUAL_MONTHS - 1}
            series={[
              { name: "Realisatie", values: r.rev.map((v, m) => (m < ACTUAL_MONTHS ? v : 0)), color: chart.actual },
              { name: "Forecast", values: r.rev.map((v, m) => (m < ACTUAL_MONTHS ? 0 : v)), color: chart.forecast },
              { name: "Budget", values: BUDGET, type: "line", color: "#55665D", dashed: true },
            ]} />
        </Panel>
        <Panel title="Van omzet naar resultaat" className="lg:col-span-2">
          <Waterfall ariaLabel="Waterval van omzet naar resultaat" format={euroCompact} height={210} steps={[
            { label: "Omzet", value: r.R, total: true }, { label: "Inkoop", value: -r.C }, { label: "Personeel", value: -r.P }, { label: "Overig", value: -r.O }, { label: "Resultaat", value: r.E, total: true },
          ]} />
        </Panel>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
        <Panel title="Budgetafwijking per maand">
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {r.rev.map((v, m) => {
              const d = v / BUDGET[m] - 1;
              return (
                <div key={m} className={cn("rounded-md px-1 py-1.5 text-center", m >= ACTUAL_MONTHS ? "bg-amber-100/70 text-amber-600" : d >= 0 ? "bg-mint text-forest" : "bg-coral-100 text-coral")} title={`${MONTHS[m]}: ${signedPercent(d)}`}>
                  <div className="text-[9.5px] uppercase opacity-70">{MONTHS[m]}</div>
                  <div className="font-mono text-[10.5px] font-semibold">{(d * 100).toFixed(1).replace(".", ",")}</div>
                </div>
              );
            })}
          </div>
        </Panel>
      </motion.div>
    </motion.div>
  );

  const omzet = (() => {
    const b = new SheetBuilder();
    b.row([t("Omzet 2026 — Lindenhof Groothandel B.V.", "title", { span: 4 })]);
    b.row([t("Realisatie t/m september, daarna forecast", "subtitle", { span: 4 })]);
    b.blank();
    b.row([h("Maand"), h("Budget"), h("Omzet"), h("Verschil"), h("2025")]);
    r.rev.forEach((v, m) => { const row = b.next; b.row([t(MONTHS[m] + (m >= ACTUAL_MONTHS ? " (fc)" : ""), m >= ACTUAL_MONTHS ? "warn" : "label"), n(BUDGET[m], "eur", "muted"), n(v), fx(v - BUDGET[m], `C${row}-B${row}`, "eur", v >= BUDGET[m] ? "pos" : "neg"), n(PY[m], "eur", "muted")]); });
    b.row([t("Totaal", "total"), fx(r.B, "SUM(B5:B16)", "eur", "total"), fx(r.R, "SUM(C5:C16)", "eur", "total"), fx(r.R - r.B, "SUM(D5:D16)", "eur", "total"), fx(sum(PY), "SUM(E5:E16)", "eur", "total")]);
    return b.build("Omzet", [100, 110, 110, 104, 110], 4);
  })();
  const kosten = (() => {
    const b = new SheetBuilder();
    b.row([t("Kosten 2026", "title", { span: 3 })]);
    b.row([t(`Inkoop ${percent(COGS)} van de omzet · vaste kosten per maand`, "subtitle", { span: 4 })]);
    b.blank();
    b.row([h("Maand"), h("Inkoop"), h("Personeel"), h("Overig"), h("Totaal")]);
    r.cogs.forEach((c, m) => { const row = b.next; b.row([t(MONTHS[m]), n(c), n(PERS), n(OTHER), fx(c + PERS + OTHER, `SUM(B${row}:D${row})`, "eur", "sub")]); });
    b.row([t("Totaal", "total"), fx(r.C, "SUM(B5:B16)", "eur", "total"), fx(r.P, "SUM(C5:C16)", "eur", "total"), fx(r.O, "SUM(D5:D16)", "eur", "total"), fx(r.C + r.P + r.O, "SUM(E5:E16)", "eur", "total")]);
    return b.build("Kosten", [100, 110, 110, 100, 116], 4);
  })();
  const forecast = (() => {
    const b = new SheetBuilder();
    b.row([t("Forecast per kwartaal", "title", { span: 3 })]);
    b.row([t(`Q4 = omzet 2025 × (1 + ${percent(growth)})`, "subtitle", { span: 4 })]);
    b.blank();
    b.row([h("Kwartaal"), h("Omzet"), h("Resultaat"), h("Budget res."), h("Verschil")]);
    [0, 1, 2, 3].forEach((q) => {
      const row = b.next;
      const rv = sum(r.rev.slice(q * 3, q * 3 + 3)), rs = sum(r.res.slice(q * 3, q * 3 + 3)), rb = sum(r.resB.slice(q * 3, q * 3 + 3));
      b.row([t(`Q${q + 1}${q === 3 ? " (forecast)" : ""}`, q === 3 ? "warn" : "label"), n(rv), n(rs), n(rb, "eur", "muted"), fx(rs - rb, `C${row}-D${row}`, "eur", rs >= rb ? "pos" : "neg")]);
    });
    b.row([t("Jaar", "total"), fx(r.R, "SUM(B5:B8)", "eur", "total"), fx(r.E, "SUM(C5:C8)", "eur", "total"), fx(r.EB, "SUM(D5:D8)", "eur", "total"), fx(r.E - r.EB, "C9-D9", "eur", "total")]);
    return b.build("Forecast", [140, 116, 116, 116, 104], 4);
  })();
  const scenarios = (
    <div className="grid gap-3 sm:grid-cols-3">
      {[{ name: "Voorzichtig", g: 0 }, { name: "Basis", g: 0.08 }, { name: "Ambitieus", g: 0.15 }].map((sc) => {
        const x = compute(sc.g);
        const on = Math.abs(growth - sc.g) < 0.001;
        return (
          <button key={sc.name} onClick={() => setGrowth(sc.g)} className={cn("rounded-xl border bg-white p-4 text-left transition hover:border-emerald", on ? "border-emerald ring-2 ring-emerald/30" : "border-ink/10")}>
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-400">Groei Q4 {signedPercent(sc.g)}</span>
            <span className="mt-1 block font-display text-lg font-bold">{sc.name}</span>
            <dl className="mt-3 space-y-1 text-[12px]">
              <div className="flex justify-between"><dt className="text-ink-500">Omzet</dt><dd className="font-mono">{euroCompact(x.R)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">Resultaat</dt><dd className="font-mono">{euroCompact(x.E)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-500">vs budget</dt><dd className={cn("font-mono", x.E >= x.EB ? "text-excel" : "text-coral")}>{signedPercent((x.E - x.EB) / Math.abs(x.EB))}</dd></div>
            </dl>
          </button>
        );
      })}
    </div>
  );
  const sheets: SheetView[] = [
    { name: "Dashboard", kind: "custom", content: dashboard }, omzet, kosten, forecast, { name: "Scenario's", kind: "custom", content: <div className="p-1">{scenarios}</div> },
  ];
  return (
    <Workbook fileName="Lindenhof_Financieel_Dashboard_2026.xlsx" sheets={sheets} sheetIndex={sheet} onSheetChange={(i) => { setSheet(i); setIntro(false); }} height={470}
      checks={[{ label: "Omzet min kosten = resultaat", ok: r.R - r.C - r.P - r.O === r.E }, { label: "Kwartalen tellen op tot jaar", ok: Math.abs(sum(r.res) - r.E) < 1 }]}
      controls={<>
        <RibbonSlider label="Verwachte omzetgroei Q4" value={growth} min={-0.1} max={0.25} step={0.01} onChange={(v) => { setGrowth(v); setIntro(false); }} format={signedPercent} />
        <p className="max-w-[220px] text-[11px] leading-snug text-ink-400">Schuif en zie omzet, resultaat en forecast direct meebewegen.</p>
      </>} />
  );
}
