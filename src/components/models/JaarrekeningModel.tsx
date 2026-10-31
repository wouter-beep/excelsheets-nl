"use client";
import { useMemo, useState } from "react";
import { Workbook, RibbonSlider, RibbonSegment } from "@/components/workbook/Workbook";
import { computeJr, defaultJr, jrChecks, jrSheets, type JrState } from "@/models/jaarrekening";
import { euro } from "@/lib/format";

export default function JaarrekeningModel({ height = 560, initialSheet = 2 }: { height?: number; initialSheet?: number }) {
  const [s, setS] = useState<JrState>(defaultJr);
  const r = useMemo(() => computeJr(s), [s]);
  const set = (p: Partial<JrState>) => setS((x) => ({ ...x, ...p }));
  return (
    <Workbook fileName="HofstedeVarenkamp_Jaarrekeningwerkboek_2025.xlsx" sheets={jrSheets(s, r)} checks={jrChecks(r)} height={height} initialSheet={initialSheet}
      downloadHref="/api/voorbeelden/jaarrekeningwerkboek/xlsx"
      footerNote="Voorbeeld ter illustratie. Definitieve verslaggeving moet voldoen aan de toepasselijke wet- en regelgeving en professionele controle."
      onEdit={(k, v) => set({ [k]: v } as Partial<JrState>)}
      controls={<>
        <RibbonSlider label="Memoriaal: extra afschrijving" value={s.extraDepreciation} min={0} max={50_000} step={2_500} onChange={(v) => set({ extraDepreciation: v })} format={euro} />
        <RibbonSegment label="Simuleer nieuwe rekening" value={s.unmapped ? "ja" : "nee"} onChange={(v) => set({ unmapped: v === "ja" })} options={[{ value: "nee", label: "Nee" }, { value: "ja", label: "Ja, zonder mapping" }]} />
        <div className="text-[12px] text-ink-500">Resultaat na belastingen: <strong className="font-mono text-ink">{euro(r.result)}</strong></div>
      </>} />
  );
}
