import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHero({ eyebrow, title, lead, crumbs, children, cell }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; crumbs: { href: string; label: string }[]; children?: ReactNode; cell?: string }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 md:pb-20 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial" aria-hidden />
      <div className="container relative">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mb-4">{cell && <span className="rounded border border-excel/30 px-1.5 py-0.5 text-[10px]">{cell}</span>}{eyebrow}</p>}
        <h1 className="h-display max-w-4xl text-4xl md:text-6xl">{title}</h1>
        {lead && <p className="lead mt-6 max-w-3xl">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
