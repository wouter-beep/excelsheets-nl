"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { audit, requireUser } from "@/lib/server/auth";

const pair = z.array(z.object({ title: z.string().min(1), text: z.string().min(1) }));
/** Blokken worden bewerkt als "Titel :: tekst" per regel; FAQ als "Vraag :: antwoord". */
const parsePairs = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [title, ...rest] = l.split("::"); return { title: title.trim(), text: rest.join("::").trim() }; });

export async function saveService(slug: string, _: unknown, fd: FormData) {
  const user = await requireUser("content.write");
  const g = (k: string) => String(fd.get(k) ?? "").trim();
  try {
    const deliverables = pair.parse(parsePairs(g("deliverables")));
    const benefits = pair.parse(parsePairs(g("benefits")));
    const approach = pair.parse(parsePairs(g("approach")));
    const faq = parsePairs(g("faq")).map((p) => ({ q: p.title, a: p.text }));
    if (faq.some((f) => !f.q || !f.a)) throw new Error("Elke FAQ-regel heeft de vorm: Vraag :: antwoord");
    const example = { title: g("exampleTitle"), text: g("exampleText"), bullets: g("exampleBullets").split("\n").map((x) => x.trim()).filter(Boolean) };
    await db.service.update({ where: { slug }, data: {
      navTitle: g("navTitle"), title: g("title"), h1: g("h1"), lead: g("lead"), problemTitle: g("problemTitle"), problem: g("problem"),
      deliverables, benefits, approach, faq, example, visual: g("visual"), relatedModels: g("relatedModels").split(",").map((x) => x.trim()).filter(Boolean),
      seoTitle: g("seoTitle").slice(0, 80), metaDescription: g("metaDescription").slice(0, 170), published: fd.get("published") === "on", sortOrder: Number(g("sortOrder")) || 0,
    } });
    await audit(user.id, "dienst.wijzig", slug);
    revalidatePath(`/diensten/${slug}`); revalidatePath("/oplossingen");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof z.ZodError ? "Elke regel bij opsommingen heeft de vorm: Titel :: tekst" : (e as Error).message };
  }
}
