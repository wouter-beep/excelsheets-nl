import Link from "next/link";
import { ArticleVisual } from "./ArticleVisual";
import { readingMinutes } from "@/lib/markdown";
import type { ArticleView } from "@/lib/content";

export function ArticleCard({ a, compact }: { a: ArticleView; compact?: boolean }) {
  return (
    <Link href={`/excel-door-de-jaren/${a.subjectYear}/${a.slug}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      {!compact && <ArticleVisual kind={a.visual} year={a.subjectYear} className="h-auto w-full" />}
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-excel">{a.subjectYear} · {readingMinutes(a.body + a.practice)} min</p>
        <h3 className="mt-1.5 font-display text-[17px] font-bold leading-snug group-hover:text-excel">{a.title}</h3>
        {!compact && <p className="mt-2 line-clamp-3 text-[14px] text-ink-500">{a.summary}</p>}
      </div>
    </Link>
  );
}
