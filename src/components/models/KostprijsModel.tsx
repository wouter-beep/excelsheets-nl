"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, Donut } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeKp, defaultKp, kpChecks, kpSheets, type KpState } from "@/models/kostprijs";
import { euro, euroCents, percent } from "@/lib/format";

export default function KostprijsModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<KpState>(defaultKp);
  const r = useMemo(() => computeKp(s), [s]);
  const set = (p: Partial<KpState>) => setS((x) => ({ ...x, ...p }));
  const onEdit = (key: string, v: number) => {
    if (key.startsWith("qty.")) return setS((x) => ({ ...x, qty: { ...x.qty, [key.slice(4)]: v } }));
    if (key.startsWith("price.")) return setS((x) => ({ ...x, price: { ...x.price, [key.slice(6)]: v } }));
    set({ [key]: key === "batch" ? Math.max(1, Math.round(v)) : v } as Partial<KpState>);
  };
  const opbouw = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Integrale kostprijs" value={euroCents(r.cost)} sub="per tafel" formula="=D10+D11" refCell="Calculatie!D12" note="Directe kosten + opslag indirecte kosten" />
        <Kpi label="Verkoopprijs excl. btw" value={euroCents(r.price)} sub={`marge ${percent(s.margin)}`} formula="=D12/(1-B14)" refCell="Calculatie!D15" note="Kostprijs gedeeld door (1 − marge op verkoopprijs)" />
        <Kpi label="Consumentenprijs" value={euroCents(r.priceIncl)} sub="incl. 21% btw" formula="=D15+D16" refCell="Calculatie!D17" />
        <Kpi label="Marge per serie" value={euro(r.batchMargin)} sub={`${s.batch} stuks`} formula="=D19*B9" refCell="Calculatie!D21" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Opbouw kostprijs">
          <Donut ariaLabel="Opbouw van de kostprijs" format={euroCents} center={euro(r.cost)} parts={[
            { name: "Materiaal", value: r.material, color: chart.actual },
            { name: "Arbeid", value: r.labor, color: chart.prior },
            { name: "Machine + instellen", value: r.machine, color: chart.forecast },
            { name: "Indirecte kosten", value: r.overhead, color: "#7A5AF8" },
          ]} />
        </Panel>
        <Panel title="Kostprijs per stuk bij seriegrootte">
          <ComboChart ariaLabel="Kostprijs per stuk afhankelijk van de seriegrootte" labels={r.curve.map((c) => String(c.b))} format={euro} minZero={false} height={190}
            series={[{ name: "Kostprijs per stuk", values: r.curve.map((c) => c.cost), type: "area", color: chart.actual }]} />
          <p className="text-[11px] text-ink-400">Hoe groter de serie, hoe minder insteltijd per stuk.</p>
        </Panel>
      </div>
    </div>
  );
  const sheets: SheetView[] = [...kpSheets(s, r), { name: "Prijsopbouw", kind: "custom", content: opbouw }];
  return (
    <Workbook fileName="Vlasblom_Kostprijscalculatie_Eikentafel.xlsx" sheets={sheets} checks={kpChecks(r, s)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/kostprijsberekening/xlsx" onEdit={onEdit}
      controls={<>
        <RibbonSlider label="Seriegrootte" value={s.batch} min={1} max={24} step={1} onChange={(v) => set({ batch: v })} format={(v) => `${v} st`} />
        <RibbonSlider label="Marge op verkoopprijs" value={s.margin} min={0.1} max={0.6} step={0.01} onChange={(v) => set({ margin: v })} format={percent} />
        <RibbonSlider label="Arbeidsuren per stuk" value={s.laborH} min={4} max={16} step={0.25} onChange={(v) => set({ laborH: v })} format={(v) => `${v.toLocaleString("nl-NL")} u`} />
      </>} />
  );
}
