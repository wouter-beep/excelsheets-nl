"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSelect, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, Waterfall, HBars, Sparkline } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeNoordbrug, defaultNoordbrug, noordbrugChecks, noordbrugSheets, DEPTS, LAST_ACTUAL, type NoordbrugState } from "@/models/noordbrug";
import { MONTHS, MONTHS_LONG, euroCompact, percent, signedPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function NoordbrugModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<NoordbrugState>(defaultNoordbrug);
  const r = useMemo(() => computeNoordbrug(s), [s]);
  const checks = useMemo(() => noordbrugChecks(r), [r]);
  const { A, B, PY } = r.ytd;
  const set = (p: Partial<NoordbrugState>) => setS((x) => ({ ...x, ...p }));

  const dashboard = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Omzet t/m peilmaand" value={euroCompact(A.rev)} delta={signedPercent(A.rev / B.rev - 1)} deltaGood={A.rev >= B.rev} sub="vs budget"
          formula={`=SUM(Omzet!C5:C${4 + s.peil})`} refCell={`Omzet!C${5 + s.peil}`} note="Som van de gerealiseerde maandomzet t/m de peilmaand"
          spark={<Sparkline values={r.months.slice(0, s.peil).map((x) => x.a!.rev)} />} />
        <Kpi label="Brutomarge" value={percent(A.gmPct)} delta={`${A.gmPct - B.gmPct >= 0 ? "+" : ""}${((A.gmPct - B.gmPct) * 100).toFixed(1).replace(".", ",")} pp`} deltaGood={A.gmPct >= B.gmPct} sub="vs budget"
          formula="=IF(B4=0,0,B6/B4)" refCell="Resultaat!B7" note="Brutomarge gedeeld door netto-omzet" />
        <Kpi label="EBITDA" value={euroCompact(A.ebitda)} delta={signedPercent(B.ebitda ? A.ebitda / B.ebitda - 1 : 0)} deltaGood={A.ebitda >= B.ebitda} sub={`marge ${percent(A.ebitdaPct)}`}
          formula="=B6+B8+B9+B10" refCell="Resultaat!B11" note="Brutomarge minus personeels-, overige en stafkosten" />
        <Kpi label="Forecast omzet 2026" value={euroCompact(r.fy.rev)} delta={signedPercent(r.fy.rev / r.fy.budgetRev - 1)} deltaGood={r.fy.rev >= r.fy.budgetRev} sub="vs jaarbudget"
          formula="=SUM(realisatie t/m peilmaand)+SUM(prognose rest van het jaar)" refCell="KPI's!B9" note="Prognose = budget × (1 + gemiddelde afwijking t/m peilmaand + scenario)" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Omzet per maand" className="lg:col-span-3" aside={<span className="text-[11px] text-ink-400">realisatie · prognose · budget · vorig jaar</span>}>
          <ComboChart ariaLabel="Omzet per maand: realisatie, prognose, budget en vorig jaar" labels={MONTHS} format={euroCompact} highlightIndex={s.peil - 1}
            series={[
              { name: "Realisatie", values: r.months.map((x) => (x.a ? x.a.rev : 0)), color: chart.actual },
              { name: "Prognose", values: r.months.map((x) => (x.a ? 0 : x.f.rev)), color: chart.forecast },
              { name: "Budget", values: r.months.map((x) => x.b.rev), type: "line", color: "#55665D" },
              { name: "Vorig jaar", values: r.months.map((x) => x.py.rev), type: "line", color: chart.prior, dashed: true },
            ]} />
        </Panel>
        <Panel title="EBITDA: van budget naar realisatie" className="lg:col-span-2">
          <Waterfall zoom ariaLabel="Waterval van budget-EBITDA naar gerealiseerde EBITDA" steps={r.waterfall} format={euroCompact} />
        </Panel>
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Afdelingen t/m peilmaand" className="lg:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-[12px]">
              <thead><tr className="text-left text-[10.5px] uppercase tracking-wider text-ink-400"><th className="py-1 font-semibold">Afdeling</th><th className="text-right font-semibold">Omzet</th><th className="text-right font-semibold">vs budget</th><th className="text-right font-semibold">Brutomarge</th><th className="text-right font-semibold">Bijdrage</th></tr></thead>
              <tbody>
                {r.deptTable.map((d) => (
                  <tr key={d.key} className={cn("border-t border-ink/[0.06] tabular", s.dept === d.key && "bg-mint-50")}>
                    <td className="py-1.5"><button className="font-medium text-ink hover:text-excel" onClick={() => set({ dept: s.dept === d.key ? "alle" : d.key })}>{d.name}</button></td>
                    <td className="text-right font-mono">{euroCompact(d.rev)}</td>
                    <td className={cn("text-right font-mono", d.rev >= d.revB ? "text-excel" : "text-coral")}>{signedPercent(d.rev / d.revB - 1)}</td>
                    <td className="text-right font-mono">{percent(d.gmPct)}</td>
                    <td className="text-right font-mono">{euroCompact(d.contrib)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-ink-400">Klik op een afdeling om het dashboard te filteren.</p>
        </Panel>
        <Panel title="Afwijking omzet per maand" className="lg:col-span-2" aside={<span className="text-[11px] text-ink-400">drempel {percent(s.threshold)}</span>}>
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9">
            {r.months.slice(0, s.peil).map((x) => {
              const d = x.a!.rev / x.b.rev - 1;
              const flag = Math.abs(d) >= s.threshold;
              return (
                <div key={x.m} title={`${MONTHS_LONG[x.m]}: ${signedPercent(d)}`}
                  className={cn("rounded-md px-1 py-2 text-center", flag ? (d > 0 ? "bg-emerald/20 text-forest" : "bg-coral-100 text-coral") : "bg-paper-200 text-ink-500")}>
                  <div className="text-[10px] uppercase">{MONTHS[x.m]}</div>
                  <div className="font-mono text-[11px] font-semibold">{(d * 100).toFixed(1).replace(".", ",")}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <HBars ariaLabel="Kostenverdeling t/m peilmaand" format={euroCompact} items={[
              { label: "Kostprijs omzet", value: A.cogs, marker: B.cogs, color: chart.actual },
              { label: "Personeel", value: A.pers, marker: B.pers, color: chart.prior },
              { label: "Overig + staf", value: A.other + A.staff, marker: B.other + B.staff, color: chart.forecast },
            ]} />
            <p className="mt-2 text-[11px] text-ink-400">Streepje = budget. Vorig jaar EBITDA: {euroCompact(PY.ebitda)}.</p>
          </div>
        </Panel>
      </div>
    </div>
  );

  const sheets: SheetView[] = [{ name: "Dashboard", kind: "custom", content: dashboard }, ...noordbrugSheets(s, r)];
  return (
    <Workbook
      fileName="Noordbrug_Managementdashboard_2026.xlsx"
      sheets={sheets}
      checks={checks}
      height={height}
      initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/managementdashboard/xlsx"
      onEdit={(key, v) => set({ [key]: key === "peil" ? Math.round(v) : v } as Partial<NoordbrugState>)}
      controls={
        <>
          <RibbonSelect label="Peilmaand" value={String(s.peil)} onChange={(v) => set({ peil: Number(v) })}
            options={Array.from({ length: LAST_ACTUAL }, (_, i) => ({ value: String(i + 1), label: `t/m ${MONTHS_LONG[i]}` }))} />
          <RibbonSelect label="Afdeling" value={s.dept} onChange={(v) => set({ dept: v as NoordbrugState["dept"] })}
            options={[{ value: "alle", label: "Alle afdelingen" }, ...DEPTS.map((d) => ({ value: d.key, label: d.name }))]} />
          <RibbonSlider label="Scenario rest van het jaar" value={s.scenario} min={-0.15} max={0.15} step={0.01} onChange={(v) => set({ scenario: v })} format={signedPercent} />
        </>
      }
    />
  );
}
