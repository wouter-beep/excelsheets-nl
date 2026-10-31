"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type P = { height?: number; initialSheet?: number };
const Loading = () => (
  <div className="flex h-[620px] items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-lift" aria-busy="true">
    <div className="grid grid-cols-6 gap-1.5" aria-label="Model wordt geladen">
      {Array.from({ length: 18 }).map((_, i) => <span key={i} className="h-4 w-8 animate-pulse rounded bg-mint" style={{ animationDelay: `${i * 60}ms` }} />)}
    </div>
  </div>
);
export const MODEL_COMPONENTS: Record<string, ComponentType<P>> = {
  managementdashboard: dynamic(() => import("./NoordbrugModel"), { loading: Loading, ssr: false }),
  "begroting-rolling-forecast": dynamic(() => import("./MeridiaanModel"), { loading: Loading, ssr: false }),
  liquiditeitsprognose: dynamic(() => import("./LiquiditeitModel"), { loading: Loading, ssr: false }),
  jaarrekeningwerkboek: dynamic(() => import("./JaarrekeningModel"), { loading: Loading, ssr: false }),
  personeelsplanning: dynamic(() => import("./PersoneelModel"), { loading: Loading, ssr: false }),
  "horeca-omzetanalyse": dynamic(() => import("./HorecaModel"), { loading: Loading, ssr: false }),
  "productie-efficiency": dynamic(() => import("./ProductieModel"), { loading: Loading, ssr: false }),
  kostprijsberekening: dynamic(() => import("./KostprijsModel"), { loading: Loading, ssr: false }),
  "projecten-nacalculatie": dynamic(() => import("./ProjectenModel"), { loading: Loading, ssr: false }),
  voorraadbeheer: dynamic(() => import("./VoorraadModel"), { loading: Loading, ssr: false }),
  consolidatie: dynamic(() => import("./ConsolidatieModel"), { loading: Loading, ssr: false }),
  investeringsmodel: dynamic(() => import("./InvesteringModel"), { loading: Loading, ssr: false }),
};

export default function ModelView({ slug, ...p }: { slug: string } & P) {
  const C = MODEL_COMPONENTS[slug];
  if (!C) return null;
  return <C {...p} />;
}
