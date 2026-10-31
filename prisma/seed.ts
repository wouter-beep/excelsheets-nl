/**
 * Vult de database met de broncontent. Veilig om vaker te draaien:
 * - diensten, voorbeelden, thema's en artikelen worden bijgewerkt op basis van hun slug/nummer
 *   (artikelen die in het beheer zijn aangepast, worden NIET overschreven tenzij SEED_OVERWRITE_ARTICLES=true);
 * - FAQ en cases worden alleen gevuld als ze nog leeg zijn;
 * - een eerste eigenaar-account wordt aangemaakt uit ADMIN_EMAIL en ADMIN_PASSWORD (min. 12 tekens).
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { services } from "../src/content/services";
import { demoModels } from "../src/content/models";
import { faqItems } from "../src/content/faq";
import { demoCases } from "../src/content/cases";
import { allArticles, TOPICS } from "../src/content/articles";

const db = new PrismaClient();

async function main() {
  for (const [i, s] of services.entries()) {
    const data = { sortOrder: i, navTitle: s.navTitle, title: s.title, h1: s.h1, lead: s.lead, problemTitle: s.problemTitle, problem: s.problem, deliverables: s.deliverables, example: s.example, benefits: s.benefits, approach: s.approach, faq: s.faq, visual: s.visual, relatedModels: s.relatedModels, seoTitle: s.seoTitle, metaDescription: s.metaDescription };
    await db.service.upsert({ where: { slug: s.slug }, create: { slug: s.slug, ...data }, update: {} });
  }
  for (const [i, m] of demoModels.entries()) {
    const data = { sortOrder: i, title: m.title, company: m.company, sector: m.sector, summary: m.summary, description: m.description, audience: m.audience, highlights: m.highlights, tabs: m.tabs, serviceSlug: m.serviceSlug };
    await db.demoModel.upsert({ where: { slug: m.slug }, create: { slug: m.slug, ...data }, update: { company: m.company, tabs: m.tabs } });
  }
  if ((await db.faqItem.count()) === 0) await db.faqItem.createMany({ data: faqItems.map((f, i) => ({ ...f, sortOrder: i })) });
  if ((await db.caseStudy.count()) === 0) for (const [i, c] of demoCases.entries()) await db.caseStudy.create({ data: { ...c, isDemo: true, sortOrder: i } });
  for (const t of TOPICS) await db.articleTopic.upsert({ where: { slug: t.slug }, create: { ...t }, update: { name: t.name, description: t.description } });

  const topicIds = Object.fromEntries((await db.articleTopic.findMany()).map((t) => [t.slug, t.id]));
  const overwrite = process.env.SEED_OVERWRITE_ARTICLES === "true";
  const now = new Date();
  let created = 0, updated = 0;
  for (const a of allArticles) {
    const data = {
      slug: a.slug, title: a.title, subjectYear: a.subjectYear, summary: a.summary, body: a.body, practice: a.practice, sources: a.sources, serviceLinks: a.serviceLinks, visual: a.visual,
      seoTitle: a.seoTitle ?? `${a.title} | Excel door de jaren`.slice(0, 80), metaDescription: a.metaDescription ?? a.summary.slice(0, 158), factNote: a.factNote ?? null,
    };
    const existing = await db.article.findUnique({ where: { number: a.number } });
    if (!existing) {
      await db.article.create({ data: { ...data, number: a.number, status: a.status, publishedAt: a.status === "PUBLISHED" ? now : null, topics: { connect: a.topics.map((t) => ({ id: topicIds[t] })) } } });
      created++;
    } else if (overwrite) {
      await db.article.update({ where: { id: existing.id }, data: { ...data, topics: { set: a.topics.map((t) => ({ id: topicIds[t] })) } } });
      updated++;
    }
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase(), pw = process.env.ADMIN_PASSWORD;
  if (email && pw) {
    if (pw.length < 12) throw new Error("ADMIN_PASSWORD moet minimaal 12 tekens zijn.");
    if (!(await db.adminUser.findUnique({ where: { email } }))) {
      await db.adminUser.create({ data: { email, name: process.env.ADMIN_NAME || "Beheerder", role: "OWNER", passwordHash: await bcrypt.hash(pw, 12) } });
      console.log(`Eigenaar-account aangemaakt voor ${email}.`);
    }
  } else if ((await db.adminUser.count()) === 0) console.warn("Let op: geen beheerder aangemaakt. Zet ADMIN_EMAIL en ADMIN_PASSWORD en draai de seed opnieuw.");
  console.log(`Seed klaar: ${services.length} diensten, ${demoModels.length} voorbeelden, artikelen ${created} nieuw / ${updated} bijgewerkt.`);
}
main().finally(() => db.$disconnect());
