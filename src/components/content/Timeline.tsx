"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { ArticleVisual } from "./ArticleVisual";
import type { TimelineYear } from "@/content/timeline";
import { cn } from "@/lib/cn";

export function Timeline({ years, counts }: { years: TimelineYear[]; counts: Record<number, number> }) {
  const track = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const el = track.current; if (!el) return;
    const onScroll = () => {
      const left = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft);
      const items = Array.from(el.querySelectorAll(":scope > li"));
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) { setActive(items.length - 1); return; }
      let best = 0, dist = Infinity;
      items.forEach((li, i) => { const d = Math.abs(li.getBoundingClientRect().left - left); if (d < dist) { dist = d; best = i; } });
      setActive(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const go = (i: number) => { const li = track.current?.querySelectorAll(":scope > li")[Math.max(0, Math.min(years.length - 1, i))] as HTMLElement | undefined; li?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" }); };
  return (
    <div>
      <div className="container">
        <div className="relative flex items-center gap-1" role="tablist" aria-label="Kies een jaar">
          <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" aria-hidden />
          {years.map((y, i) => (
            <button key={y.year} role="tab" aria-selected={i === active} onClick={() => go(i)} className="relative z-10 flex-1">
              <span className={cn("mx-auto block w-fit rounded-full px-2.5 py-1 font-mono text-[12px] transition md:text-[14px]", i === active ? "bg-emerald font-bold text-forest-900" : "bg-forest text-mint/70 hover:text-white")}>{y.year}</span>
            </button>
          ))}
        </div>
      </div>
      <ol ref={track} className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] px-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))] pb-6" tabIndex={0} aria-label="Tijdlijn 2017–2026, scroll of swipe horizontaal"
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(active + 1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(active - 1); } }}>
        {years.map((y, i) => (
          <li key={y.year} data-i={i} className="w-[85vw] max-w-[440px] shrink-0 snap-start">
            <article className={cn("h-full overflow-hidden rounded-3xl border bg-white text-ink transition duration-500", i === active ? "border-emerald shadow-lift" : "border-white/10 opacity-70")}>
              <ArticleVisual kind={y.visual} year={y.year} className="h-auto w-full" />
              <div className="p-6">
                <p className="font-mono text-4xl font-bold text-emerald">{y.year}</p>
                <h2 className="mt-1 font-display text-xl font-bold">{y.theme}</h2>
                <div className="mt-4 rounded-xl bg-mint-50 p-4"><p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-excel"><Sparkles className="h-3.5 w-3.5" aria-hidden />Opvallende innovatie</p><p className="mt-1 font-semibold">{y.innovation}</p><p className="mt-1 text-[14px] text-ink-500">{y.innovationText}</p></div>
                <ul className="mt-4 space-y-1.5 text-[14px] text-ink-700">{y.highlights.map((h) => <li key={h} className="flex gap-2"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-emerald" />{h}</li>)}</ul>
                {y.verify && <p className="mt-3 text-[12px] text-ink-400">Recente ontwikkelingen: beschikbaarheid verschilt per abonnement en platform en kan nog veranderen.</p>}
                <Link href={`/excel-door-de-jaren/${y.year}`} className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-excel">{counts[y.year] ?? 0} artikelen over {y.year}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
              </div>
            </article>
          </li>
        ))}
      </ol>
      <div className="container flex justify-center gap-3">
        <button type="button" onClick={() => go(active - 1)} disabled={active === 0} className="btn-ghost-light px-4 py-2" aria-label="Vorig jaar"><ArrowLeft className="h-4 w-4" aria-hidden /></button>
        <button type="button" onClick={() => go(active + 1)} disabled={active === years.length - 1} className="btn-ghost-light px-4 py-2" aria-label="Volgend jaar"><ArrowRight className="h-4 w-4" aria-hidden /></button>
      </div>
    </div>
  );
}
