/**
 * Minimale, veilige Markdown-weergave voor artikelen (geen HTML-invoer mogelijk).
 * Ondersteunt: ## en ### koppen, alinea's, - opsommingen, 1. lijsten, > citaat, | tabellen |, **vet**, `code`, [tekst](url).
 */
import Link from "next/link";
import type { ReactNode } from "react";

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const k = `${key}-${i++}`;
    if (t.startsWith("**")) out.push(<strong key={k}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("`")) out.push(<code key={k}>{t.slice(1, -1)}</code>);
    else if (t.startsWith("[")) {
      const [, label, href] = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(t)!;
      if (href.startsWith("/")) out.push(<Link key={k} href={href}>{label}</Link>);
      else if (/^https:\/\//.test(href)) out.push(<a key={k} href={href} rel="noopener nofollow" target="_blank">{label}</a>);
      else out.push(label);
    } else out.push(<em key={k}>{t.slice(1, -1)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function slugify(s: string) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

export function headings(md: string) { return md.split("\n").filter((l) => l.startsWith("## ")).map((l) => ({ id: slugify(l.slice(3)), text: l.slice(3) })); }

export function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r/g, "").split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, i) => {
        const t = b.trim();
        if (!t) return null;
        if (t.startsWith("### ")) return <h3 key={i}>{inline(t.slice(4), i)}</h3>;
        if (t.startsWith("## ")) return <h2 key={i} id={slugify(t.slice(3))} className="scroll-mt-28">{inline(t.slice(3), i)}</h2>;
        if (t.startsWith("> ")) return <blockquote key={i}>{inline(t.replace(/^> ?/gm, ""), i)}</blockquote>;
        const lines = t.split("\n");
        if (lines.length >= 3 && lines.every((l) => /^\|.*\|$/.test(l)) && /^\|[\s:|-]+\|$/.test(lines[1])) {
          const cells = (l: string) => l.slice(1, -1).split("|").map((c) => c.trim());
          const [head, , ...rows] = lines;
          return (
            <div key={i} className="not-prose my-6 overflow-x-auto rounded-xl border border-ink/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-mint/40"><tr>{cells(head).map((c, j) => <th key={j} scope="col" className="px-4 py-2.5 font-semibold text-forest">{inline(c, i * 100 + j)}</th>)}</tr></thead>
                <tbody>{rows.map((r, ri) => <tr key={ri} className="border-t border-ink/10">{cells(r).map((c, j) => <td key={j} className="px-4 py-2.5 align-top text-ink/80">{inline(c, i * 1000 + ri * 10 + j)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
        }
        if (lines.every((l) => /^- /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2), i * 100 + j)}</li>)}</ul>;
        if (lines.every((l) => /^\d+\. /.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ""), i * 100 + j)}</li>)}</ol>;
        return <p key={i}>{inline(lines.join(" "), i)}</p>;
      })}
    </>
  );
}

export const readingMinutes = (s: string) => Math.max(1, Math.round(s.split(/\s+/).length / 220));
