"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSelect, RibbonSegment, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { HBars } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeInv, defaultInv, invChecks, invSheets, type InvState, type ServiceLevel } from "@/models/voorraad";
import { euro, euroCompact, number, number1 } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function VoorraadModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<InvState>(defaultInv);
  const r = useMemo(() => computeInv(s), [s]);
  const set = (p: Partial<InvState>) => setS((x) => ({ ...x, ...p }));
  const sig = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Voorraadwaarde" value={euroCompact(r.stockValue)} sub={`${r.rows.length} artikelen`} formula="=SUM(Artikelen!M5:M18)" refCell="Artikelen!M19" />
        <Kpi label="Te bestellen" value={String(r.toOrder.length)} delta={r.toOrder.length ? "actie" : "geen"} deltaGood={!r.toOrder.length} sub="onder bestelniveau" formula='=COUNTIF(Artikelen!J5:J18,"Bestellen")' />
        <Kpi label="Bestelwaarde advies" value={euro(r.orderValue)} sub="afgerond op MOQ" formula="=SUMPRODUCT(Artikelen!K5:K18,Artikelen!L5:L18)" />
        <Kpi label="Omloopsnelheid" value={`${number1(r.turnover)}×`} sub="per jaar" formula="=Jaarverbruik/Voorraadwaarde" />
      </div>
      <Panel title="Signalering" aside={<span className="text-[11px] text-ink-400">voorraad versus bestelniveau</span>}>
        <ul className="divide-y divide-ink/[0.06] text-[12px]">
          {[...r.rows].sort((a, b) => a.stock / a.rop - b.stock / b.rop).map((x) => (
            <li key={x.sku} className="grid grid-cols-[1fr_auto] items-center gap-3 py-2 sm:grid-cols-[minmax(0,1fr)_200px_auto]">
              <span className="min-w-0"><span className="font-mono text-[10.5px] text-ink-400">{x.sku}</span> <span className="font-medium text-ink">{x.name}</span></span>
              <span className="relative hidden h-2 rounded-full bg-ink/[0.06] sm:block" aria-hidden>
                <span className={cn("absolute inset-y-0 left-0 rounded-full", x.status === "Bestellen" ? "bg-coral" : x.status === "Let op" ? "bg-amber" : "bg-emerald")} style={{ width: `${Math.min(100, (x.stock / (x.rop * 2)) * 100)}%` }} />
                <span className="absolute -top-1 h-4 w-0.5 bg-ink" style={{ left: "50%" }} />
              </span>
              <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-semibold", x.status === "Bestellen" ? "bg-coral-100 text-coral" : x.status === "Let op" ? "bg-amber-100 text-amber-600" : x.status === "Overvoorraad" ? "bg-paper-200 text-ink-500" : "bg-mint text-forest")}>
                {x.status}{x.orderQty ? ` · ${number(x.orderQty)}` : ""}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] text-ink-400">Balk = voorraad, streep = bestelniveau.</p>
      </Panel>
      <Panel title="Voorraadwaarde per categorie">
        <HBars ariaLabel="Voorraadwaarde per categorie" format={euroCompact} items={r.cats.map((c, i) => ({ label: c, value: r.all.filter((x) => x.cat === c).reduce((a, x) => a + x.value, 0), color: chart.series[i] }))} />
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Signalering", kind: "custom", content: sig }, ...invSheets(s, r)];
  return (
    <Workbook fileName="Ooievaar_Voorraadbeheer.xlsx" sheets={sheets} checks={invChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/voorraadbeheer/xlsx" onEdit={(k, v) => set({ [k]: Math.round(v) } as Partial<InvState>)}
      controls={<>
        <RibbonSelect label="Categorie" value={s.cat} onChange={(v) => set({ cat: v })} options={[{ value: "alle", label: "Alle categorieën" }, ...r.cats.map((c) => ({ value: c, label: c }))]} />
        <RibbonSegment label="Servicegraad" value={s.service} onChange={(v) => set({ service: v as ServiceLevel })} options={(["90", "95", "98", "99"] as ServiceLevel[]).map((v) => ({ value: v, label: `${v}%` }))} />
        <RibbonSlider label="Extra levertijd" value={s.extraLead} min={0} max={14} step={1} onChange={(v) => set({ extraLead: v })} format={(v) => `+${v} dg`} />
      </>} />
  );
}
