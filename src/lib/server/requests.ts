import "server-only";
import ExcelJS from "exceljs";
import { Prisma, type RequestStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { classify } from "@/lib/classify";
import { BUDGET, CATEGORIES, GOALS, URGENCY, labelOf, type RequestInput, type SummaryData } from "@/lib/intake";
import { getCompany, getNotifications, getRetention } from "@/lib/settings";
import { siteConfig } from "@/config/site";
import { adminNotificationEmail, confirmationEmail, sendMail } from "./email";
import { randomToken } from "./storage";

export const STATUS_LABELS = {
  NIEUW: "Nieuw", IN_BEHANDELING: "In behandeling", INFO_NODIG: "Aanvullende informatie nodig", OFFERTE: "Offerte uitgebracht",
  GEWONNEN: "Gewonnen", AFGEWEZEN: "Afgewezen", AFGEROND: "Afgerond",
} as const;

/** Aanvraagnummer: ES-<jaar>-<volgnummer, 4 cijfers>. */
async function nextNumber(tx: Prisma.TransactionClient, year: number) {
  const last = await tx.request.findFirst({ where: { number: { startsWith: `ES-${year}-` } }, orderBy: { number: "desc" }, select: { number: true } });
  const n = last ? Number(last.number.split("-")[2]) + 1 : 1;
  return `ES-${year}-${String(n).padStart(4, "0")}`;
}

export function summaryRows(r: { goal: string; categories: string[]; urgency?: string | null; budget?: string | null; summaryData: SummaryData }): [string, string][] {
  return [
    ["Doel", labelOf(GOALS, r.goal) ?? r.goal],
    ["Onderwerpen", r.categories.map((c) => labelOf(CATEGORIES, c) ?? c).join(", ")],
    ["Gewenste oplossing", r.summaryData.oplossing],
    ["Huidige situatie", r.summaryData.situatie],
    ["Verbeterdoelen", r.summaryData.doelen],
    ["Mogelijke onderdelen", r.summaryData.onderdelen],
    ["Koppelingen", r.summaryData.koppelingen],
    ["Planning", labelOf(URGENCY, r.urgency ?? undefined) ?? r.summaryData.planning],
    ["Budgetindicatie", labelOf(BUDGET, r.budget ?? undefined) ?? "Niet opgegeven"],
  ];
}

export async function createRequest(input: RequestInput) {
  const retention = await getRetention();
  const uploads = input.uploads.length
    ? await db.attachment.findMany({ where: { uploadToken: { in: input.uploads }, requestId: null } })
    : [];
  const classification = classify({ ...input, uploadCount: uploads.length });
  const now = new Date();
  const deleteAfter = new Date(now.getTime() + retention.requestDays * 864e5);
  const fileDeleteAfter = new Date(now.getTime() + retention.attachmentDays * 864e5);

  let created: { id: string; number: string; publicToken: string } | null = null;
  for (let attempt = 0; attempt < 5 && !created; attempt++) {
    try {
      created = await db.$transaction(async (tx) => {
        const contact = await tx.contact.create({ data: {
          name: input.contact.name, company: input.contact.company, email: input.contact.email,
          phone: input.contact.phone || null, preferredContact: input.contact.preferred,
        } });
        const number = await nextNumber(tx, now.getFullYear());
        const req = await tx.request.create({ data: {
          number, publicToken: randomToken(24), goal: input.goal, categories: input.categories, story: input.story,
          situation: input.situation, urgency: input.urgency, budget: input.budget, summary: input.summary,
          summaryData: input.summaryData, classification, complexity: classification.complexity, typeLabel: classification.type,
          priority: classification.priority, source: input.source, consentAt: now, contactId: contact.id, deleteAfter,
          events: { create: { toState: "NIEUW", actor: "website" } },
        }, select: { id: true, number: true, publicToken: true } });
        if (uploads.length) await tx.attachment.updateMany({ where: { id: { in: uploads.map((u) => u.id) }, requestId: null }, data: { requestId: req.id, deleteAfter: fileDeleteAfter } });
        return req;
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue; // nummer al bezet: opnieuw
      throw e;
    }
  }
  if (!created) throw new Error("Kon geen aanvraagnummer toekennen");

  // E-mails (fouten blokkeren de aanvraag niet; status is zichtbaar in het beheer)
  const [company, notify] = await Promise.all([getCompany(), getNotifications()]);
  const rows = summaryRows({ ...input, summaryData: input.summaryData });
  const downloadUrl = `${siteConfig.url}/api/aanvragen/${created.number}/overzicht?t=${created.publicToken}`;
  const conf = confirmationEmail({ name: input.contact.name, number: created.number, summary: input.summary, rows, downloadUrl, responseTime: company.responseTime, files: uploads.length });
  const adm = adminNotificationEmail({
    number: created.number, adminUrl: `${siteConfig.url}/admin/aanvragen/${created.number}`, contact: { ...input.contact, phone: input.contact.phone || undefined },
    summary: input.summary, classification, files: uploads.map((u) => ({ name: u.originalName, scan: u.scanStatus })), rows,
  });
  const [m1] = await Promise.all([
    sendMail({ to: input.contact.email, subject: conf.subject, html: conf.html, text: conf.text, tag: `bevestiging-${created.number}`, replyTo: company.email ?? undefined }),
    sendMail({ to: notify.adminRecipients, subject: adm.subject, html: adm.html, text: adm.text, tag: `melding-${created.number}`, replyTo: input.contact.email }),
  ]);
  return { ...created, emailMode: m1.mode, emailSent: m1.ok };
}

/** Downloadbare samenvatting als Excel-bestand (voor de aanvrager en het beheer). */
export async function summaryWorkbook(number: string) {
  const r = await db.request.findUnique({ where: { number }, include: { contact: true, attachments: { select: { originalName: true, size: true } } } });
  if (!r) return null;
  const wb = new ExcelJS.Workbook();
  wb.creator = "ExcelSheets.nl"; wb.created = new Date();
  const ws = wb.addWorksheet("Aanvraag", { views: [{ showGridLines: false }], properties: { tabColor: { argb: "FF18B979" } } });
  ws.columns = [{ width: 3 }, { width: 28 }, { width: 90 }];
  ws.getCell("B2").value = "ExcelSheets.nl · Samenvatting van je aanvraag";
  ws.getCell("B2").font = { bold: true, size: 16, color: { argb: "FF073B2A" } };
  ws.getCell("B3").value = `${r.number} · ontvangen ${r.createdAt.toLocaleString("nl-NL", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Amsterdam" })}`;
  ws.getCell("B3").font = { italic: true, color: { argb: "FF6B7A72" } };
  ws.getCell("B5").value = r.summary; ws.mergeCells("B5:C5");
  ws.getCell("B5").font = { bold: true, size: 12, color: { argb: "FF073B2A" } };
  ws.getCell("B5").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE6FBEF" } };
  ws.getCell("B5").alignment = { wrapText: true, vertical: "middle" }; ws.getRow(5).height = 48;
  const rows = [
    ...summaryRows({ goal: r.goal, categories: r.categories as string[], urgency: r.urgency, budget: r.budget, summaryData: r.summaryData as SummaryData }),
    ["Jouw verhaal", r.story],
    ["Bijlagen", r.attachments.map((a) => a.originalName).join(", ") || "Geen"],
    ["Contactpersoon", `${r.contact.name}, ${r.contact.company}`],
    ["Contactvoorkeur", r.contact.preferredContact === "telefoon" ? "Telefonisch" : "Per e-mail"],
  ];
  rows.forEach(([k, v], i) => {
    const row = ws.getRow(7 + i);
    row.getCell(2).value = k; row.getCell(2).font = { bold: true, color: { argb: "FF4A5A52" } };
    row.getCell(3).value = v; row.getCell(3).alignment = { wrapText: true, vertical: "top" };
    row.getCell(2).alignment = { vertical: "top" };
    if (i % 2 === 0) [2, 3].forEach((c) => (row.getCell(c).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2FDF7" } }));
  });
  const end = 8 + rows.length;
  ws.getCell(`B${end}`).value = "Dit is geen offerte. Na een kort kennismakingsgesprek ontvang je een voorstel op maat.";
  ws.getCell(`B${end}`).font = { italic: true, color: { argb: "FF6B7A72" } };
  return { buffer: Buffer.from(await wb.xlsx.writeBuffer()), number: r.number, publicToken: r.publicToken };
}

/** Zoeken zonder hoofdlettergevoeligheid (PostgreSQL); SQLite is standaard al ongevoelig voor ASCII. */
const like = (q: string) => ({ contains: q, ...(process.env.DATABASE_URL?.startsWith("postgres") ? { mode: "insensitive" } : {}) }) as Prisma.StringFilter;

export function requestWhere(sp: { status?: string; q?: string; complexiteit?: string }): Prisma.RequestWhereInput {
  const where: Prisma.RequestWhereInput = {};
  if (sp.status && sp.status in STATUS_LABELS) where.status = sp.status as RequestStatus;
  if (sp.complexiteit) where.complexity = sp.complexiteit;
  if (sp.q?.trim()) {
    const q = sp.q.trim();
    where.OR = [{ number: like(q) }, { summary: like(q) }, { story: like(q) }, { typeLabel: like(q) },
      { contact: { OR: [{ name: like(q) }, { company: like(q) }, { email: like(q) }] } }];
  }
  return where;
}
