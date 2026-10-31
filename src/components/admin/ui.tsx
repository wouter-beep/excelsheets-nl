import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AdminTitle({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div><h1 className="font-display text-3xl font-bold">{title}</h1>{sub && <p className="mt-1 text-ink-500">{sub}</p>}</div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
export const STATUS_STYLE: Record<string, string> = {
  NIEUW: "bg-emerald/15 text-forest", IN_BEHANDELING: "bg-cobalt/10 text-cobalt", INFO_NODIG: "bg-amber/20 text-ink-700",
  OFFERTE: "bg-violet/10 text-violet", GEWONNEN: "bg-forest text-white", AFGEWEZEN: "bg-coral/10 text-coral", AFGEROND: "bg-ink/10 text-ink-700",
};
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12px] font-semibold", className)}>{children}</span>;
}
export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-white">
      <table className="w-full text-left text-[14px]">
        <thead className="border-b border-ink/10 bg-paper-200 font-mono text-[11px] uppercase tracking-wider text-ink-400"><tr>{head.map((h) => <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-ink/[0.06]">{children}</tbody>
      </table>
    </div>
  );
}
export function Empty({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-ink/15 bg-white px-6 py-12 text-center text-ink-500">{children}</div>;
}
export function Pager({ page, pages, href }: { page: number; pages: number; href: (p: number) => string }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Paginering" className="mt-6 flex items-center gap-2 text-[14px]">
      {page > 1 && <Link className="btn-ghost px-4 py-2" href={href(page - 1)}>Vorige</Link>}
      <span className="text-ink-500">Pagina {page} van {pages}</span>
      {page < pages && <Link className="btn-ghost px-4 py-2" href={href(page + 1)}>Volgende</Link>}
    </nav>
  );
}
export function Field({ label, name, defaultValue, type = "text", rows, hint, required }: { label: string; name: string; defaultValue?: string | number | null; type?: string; rows?: number; hint?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}{hint && <span className="ml-1 font-normal text-ink-400">({hint})</span>}</label>
      {rows ? <textarea id={name} name={name} rows={rows} defaultValue={defaultValue ?? ""} required={required} className="input font-[inherit]" />
        : <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} required={required} className="input" />}
    </div>
  );
}
export function Saved({ show, children = "Opgeslagen." }: { show: boolean; children?: ReactNode }) {
  return show ? <p role="status" className="mb-6 rounded-xl bg-mint-50 px-4 py-3 text-[14px] font-medium text-forest">✓ {children}</p> : null;
}
