import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModelThumb } from "@/components/home/ModelThumb";
import type { DemoModelMeta } from "@/content/models";

const THUMB: Record<string, string> = {
  managementdashboard: "dashboard", "begroting-rolling-forecast": "forecast", liquiditeitsprognose: "cash", jaarrekeningwerkboek: "report",
  personeelsplanning: "roster", "horeca-omzetanalyse": "margin", "productie-efficiency": "dashboard", kostprijsberekening: "costprice",
  "projecten-nacalculatie": "project", voorraadbeheer: "inventory", consolidatie: "consolidation", investeringsmodel: "forecast",
};

export function ModelCard({ m }: { m: DemoModelMeta }) {
  return (
    <Link href={`/voorbeelden/${m.slug}`} className="group card flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      <div className="border-b border-ink/10 bg-paper p-4"><ModelThumb kind={THUMB[m.slug] ?? "dashboard"} /></div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-excel">{m.sector}</p>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug">{m.title}</h3>
        <p className="mt-2 flex-1 text-[14.5px] text-ink-500">{m.summary}</p>
        <p className="mt-4 flex items-center justify-between text-[13px]"><span className="text-ink-400">{m.company} · fictief</span><span className="inline-flex items-center gap-1 font-semibold text-excel">Bekijk<ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden /></span></p>
      </div>
    </Link>
  );
}
