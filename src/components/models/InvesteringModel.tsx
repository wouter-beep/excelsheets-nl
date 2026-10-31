"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeInvest, defaultInvest, investChecks, investSheets, type InvestState } from "@/models/investering";
import { euroCompact, number1, percent, signedPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function InvesteringModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<InvestState>(defaultInvest);
  const r = useMemo(() => computeInvest(s), [s]);
  const set = (p: Partial<InvestState>) => setS((x) => ({ ...x, ...p }));
  const overview = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Netto contante waarde" value={euroCompact(r.NPV)} delta={r.NPV >= 0 ? "positief" : "negatief"} deltaGood={r.NPV >= 0} sub={`bij ${percent(s.rate)}`} formula="=NPV(Aannames!B12,C10:L10)+B10" refCell="Kasstromen!B14" />
        <Kpi label="IRR" value={r.IRR === null ? "n.v.t." : percent(r.IRR)} delta={r.IRR !== null && r.IRR > s.rate ? "boven eis" : "onder eis"} deltaGood={r.IRR !== null && r.IRR > s.rate} formula="=IRR(B10:L10)" refCell="Kasstromen!B15" />
        <Kpi label="Terugverdientijd" value={r.pb === null ? "> looptijd" : `${number1(r.pb)} jaar`} sub="onverdisconteerd" formula="=jaar waarin cumulatief ≥ 0" refCell="Kasstromen!B16" />
        <Kpi label="Verdisconteerd" value={r.dpb === null ? "> looptijd" : `${number1(r.dpb)} jaar`} sub="terugverdientijd" refCell="Kasstromen!B17" formula="=idem, met verdisconteerde kasstromen" />
      </div>
      <Panel title="Kasstroom per jaar en cumulatief">
        <ComboChart ariaLabel="Jaarlijkse en cumulatieve kasstroom" labels={["0", ...r.rows.map((x) => String(x.y))]} format={euroCompact}
          series={[{ name: "Kasstroom", values: [-s.investment, ...r.cfs], color: chart.actual }, { name: "Cumulatief", values: r.cumulative, type: "line", color: chart.forecast }]} />
      </Panel>
      <Panel title="Gevoeligheid: NCW bij volume (rijen) en disconteringsvoet (kolommen)">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] text-center text-[12px] tabular">
            <thead><tr><th />{r.rates.map((x) => <th key={x} className="py-1 font-mono text-[11px] text-ink-400">{percent(x)}</th>)}</tr></thead>
            <tbody>{r.shocks.map((sh, i) => (
              <tr key={sh}><th className="pr-2 text-right font-mono text-[11px] text-ink-400">{signedPercent(sh)}</th>
                {r.sensitivity[i].map((v, j) => <td key={j} className={cn("rounded px-2 py-1.5 font-mono", v < 0 ? "bg-coral-100 text-coral" : "bg-mint-50 text-forest", sh === 0 && Math.abs(r.rates[j] - s.rate) < 1e-9 && "ring-2 ring-forest")}>{euroCompact(v)}</td>)}
              </tr>))}</tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Overzicht", kind: "custom", content: overview }, ...investSheets(s, r)];
  return (
    <Workbook fileName="Heeghe_Investeringsanalyse_DC.xlsx" sheets={sheets} checks={investChecks(r, s)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/investeringsmodel/xlsx" onEdit={(k, v) => set({ [k]: v } as Partial<InvestState>)}
      footerNote="Kasstromen vóór belastingen en financiering. Een echte investeringsbeslissing vraagt ook fiscale en financieringsaspecten."
      controls={<>
        <RibbonSlider label="Disconteringsvoet" value={s.rate} min={0.04} max={0.14} step={0.005} onChange={(v) => set({ rate: v })} format={percent} />
        <RibbonSlider label="Volume jaar 1" value={s.volume} min={30_000} max={70_000} step={1_000} onChange={(v) => set({ volume: v })} format={(v) => `${(v / 1000).toLocaleString("nl-NL")}k pallets`} />
        <RibbonSlider label="Tarief per pallet" value={s.tariff} min={30} max={46} step={0.5} onChange={(v) => set({ tariff: v })} format={(v) => `€ ${v.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`} />
      </>} />
  );
}
