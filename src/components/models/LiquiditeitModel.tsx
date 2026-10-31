"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeLiq, defaultLiq, liqChecks, liqSheets, weekLabels, CATS, type LiqState } from "@/models/liquiditeit";
import { euroCompact, percent, sum } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function LiquiditeitModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<LiqState>(defaultLiq);
  const r = useMemo(() => computeLiq(s), [s]);
  const set = (p: Partial<LiqState>) => setS((x) => ({ ...x, ...p }));
  const status = r.min < -s.creditLimit ? "bad" : r.min < 0 ? "warn" : "ok";
  const overview = (
    <div className="grid gap-3">
      <div className={cn("rounded-xl px-4 py-2.5 text-[12.5px] font-medium", status === "ok" ? "bg-mint text-forest" : status === "warn" ? "bg-amber-100 text-amber-600" : "bg-coral-100 text-coral")} role="status">
        {status === "ok" && "Het banksaldo blijft de komende 13 weken positief."}
        {status === "warn" && `Het saldo wordt negatief in ${weekLabels[r.closing.findIndex((c) => c < 0)]}, maar blijft binnen de kredietlimiet.`}
        {status === "bad" && `Let op: in ${weekLabels[r.breach.findIndex(Boolean)]} wordt de kredietlimiet overschreden. Bespreek tijdig maatregelen met de bank.`}
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Laagste saldo" value={euroCompact(r.min)} sub={weekLabels[r.minWeek]} formula="=MIN(B17:N17)" refCell="Kasstroom" note="Laagste eindsaldo over 13 weken" />
        <Kpi label="Ruimte krediet" value={euroCompact(r.headroom)} deltaGood={r.headroom >= 0} delta={percent(Math.max(0, Math.min(1, -Math.min(r.min, 0) / s.creditLimit)))} sub="limiet in gebruik" formula="=MIN(B17:N17)+Aannames!B5" refCell="Kasstroom" />
        <Kpi label="Ontvangsten 13 wk" value={euroCompact(sum(r.flows.rec))} sub="debiteuren" formula="=SUM(B7:N7)" refCell="Kasstroom!O7" />
        <Kpi label="Eindsaldo" value={euroCompact(r.closing[r.closing.length - 1])} sub="eind januari 2027" formula="=N6+N16" refCell="Kasstroom!N17" note="Beginsaldo laatste week + netto kasstroom" />
      </div>
      <Panel title="Banksaldo en kasstromen per week" aside={<span className="text-[11px] text-ink-400">limiet {euroCompact(-s.creditLimit)}</span>}>
        <ComboChart ariaLabel="Banksaldo, ontvangsten en uitgaven per week" labels={weekLabels.map((w) => w.replace("wk ", ""))} format={euroCompact} minZero
          series={[
            { name: "Ontvangsten", values: r.inflow, color: chart.positive },
            { name: "Uitgaven", values: r.outflow, color: chart.negative },
            { name: "Eindsaldo", values: r.closing, type: "line", color: chart.actual },
            { name: "Kredietlimiet", values: r.closing.map(() => -s.creditLimit), type: "line", color: chart.forecast, dashed: true },
          ]} />
      </Panel>
      <Panel title="Grootste uitgaven in de horizon">
        <ul className="grid gap-2 text-[12px] sm:grid-cols-2">
          {CATS.filter((c) => c.sign < 0).map((c) => ({ c, total: sum(r.flows[c.key]) })).sort((a, b) => a.total - b.total).slice(0, 6).map(({ c, total }) => (
            <li key={c.key} className="flex justify-between rounded-lg bg-paper-200/70 px-3 py-2"><span className="text-ink-500">{c.name}</span><span className="font-mono tabular">{euroCompact(total)}</span></li>
          ))}
        </ul>
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Overzicht", kind: "custom", content: overview }, ...liqSheets(s, r)];
  return (
    <Workbook fileName="Kwartelaar_Liquiditeitsprognose_13wk.xlsx" sheets={sheets} checks={liqChecks(r, s)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/liquiditeitsprognose/xlsx"
      onEdit={(k, v) => set({ [k]: k === "delayWeeks" ? Math.round(v) : v } as Partial<LiqState>)}
      controls={<>
        <RibbonSlider label="Debiteuren betalen later" value={s.delayWeeks} min={0} max={6} step={1} onChange={(v) => set({ delayWeeks: v })} format={(v) => `${v} wk`} />
        <RibbonSlider label="Deel dat vertraagt" value={s.delayShare} min={0} max={1} step={0.05} onChange={(v) => set({ delayShare: v })} format={percent} />
        <RibbonSlider label="Kredietlimiet" value={s.creditLimit} min={0} max={500_000} step={25_000} onChange={(v) => set({ creditLimit: v })} format={euroCompact} />
      </>} />
  );
}
