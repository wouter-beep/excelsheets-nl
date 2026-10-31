import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/server/auth";
import { AdminTitle } from "@/components/admin/ui";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const metadata = { title: "Dienst bewerken" };
type P = { title: string; text: string };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  await requireUser("content.write");
  const { slug } = await params;
  const s = await db.service.findUnique({ where: { slug } });
  if (!s) notFound();
  const pairs = (x: unknown) => (x as P[]).map((p) => `${p.title} :: ${p.text}`).join("\n");
  const ex = s.example as { title: string; text: string; bullets: string[] };
  const v = {
    navTitle: s.navTitle, title: s.title, h1: s.h1, lead: s.lead, problemTitle: s.problemTitle, problem: s.problem, deliverables: pairs(s.deliverables), benefits: pairs(s.benefits), approach: pairs(s.approach),
    faq: (s.faq as { q: string; a: string }[]).map((f) => `${f.q} :: ${f.a}`).join("\n"), exampleTitle: ex.title, exampleText: ex.text, exampleBullets: ex.bullets.join("\n"),
    visual: s.visual, relatedModels: (s.relatedModels as string[]).join(", "), seoTitle: s.seoTitle, metaDescription: s.metaDescription, published: s.published, sortOrder: s.sortOrder,
  };
  return (
    <>
      <Link href="/admin/diensten" className="inline-flex items-center gap-1 text-[14px] text-ink-500 hover:text-ink"><ArrowLeft className="h-4 w-4" aria-hidden />Alle diensten</Link>
      <div className="mt-4"><AdminTitle title={s.title} actions={<Link href={`/diensten/${s.slug}`} target="_blank" className="btn-ghost"><ExternalLink className="h-4 w-4" aria-hidden />Bekijk</Link>} /></div>
      <ServiceForm slug={s.slug} v={v} />
    </>
  );
}
