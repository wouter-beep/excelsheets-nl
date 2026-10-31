"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSelect, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, HBars } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeMeridiaan, defaultMeridiaan, meridiaanChecks, meridiaanSheets, UNITS, LAST_ACTUAL, type MeridiaanState } from "@/models/meridiaan";
import { MONTHS, MONTHS_LONG, euroCompact, percent, signedPercent } from "@/lib/format";

export default function MeridiaanModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<MeridiaanState>(defaultMeridiaan);
  const r = useMemo(() => computeMeridiaan(s), [s]);
  const set = (p: Partial<MeridiaanState>) => setS((x) => ({ ...x, ...p }));
  const fe = r.ebitda(r.forecastYear), be = r.ebitda(r.budgetYear);
  let cumB = 0, cumF = 0;
  const cum = r.monthly.map((m) => { cumB += m.ebitdaB; cumF += m.ebitdaF; return { b: cumB, f: cumF }; });

  const overview = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Forecast omzet 2026" value={euroCompact(r.forecastYear["8000"])} delta={signedPercent(r.forecastYear["8000"] / (r.budgetYear["8000"] || 1) - 1)} deltaGood={r.forecastYear["8000"] >= r.budgetYear["8000"]} sub="vs budget" formula="=Forecast!E5" refCell="Forecast!E5" note="Realisatie YTD + prognose resterende maanden" />
        <Kpi label="Brutoresultaat" value={euroCompact(r.gross(r.forecastYear))} sub={`budget ${euroCompact(r.gross(r.budgetYear))}`} formula="=Forecast!E5-Forecast!E6" refCell="Forecast" note="Omzet minus inkoop en uitbesteed werk" />
        <Kpi label="Forecast EBITDA" value={euroCompact(fe)} delta={signedPercent(be ? (fe - be) / Math.abs(be) : 0)} deltaGood={fe >= be} sub="vs budget" formula="=E5-SUM(E6:E11)" refCell="Forecast!E12" note="Omzet minus alle operationele kosten" />
        <Kpi label="EBITDA-marge forecast" value={percent(r.forecastYear["8000"] ? fe / r.forecastYear["8000"] : 0)} sub={`budget ${percent(r.budgetYear["8000"] ? be / r.budgetYear["8000"] : 0)}`} formula="=IF(E5=0,0,E12/E5)" refCell="Forecast" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Cumulatieve EBITDA: budget versus forecast" className="lg:col-span-3">
          <ComboChart ariaLabel="Cumulatieve EBITDA per maand" labels={MONTHS} format={euroCompact} highlightIndex={s.peil - 1}
            series={[
              { name: "Forecast (realisatie + prognose)", values: cum.map((c) => c.f), type: "area", color: chart.actual },
              { name: "Budget", values: cum.map((c) => c.b), type: "line", color: "#55665D", dashed: true },
            ]} />
        </Panel>
        <Panel title="EBITDA per afdeling (forecast jaar)" className="lg:col-span-2">
          <HBars ariaLabel="EBITDA per afdeling" format={euroCompact} items={r.byUnit.filter((u) => u.key !== "stf").map((u, i) => ({ label: u.name, value: u.ebitdaF, marker: u.ebitdaB, color: chart.series[i] }))} />
          <p className="mt-3 text-[11px] text-ink-400">Streepje = budget. Stafkosten ({euroCompact(-r.byUnit.find((u) => u.key === "stf")!.ebitdaF)}) worden op groepsniveau gedragen.</p>
        </Panel>
      </div>
      <Panel title="Omzet per maand">
        <ComboChart ariaLabel="Omzet per maand: realisatie of prognose tegenover budget" labels={MONTHS} format={euroCompact} height={180}
          series={[
            { name: "Realisatie", values: r.monthly.map((m) => (m.isActual ? m.fc["8000"] : 0)), color: chart.actual },
            { name: "Prognose", values: r.monthly.map((m) => (m.isActual ? 0 : m.fc["8000"])), color: chart.forecast },
            { name: "Budget", values: r.monthly.map((m) => m.b["8000"]), type: "line", color: "#55665D" },
          ]} />
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Overzicht", kind: "custom", content: overview }, ...meridiaanSheets(s, r)];
  return (
    <Workbook fileName="Meridiaan_Begroting_Forecast_2026.xlsx" sheets={sheets} checks={meridiaanChecks(r, s)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/begroting-rolling-forecast/xlsx"
      onEdit={(k, v) => set({ [k]: k === "peil" ? Math.round(v) : v } as Partial<MeridiaanState>)}
      controls={<>
        <RibbonSelect label="Afdeling" value={s.unit} onChange={(v) => set({ unit: v as MeridiaanState["unit"] })} options={[{ value: "alle", label: "Totaal onderneming" }, ...UNITS.map((u) => ({ value: u.key, label: u.name }))]} />
        <RibbonSelect label="Realisatie t/m" value={String(s.peil)} onChange={(v) => set({ peil: Number(v) })} options={Array.from({ length: LAST_ACTUAL }, (_, i) => ({ value: String(i + 1), label: MONTHS_LONG[i] }))} />
        <RibbonSlider label="Omzetgroei prognose" value={s.growth} min={-0.2} max={0.2} step={0.01} onChange={(v) => set({ growth: v })} format={signedPercent} />
        <RibbonSlider label="Loonindexatie" value={s.indexation} min={0} max={0.08} step={0.005} onChange={(v) => set({ indexation: v })} format={percent} />
      </>} />
  );
}
