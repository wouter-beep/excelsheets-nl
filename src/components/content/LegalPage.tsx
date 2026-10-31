import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function LegalPage({ title, href, updated, notice, children }: { title: string; href: string; updated: string; notice?: ReactNode; children: ReactNode }) {
  return (
    <section className="py-10 md:py-14">
      <div className="container max-w-3xl">
        <Breadcrumbs items={[{ href, label: title }]} />
        <h1 className="h-display text-4xl md:text-5xl">{title}</h1>
        <p className="mt-3 text-[14px] text-ink-400">Laatst bijgewerkt: {updated}</p>
        {notice && <div className="mt-6 rounded-xl border border-amber/40 bg-amber-100 px-5 py-4 text-[14px] text-ink-700">{notice}</div>}
        <div className="prose-es mt-8">{children}</div>
      </div>
    </section>
  );
}
