import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ModelThumb } from "@/components/home/ModelThumb";
import { solutions } from "@/content/solutions";

export function SolutionGrid() {
  return (
    <>
    {solutions.map((s, i) => (
      <Reveal key={s.key} delay={(i % 3) * 0.06}>
        <article className="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
          <div className="border-b border-ink/[0.06] bg-paper p-4 transition group-hover:bg-mint-50"><ModelThumb kind={s.thumb} /></div>
          <div className="flex flex-1 flex-col p-6">
            <span className="cellref">{String.fromCharCode(65 + (i % 3))}{Math.floor(i / 3) + 2}</span>
            <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{s.text}</p>
            <dl className="mt-4 space-y-1.5 text-[13.5px]">
              <div className="flex gap-2"><dt className="w-16 shrink-0 font-semibold text-ink-700">Voor</dt><dd className="text-ink-500">{s.forWho}</dd></div>
              <div className="flex gap-2"><dt className="w-16 shrink-0 font-semibold text-ink-700">Voordeel</dt><dd className="text-ink-500">{s.benefit}</dd></div>
            </dl>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
              <Link href={s.href} className="inline-flex items-center gap-1 text-[14px] font-semibold text-excel hover:underline">{s.detailLabel}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link href={`/verzoekwijzer?onderwerp=${s.topic}`} className="rounded-full bg-forest px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-forest-700">Zoiets laten maken</Link>
            </div>
          </div>
        </article>
      </Reveal>
    ))}
    </>
  );
}
