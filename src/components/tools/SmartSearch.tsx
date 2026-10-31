"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export type SearchItem = { type: "Dienst" | "Voorbeeld" | "Vraag" | "Artikel" | "Pagina" | "Oplossing"; title: string; text: string; href: string; extra?: string };

const SYN: Record<string, string[]> = {
  macro: ["vba", "office scripts", "automatisering"], vba: ["macro"], budget: ["begroting"], begroting: ["budget", "forecast"], forecast: ["prognose", "begroting"],
  prognose: ["forecast", "liquiditeit"], cash: ["liquiditeit"], kasstroom: ["liquiditeit", "cash"], rooster: ["planning", "personeel"], planning: ["rooster"],
  vlookup: ["xlookup", "verticaal zoeken"], vert: ["xlookup", "vlookup"], kosten: ["kostprijs"], ai: ["copilot"], copilot: ["ai"], koppeling: ["exact", "afas", "power query"],
  exact: ["koppeling", "power query"], dashboard: ["rapportage"], rapportage: ["dashboard"], prijs: ["kosten", "wat kost"],
};
const LABEL = { Dienst: "Diensten", Oplossing: "Oplossingen", Voorbeeld: "Voorbeelden", Vraag: "Veelgestelde vragen", Artikel: "Excel door de jaren", Pagina: "Pagina's" } as const;
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function score(item: SearchItem, terms: string[][]) {
  const t = norm(item.title), b = norm(`${item.text} ${item.extra ?? ""}`);
  let s = 0;
  for (const variants of terms) {
    let best = 0;
    for (const v of variants) { if (t.includes(v)) best = Math.max(best, 10); else if (b.includes(v)) best = Math.max(best, 3); }
    if (best === 0) return 0; // elke zoekterm moet ergens voorkomen
    s += best;
  }
  return s + (item.type === "Dienst" ? 2 : item.type === "Voorbeeld" ? 1.5 : 0);
}

export function SmartSearch({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(params.get("q") ?? "");
  const results = useMemo(() => {
    const words = norm(q).split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    const terms = words.map((w) => [w, ...(SYN[w] ?? [])]);
    return index.map((i) => ({ i, s: score(i, terms) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 40).map((x) => x.i);
  }, [q, index]);
  const groups = ["Dienst", "Oplossing", "Voorbeeld", "Vraag", "Artikel", "Pagina"] as const;
  return (
    <div>
      <form role="search" onSubmit={(e) => { e.preventDefault(); router.replace(`/zoeken?q=${encodeURIComponent(q)}`); }} className="relative">
        <label htmlFor="zoek" className="sr-only">Zoek op de website</label>
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden />
        <input id="zoek" type="search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Bijvoorbeeld: begroting, Exact Online, macro's of liquiditeit" className="input rounded-full py-4 pl-14 text-lg" />
      </form>
      <div className="mt-3 flex flex-wrap gap-2 text-[13px]">{["dashboard", "begroting", "Power Query", "VBA", "Exact Online", "Copilot", "wat kost"].map((s) => <button key={s} type="button" onClick={() => setQ(s)} className="chip hover:border-emerald">{s}</button>)}</div>
      <div className="mt-10" aria-live="polite">
        {q.trim().length > 1 && results.length === 0 && <p className="text-ink-500">Geen resultaten voor &ldquo;{q}&rdquo;. Probeer een ander woord, of <Link href="/verzoekwijzer" className="text-excel underline">beschrijf je vraag in de Verzoekwijzer</Link>.</p>}
        {results.length > 0 && <p className="mb-6 text-[14px] text-ink-400">{results.length} resultaten</p>}
        <div className="space-y-10">
          {groups.map((g) => {
            const list = results.filter((r) => r.type === g);
            if (!list.length) return null;
            return (
              <section key={g}>
                <h2 className="font-mono text-[12px] uppercase tracking-wider text-excel">{LABEL[g]}</h2>
                <ul className="mt-3 divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
                  {list.map((r) => <li key={r.href + r.title}><Link href={r.href} className="block px-5 py-4 hover:bg-mint-50"><p className="font-display font-bold">{r.title}</p><p className="mt-0.5 line-clamp-2 text-[14px] text-ink-500">{r.text}</p></Link></li>)}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
