"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSegment, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeCons, defaultCons, consChecks, consSheets, ENTITIES, type ConsState } from "@/models/consolidatie";
import { euro, euroCompact } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ConsolidatieModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<ConsState>(defaultCons);
  const r = useMemo(() => computeCons(s), [s]);
  const set = (p: Partial<ConsState>) => setS((x) => ({ ...x, ...p }));
  const omz = r.lines.find((l) => l.key === "omz")!;
  const overview = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Omzet geconsolideerd" value={euroCompact(omz.cons)} sub={`opgeteld ${euroCompact(omz.total)}`} formula="=F5+G5" refCell="Consolidatie W&V!H5" note="Som van de entiteiten minus intercompany-omzet" />
        <Kpi label="Geëlimineerde IC-omzet" value={euroCompact(r.icRevenue)} sub="onderlinge leveringen" formula="=SUMIF(Eliminaties!F:F,&quot;omz&quot;,Eliminaties!E:E)" refCell="Eliminaties" />
        <Kpi label="Groepsresultaat" value={euroCompact(r.result("cons"))} sub="vóór belastingen" formula="=SUM(H5:H12)" refCell="Consolidatie W&V!H13" />
        <Kpi label="IC-verschillen" value={euro(r.ic.reduce((a, x) => a + Math.abs(x.diff), 0))} delta={r.ic.some((x) => x.diff) ? "uitzoeken" : "aansluitend"} deltaGood={!r.ic.some((x) => x.diff)} formula="=SUM(ABS(IC-aansluiting!D4:D6))" refCell="IC-aansluiting" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Omzet en resultaat per entiteit" className="lg:col-span-3">
          <ComboChart ariaLabel="Omzet en resultaat per entiteit" labels={[...ENTITIES, "Groep"]} format={euroCompact}
            series={[
              { name: s.showElim ? "Omzet (groep na eliminatie)" : "Omzet (opgeteld)", values: [...ENTITIES.map((e) => omz.values[e]), s.showElim ? omz.cons : omz.total], color: chart.actual },
              { name: "Resultaat", values: [...ENTITIES.map((e) => r.result(e)), r.result("cons")], color: chart.prior },
            ]} />
        </Panel>
        <Panel title="Intercompanyposities" className="lg:col-span-2">
          <ul className="space-y-2 text-[12px]">
            {r.ic.map((x) => (
              <li key={x.pair} className={cn("rounded-lg px-3 py-2", x.diff ? "bg-coral-100" : "bg-mint-50")}>
                <div className="font-medium text-ink">{x.pair}</div>
                <div className="mt-0.5 flex justify-between font-mono text-[11px] text-ink-500"><span>vordering {euro(x.receivable)}</span><span>schuld {euro(x.payable)}</span></div>
                {x.diff !== 0 && <div className="mt-1 text-[11px] font-semibold text-coral">Verschil {euro(x.diff)} — uitzoeken vóór consolidatie</div>}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Groepsoverzicht", kind: "custom", content: overview }, ...consSheets(s, r)];
  return (
    <Workbook fileName="Kroonvast_Consolidatie_2025.xlsx" sheets={sheets} checks={consChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/consolidatie/xlsx" onEdit={(k, v) => set({ [k]: v } as Partial<ConsState>)}
      controls={<>
        <RibbonSegment label="Weergave omzet" value={s.showElim ? "na" : "voor"} onChange={(v) => set({ showElim: v === "na" })} options={[{ value: "voor", label: "Opgeteld" }, { value: "na", label: "Na eliminatie" }]} />
        <RibbonSlider label="IC-schuld volgens Bouw" value={s.bouwPayable} min={58_000} max={70_000} step={500} onChange={(v) => set({ bouwPayable: v })} format={euro} />
      </>} />
  );
}
