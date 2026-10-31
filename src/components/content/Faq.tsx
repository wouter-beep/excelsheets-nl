import { Plus } from "lucide-react";

export function Faq({ items, schema = true }: { items: { q: string; a: string }[]; schema?: boolean }) {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group px-5 md:px-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 font-display text-[17px] font-bold leading-snug marker:hidden [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="mt-0.5 h-5 w-5 shrink-0 text-excel transition group-open:rotate-45" aria-hidden />
          </summary>
          <div className="pb-5 text-[15.5px] leading-relaxed text-ink-500 whitespace-pre-line">{f.a}</div>
        </details>
      ))}
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
    </div>
  );
}
