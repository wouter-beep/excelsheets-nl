import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Breadcrumbs({ items, tone = "light" }: { items: { href: string; label: string }[]; tone?: "light" | "dark" }) {
  const all = [{ href: "/", label: "Home" }, ...items];
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, item: `${siteConfig.url}${it.href === "/" ? "" : it.href}` })),
  };
  return (
    <nav aria-label="Kruimelpad" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-1 text-[13px] ${tone === "dark" ? "text-mint/60" : "text-ink-400"}`}>
        {all.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            {i === all.length - 1 ? <span aria-current="page" className={tone === "dark" ? "text-mint" : "text-ink-700"}>{it.label}</span> : <Link href={it.href} className="hover:underline">{it.label}</Link>}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}
