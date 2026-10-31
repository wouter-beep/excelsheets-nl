"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MousePointerClick } from "lucide-react";
import ModelView from "@/components/models/ModelView";
import { demoModels } from "@/content/models";
import { cn } from "@/lib/cn";

const FEATURED = ["managementdashboard", "liquiditeitsprognose", "personeelsplanning", "kostprijsberekening", "jaarrekeningwerkboek", "investeringsmodel", "productie-efficiency", "voorraadbeheer"];

export function Gallery() {
  const [slug, setSlug] = useState(FEATURED[0]);
  const m = demoModels.find((x) => x.slug === slug)!;
  return (
    <div className="mt-12">
      <div role="tablist" aria-label="Kies een voorbeeldmodel" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
        {FEATURED.map((s) => {
          const x = demoModels.find((d) => d.slug === s)!;
          return (
            <button key={s} role="tab" aria-selected={s === slug} onClick={() => setSlug(s)}
              className={cn("shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition", s === slug ? "border-emerald bg-emerald text-forest-900" : "border-white/15 text-mint/80 hover:border-white/40 hover:text-white")}>
              {x.title}
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 text-ink"><ModelView key={slug} slug={slug} height={500} /></div>
        <aside className="flex flex-col gap-5 text-white">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">{m.company} · {m.sector}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">{m.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-mint/75">{m.summary}</p>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-mint/50"><MousePointerClick className="h-4 w-4" aria-hidden /> Probeer zelf</p>
            <ul className="space-y-1.5 text-[14px] text-mint/80">{m.interactions.map((i) => <li key={i} className="flex gap-2"><span className="text-emerald">→</span>{i}</li>)}</ul>
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <Link href={`/verzoekwijzer?model=${m.slug}`} className="btn-primary">Ik wil ook zo&apos;n model</Link>
            <Link href={`/voorbeelden/${m.slug}`} className="inline-flex items-center gap-1 text-[14px] text-mint hover:text-white">Alles over dit voorbeeld <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
