"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSegment, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { ComboChart, Donut } from "@/components/charts/Charts";
import { chart } from "@/components/charts/palette";
import { computeHoreca, defaultHoreca, horecaChecks, horecaSheets, LOCATIONS, WEEKDAYS, HOURS, type HorecaState } from "@/models/horeca";
import { euro, euroCents, euroCompact, percent, signedPercent } from "@/lib/format";

export default function HorecaModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<HorecaState>(defaultHoreca);
  const r = useMemo(() => computeHoreca(s), [s]);
  const set = (p: Partial<HorecaState>) => setS((x) => ({ ...x, ...p }));
  const max = Math.max(...r.agg.heat.flat());
  const dash = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Omzet per week" value={euroCompact(r.agg.revenue)} sub={`${r.agg.covers.toLocaleString("nl-NL")} gasten`} formula="=SUM('Omzet per dag'!E5:E11)" refCell="Omzet!E12" />
        <Kpi label="Gem. besteding" value={euroCents(r.avgSpend)} sub="per gast, excl. btw" formula="=E12/B12" refCell="Omzet!F12" />
        <Kpi label="Brutomarge" value={percent(r.gmPct)} sub={`inkoop ${percent(1 - r.gmPct)}`} formula="=(Omzet−inkoopwaarde)/Omzet" />
        <Kpi label="Personeelskosten" value={percent(r.staffPct)} delta={r.staffPct > 0.36 ? "boven norm" : "binnen norm"} deltaGood={r.staffPct <= 0.36} sub="norm ≤ 36%" formula="=Personeelsuren×€ 31,50/Omzet" />
      </div>
      <div className="grid gap-3 lg:grid-cols-5">
        <Panel title="Omzet per dag" className="lg:col-span-3">
          <ComboChart ariaLabel="Omzet per weekdag, keuken en dranken" labels={WEEKDAYS} format={euroCompact} height={200}
            series={[
              { name: "Keuken", values: WEEKDAYS.map((_, d) => r.per.filter((p) => s.loc === "alle" || p.key === s.loc).reduce((a, p) => a + p.days[d].food, 0)), color: chart.actual },
              { name: "Dranken", values: WEEKDAYS.map((_, d) => r.per.filter((p) => s.loc === "alle" || p.key === s.loc).reduce((a, p) => a + p.days[d].drinks, 0)), color: chart.prior },
            ]} />
        </Panel>
        <Panel title="Omzetmix" className="lg:col-span-2">
          <Donut ariaLabel="Verdeling keuken en dranken" format={euro} center={euroCompact(r.agg.revenue)} parts={[{ name: "Keuken", value: r.agg.food, color: chart.actual }, { name: "Dranken", value: r.agg.drinks, color: chart.prior }]} />
          <dl className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
            <div className="rounded-lg bg-paper-200/70 p-2"><dt className="text-ink-400">Omzet / personeelsuur</dt><dd className="font-mono font-semibold">{euroCents(r.revPerStaffHour)}</dd></div>
            <div className="rounded-lg bg-paper-200/70 p-2"><dt className="text-ink-400">Bijdrage na huur</dt><dd className="font-mono font-semibold">{euroCompact(r.contribution)}</dd></div>
          </dl>
        </Panel>
      </div>
      <Panel title="Omzet per uur (warmtekaart)">
        <div className="overflow-x-auto">
          <div className="grid min-w-[560px] gap-1" style={{ gridTemplateColumns: `40px repeat(${HOURS.length}, 1fr)` }}>
            <span />
            {HOURS.map((h) => <span key={h} className="text-center font-mono text-[10px] text-ink-400">{h}u</span>)}
            {WEEKDAYS.map((d, di) => (
              <div key={d} className="contents">
                <span className="text-[11px] font-medium text-ink-500">{d}</span>
                {HOURS.map((h, hi) => {
                  const v = r.agg.heat[di][hi];
                  return <span key={h} title={`${d} ${h}:00 — ${euro(v)}`} className="h-6 rounded" style={{ background: `rgba(20,125,82,${(0.06 + (v / max) * 0.88).toFixed(2)})` }} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
  const sheets: SheetView[] = [{ name: "Dashboard", kind: "custom", content: dash }, ...horecaSheets(s, r)];
  return (
    <Workbook fileName="Grachtzicht_Omzetanalyse_okt2026.xlsx" sheets={sheets} checks={horecaChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/horeca-omzetanalyse/xlsx"
      controls={<>
        <RibbonSegment label="Vestiging" value={s.loc} onChange={(v) => set({ loc: v as HorecaState["loc"] })} options={[...LOCATIONS.map((l) => ({ value: l.key, label: l.name })), { value: "alle", label: "Alle" }]} />
        <RibbonSlider label="Prijsaanpassing kaart" value={s.priceChange} min={-0.05} max={0.1} step={0.01} onChange={(v) => set({ priceChange: v })} format={signedPercent} />
        <RibbonSlider label="Personeelsuren" value={s.staffChange} min={-0.15} max={0.15} step={0.01} onChange={(v) => set({ staffChange: v })} format={signedPercent} />
      </>} footerNote="Bij een prijsaanpassing gaat het model uit van gelijkblijvende aantallen gasten." />
  );
}
