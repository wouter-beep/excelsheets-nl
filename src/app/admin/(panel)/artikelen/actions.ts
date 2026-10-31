"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";

const schema = z.object({
  title: z.string().trim().min(5).max(200),
  slug: z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Alleen kleine letters, cijfers en streepjes").max(120),
  number: z.coerce.number().int().min(1).max(100000),
  subjectYear: z.coerce.number().int().min(1985).max(2100),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED"]),
  publishedAt: z.string().optional(),
  summary: z.string().trim().min(20).max(600),
  body: z.string().trim().min(1).max(40000),
  practice: z.string().trim().max(4000),
  sources: z.string().max(4000),
  serviceLinks: z.string().max(1000),
  visual: z.string().trim().max(40),
  seoTitle: z.string().trim().max(80),
  metaDescription: z.string().trim().max(170),
  factNote: z.string().trim().max(1000),
});

export async function saveArticle(id: string | null, _: unknown, fd: FormData) {
  const user = await requireUser("content.write");
  const raw = Object.fromEntries(fd);
  const p = schema.safeParse(raw);
  if (!p.success) return { error: p.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" · ") };
  const d = p.data;
  const sources = d.sources.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [title, url] = l.split("|").map((x) => x.trim()); return { title, url: url && /^https:\/\//.test(url) ? url : undefined }; });
  const publishedAt = d.status === "PUBLISHED" ? (d.publishedAt ? new Date(d.publishedAt) : new Date()) : d.publishedAt ? new Date(d.publishedAt) : null;
  const topics = fd.getAll("topics").map(String);
  const data = {
    title: d.title, slug: d.slug, number: d.number, subjectYear: d.subjectYear, status: d.status, publishedAt, summary: d.summary, body: d.body, practice: d.practice,
    sources, serviceLinks: d.serviceLinks.split(",").map((s) => s.trim()).filter(Boolean), visual: d.visual || "grid",
    seoTitle: d.seoTitle || d.title, metaDescription: d.metaDescription || d.summary.slice(0, 160), factNote: d.factNote || null,
  };
  try {
    const a = id
      ? await db.article.update({ where: { id }, data: { ...data, topics: { set: topics.map((t) => ({ id: t })) } } })
      : await db.article.create({ data: { ...data, topics: { connect: topics.map((t) => ({ id: t })) } } });
    await audit(user.id, id ? "artikel.wijzig" : "artikel.nieuw", a.slug);
    revalidatePath("/excel-door-de-jaren", "layout");
    if (!id) redirect(`/admin/artikelen/${a.id}?opgeslagen=1`);
    return { ok: true };
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") return { error: "Deze URL (slug) of dit nummer is al in gebruik." };
    throw e;
  }
}

export async function deleteArticle(id: string) {
  const user = await requireUser("content.write");
  const a = await db.article.delete({ where: { id } });
  await audit(user.id, "artikel.verwijder", a.slug);
  revalidatePath("/excel-door-de-jaren", "layout");
  redirect("/admin/artikelen");
}
