"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSelect, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { Waterfall, HBars } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeProj, defaultProj, projChecks, projSheets, PROJECTS, HOURLY_COST, type ProjState } from "@/models/projecten";
import { euroCompact, number, percent, signedPercent } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ProjectenModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<ProjState>(defaultProj);
  const r = useMemo(() => computeProj(s), [s]);
  const p = r.rows[s.sel];
  const setArr = (k: "extraH" | "buyChange", v: number) => setS((x) => ({ ...x, [k]: x[k].map((o, i) => (i === x.sel ? v : o)) }));
  const detail = (
    <div className="grid gap-3">
      {p.loss && <div role="status" className="rounded-xl bg-coral-100 px-4 py-2.5 text-[12.5px] font-medium text-coral">Verwacht verlies op {p.code}: overweeg direct een verliesvoorziening en bespreek meerwerk of besparingen.</div>}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Verwacht resultaat" value={euroCompact(p.result)} delta={percent(p.margin)} deltaGood={p.margin >= 0.08} sub="marge" formula="=Opbrengst−(Kosten t/m nu+Nog te maken)" refCell={`Projectoverzicht!G${5 + s.sel}`} />
        <Kpi label="Voortgang" value={percent(p.progress)} sub="kosten t/m nu / verwachte kosten" formula="=D/F" refCell={`Projectoverzicht!I${5 + s.sel}`} />
        <Kpi label="Onderhanden werk" value={euroCompact(p.wip)} sub={p.wip >= 0 ? "nog te factureren" : "vooruitgefactureerd"} formula="=Voortgang×Opbrengst−Gefactureerd" refCell={`Projectoverzicht!K${5 + s.sel}`} />
        <Kpi label="Uren t.o.v. budget" value={`${p.hoursVar > 0 ? "+" : ""}${number(p.hoursVar)} u`} delta={signedPercent(p.hoursVar / p.budgetH)} deltaGood={p.hoursVar <= 0} formula="=Gemaakt+Nog te maken−Budget" refCell="Uren & inkoop" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title={`${p.code} · ${p.name}`} className="lg:col-span-3">
          <Waterfall ariaLabel="Van opbrengst naar verwacht projectresultaat" format={euroCompact} steps={[
            { label: "Opbrengst", value: p.revenue, total: true },
            { label: "Uren t/m nu", value: -p.hours * HOURLY_COST },
            { label: "Inkoop t/m nu", value: -p.buy },
            { label: "Nog te maken", value: -p.etc },
            { label: "Resultaat", value: p.result, total: true },
          ]} />
        </Panel>
        <Panel title="Resultaat per project" className="lg:col-span-2">
          <HBars ariaLabel="Verwacht resultaat per project" format={euroCompact} items={r.rows.map((x) => ({ label: x.code, value: Math.max(x.result, 0), color: x.loss ? chart.negative : x.margin < 0.08 ? chart.forecast : chart.actual }))} />
          <ul className="mt-3 space-y-1 text-[11.5px]">
            {r.rows.map((x, i) => (
              <li key={x.code}><button onClick={() => setS((y) => ({ ...y, sel: i }))} className={cn("w-full rounded px-2 py-1 text-left hover:bg-mint-50", i === s.sel && "bg-mint-100 font-semibold")}>
                {x.code} · {x.name} <span className={cn("float-right font-mono", x.loss ? "text-coral" : "text-ink-500")}>{euroCompact(x.result)}</span></button></li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Project", kind: "custom", content: detail }, ...projSheets(s, r)];
  return (
    <Workbook fileName="Ravenstein_Projecten_Nacalculatie_okt2026.xlsx" sheets={sheets} checks={projChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/projecten-nacalculatie/xlsx"
      controls={<>
        <RibbonSelect label="Project" value={String(s.sel)} onChange={(v) => setS((x) => ({ ...x, sel: Number(v) }))} options={PROJECTS.map((x, i) => ({ value: String(i), label: `${x.code} ${x.name}` }))} />
        <RibbonSlider label="Extra uren nodig" value={s.extraH[s.sel]} min={0} max={1500} step={20} onChange={(v) => setArr("extraH", v)} format={(v) => `+${number(v)} u`} />
        <RibbonSlider label="Prijsstijging resterende inkoop" value={s.buyChange[s.sel]} min={-0.1} max={0.3} step={0.01} onChange={(v) => setArr("buyChange", v)} format={signedPercent} />
      </>} />
  );
}
