"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSlider, Kpi, Panel, type SheetView } from "@/components/workbook/Workbook";
import { HBars } from "@/components/charts/Charts";
import { computePlan, defaultPlan, planChecks, planSheets, SHIFTS, CYCLE, DAYS, EMPLOYEES, DEFAULT_ROSTER, type PlanState, type ShiftCode } from "@/models/personeel";
import { euro, euroCompact, number1, percent } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function PersoneelModel({ height = 560, initialSheet = 0 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<PlanState>(defaultPlan);
  const r = useMemo(() => computePlan(s), [s]);
  const cycle = (i: number, d: number) => setS((x) => {
    const roster = x.roster.map((row) => [...row]);
    const cur = CYCLE.indexOf(roster[i][d]);
    roster[i][d] = CYCLE[(cur + 1) % CYCLE.length];
    return { ...x, roster };
  });

  const rooster = (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label="Geplande uren" value={number1(r.totalHours)} sub={`contract ${EMPLOYEES.reduce((a, e) => a + e.contract, 0)} u`} formula="=SUM('Uren & loonkosten'!E5:E14)" refCell="Uren!E15" />
        <Kpi label="Loonkosten week" value={euroCompact(r.totalCost)} sub="incl. toeslagen en lasten" formula="=SUM('Uren & loonkosten'!H5:H14)" refCell="Uren!H15" />
        <Kpi label="Onderbezetting" value={String(r.gaps.length)} delta={r.gaps.length ? "actie" : "geen"} deltaGood={!r.gaps.length} sub="dienst-dagen" />
        <Kpi label="Signaleringen" value={String(r.perEmployee.filter((e) => e.signal).length)} delta={r.perEmployee.some((e) => e.signal) ? "bekijken" : "geen"} deltaGood={!r.perEmployee.some((e) => e.signal)} sub="medewerkers" />
      </div>
      <Panel title="Weekrooster · week 46" aside={<span className="text-[11px] text-ink-400">Klik op een dienst om te wijzigen</span>}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-1 text-[12px]">
            <thead>
              <tr><th className="text-left text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">Medewerker</th>
                {DAYS.map((d) => <th key={d} className="text-center text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">{d}</th>)}
                <th className="text-right text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">Uren</th></tr>
            </thead>
            <tbody>
              {EMPLOYEES.map((e, i) => {
                const pe = r.perEmployee[i];
                return (
                  <tr key={e.name}>
                    <td className="pr-2"><div className="font-medium text-ink">{e.name}</div><div className="text-[10.5px] text-ink-400">{e.role} · {e.contract}u</div></td>
                    {s.roster[i].map((c, d) => (
                      <td key={d} className="p-0">
                        <button onClick={() => cycle(i, d)} aria-label={`${e.name}, ${DAYS[d]}: ${SHIFTS[c].name}. Klik om te wijzigen.`}
                          className={cn("h-9 w-full rounded-md border font-mono text-[12px] font-bold transition hover:ring-2 hover:ring-emerald/50", c ? "border-transparent text-ink" : "border-dashed border-ink/15 text-ink-300")}
                          style={{ background: SHIFTS[c].color }}>
                          {c || "·"}
                        </button>
                      </td>
                    ))}
                    <td className={cn("text-right font-mono tabular", pe.signal ? "text-amber-600" : "text-ink")} title={pe.signal ?? ""}>
                      {number1(pe.hours)}{pe.signal && <span className="ml-1" aria-label={pe.signal}>⚑</span>}
                    </td>
                  </tr>
                );
              })}
              <tr><td className="pt-2 text-[10.5px] font-semibold uppercase tracking-wider text-ink-400">Bezetting</td>
                {DAYS.map((_, d) => {
                  const short = r.gaps.filter((g) => g.day === d);
                  return <td key={d} className={cn("rounded-md px-1 py-1 text-center text-[10.5px] font-semibold", short.length ? "bg-coral-100 text-coral" : "bg-mint text-forest")}>
                    {short.length ? short.map((g) => `${g.code} ${g.diff}`).join(" ") : "OK"}
                  </td>;
                })}
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          {(Object.keys(SHIFTS) as ShiftCode[]).filter((c) => c).map((c) => (
            <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-2 py-0.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: SHIFTS[c].color }} />{c} {SHIFTS[c].name} {SHIFTS[c].time && <span className="text-ink-400">{SHIFTS[c].time}</span>}</span>
          ))}
          <button onClick={() => setS((x) => ({ ...x, roster: DEFAULT_ROSTER }))} className="ml-auto text-excel underline underline-offset-2">Herstel rooster</button>
        </div>
      </Panel>
    </div>
  );

  const maand = (
    <div className="grid gap-3 lg:grid-cols-2">
      <Panel title="Uren per medewerker t.o.v. norm">
        <HBars ariaLabel="Geplande uren per medewerker" format={(v) => `${number1(v)} u`} items={r.perEmployee.map((e) => ({ label: e.name, value: e.hours, marker: e.target, color: e.signal ? "#F2B84B" : "#147D52" }))} />
        <p className="mt-2 text-[11px] text-ink-400">Streepje = contracturen na aftrek van verlof en ziekte.</p>
      </Panel>
      <Panel title="Loonkosten per dag">
        <HBars ariaLabel="Loonkosten per dag" format={euro} items={r.dayCost.map((v, d) => ({ label: DAYS[d], value: v, color: d >= 5 ? "#7A5AF8" : "#2F6FED" }))} />
        <p className="mt-2 text-[11px] text-ink-400">Weekenddiensten zijn duurder door toeslagen. Werkgeverslasten: {percent(s.burden)}.</p>
      </Panel>
    </div>
  );

  const sheets: SheetView[] = [{ name: "Rooster", kind: "custom", content: rooster }, { name: "Analyse", kind: "custom", content: maand }, ...planSheets(s, r)];
  return (
    <Workbook fileName="Lindewaard_Personeelsplanning_wk46.xlsx" sheets={sheets} checks={planChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/personeelsplanning/xlsx"
      controls={<RibbonSlider label="Werkgeverslasten" value={s.burden} min={0.2} max={0.45} step={0.01} onChange={(v) => setS((x) => ({ ...x, burden: v }))} format={percent} />} />
  );
}
