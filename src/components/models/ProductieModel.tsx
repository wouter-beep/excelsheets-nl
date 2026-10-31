"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSelect, RibbonSegment, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, HBars, Sparkline } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeProd, defaultProd, prodChecks, prodSheets, PROCESSES, type ProdState } from "@/models/productie";
import { number, number1, percent, signedPercent } from "@/lib/format";

export default function ProductieModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<ProdState>(defaultProd);
  const r = useMemo(() => computeProd(s), [s]);
  const set = (p: Partial<ProdState>) => setS((x) => ({ ...x, ...p }));
  const dash = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Productievolume" value={number(r.tot.produced)} sub="stuks" formula="=SUM(Productie!B4:B15)" refCell="Productie" spark={<Sparkline values={r.series.map((w) => w.produced)} width={90} />} />
        <Kpi label="Productiviteit" value={number1(r.productivity)} sub="goede stuks / uur" formula="=Goed/Arbeidsuren" refCell="Productie" />
        <Kpi label="Uitval" value={percent(r.scrapPct)} delta={r.scrapPct > 0.025 ? "boven norm" : "≤ 2,5%"} deltaGood={r.scrapPct <= 0.025} formula="=Afgekeurd/Geproduceerd" refCell="Productie" />
        <Kpi label="Materiaal vs norm" value={signedPercent(r.materialVar)} deltaGood={r.materialVar < 0.03} delta={r.materialVar < 0.03 ? "OK" : "hoog"} formula="=Werkelijk/Norm−1" refCell="Productie" />
        <Kpi label="Leverbetrouwbaarheid" value={percent(r.onTime)} delta={r.onTime >= 0.95 ? "doel gehaald" : "doel 95%"} deltaGood={r.onTime >= 0.95} formula="=Op tijd/Orders" refCell="Machines & levering" />
        <Kpi label="Machinebezetting" value={r.tot.machineCap ? percent(r.occupancy) : "n.v.t."} sub="gebruikte / beschikbare uren" formula="=Gebruikt/Capaciteit" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Volume en uitval per week" className="lg:col-span-3">
          <ComboChart ariaLabel="Geproduceerd volume en afkeur per week" labels={r.labels.map((l) => l.replace("wk ", ""))} format={number}
            series={[{ name: "Goed", values: r.series.map((w) => w.good), color: chart.actual }, { name: "Afgekeurd", values: r.series.map((w) => w.rejected), color: chart.negative }]} />
        </Panel>
        <Panel title="Per proces" className="lg:col-span-2">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Machinebezetting</p>
          <HBars ariaLabel="Machinebezetting per proces" format={percent} max={1} items={r.byProc.filter((p) => p.occupancy !== null).map((p) => ({ label: p.name, value: p.occupancy!, marker: 0.85, color: p.occupancy! > 0.9 ? chart.forecast : chart.actual }))} />
          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Uitval</p>
          <HBars ariaLabel="Uitval per proces" format={percent} max={0.04} items={r.byProc.map((p) => ({ label: p.name, value: p.scrapPct, marker: 0.025, color: p.scrapPct > 0.025 ? chart.negative : chart.actualLight }))} />
        </Panel>
      </div>
      <Panel title="Leverbetrouwbaarheid per week">
        <ComboChart ariaLabel="Leverbetrouwbaarheid per week" labels={r.labels.map((l) => l.replace("wk ", ""))} height={150} minZero={false} format={(v) => `${number1(v)}%`}
          series={[{ name: "Op tijd %", values: r.onTimeSeries, type: "area", color: chart.prior }, { name: "Doel 95%", values: r.onTimeSeries.map(() => 95), type: "line", dashed: true, color: chart.neutral }]} />
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Dashboard", kind: "custom", content: dash }, ...prodSheets(s, r)];
  return (
    <Workbook fileName="Molenbeek_Productiedashboard_wk33-44.xlsx" sheets={sheets} checks={prodChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/productie-efficiency/xlsx"
      controls={<>
        <RibbonSelect label="Proces" value={s.proc} onChange={(v) => set({ proc: v as ProdState["proc"] })} options={[{ value: "alle", label: "Alle processen" }, ...PROCESSES.map((p) => ({ value: p.key, label: p.name }))]} />
        <RibbonSegment label="Periode" value={String(s.weeks) as "4" | "8" | "12"} onChange={(v) => set({ weeks: Number(v) as 4 | 8 | 12 })} options={[{ value: "4", label: "4 wk" }, { value: "8", label: "8 wk" }, { value: "12", label: "12 wk" }]} />
      </>} />
  );
}
