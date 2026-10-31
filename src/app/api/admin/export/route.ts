import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { audit, can, currentUser } from "@/lib/server/auth";
import { STATUS_LABELS, requestWhere } from "@/lib/server/requests";
import { BUDGET, CATEGORIES, GOALS, URGENCY, labelOf } from "@/lib/intake";

export const runtime = "nodejs";

const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // voorkomt formule-injectie bij openen in Excel
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user || !can(user.role, "requests.export")) return new NextResponse("Geen toegang", { status: 403 });
  const sp = Object.fromEntries(new URL(req.url).searchParams);
  const rows = await db.request.findMany({ where: requestWhere(sp), orderBy: { createdAt: "desc" }, include: { contact: true, _count: { select: { attachments: true } } } });
  const head = ["Nummer", "Datum", "Status", "Naam", "Bedrijf", "E-mail", "Telefoon", "Voorkeur", "Doel", "Onderwerpen", "Type", "Complexiteit", "Prioriteit", "Start", "Budget", "Bijlagen", "Samenvatting"];
  const lines = rows.map((r) => [r.number, r.createdAt.toISOString().slice(0, 10), STATUS_LABELS[r.status], r.contact.name, r.contact.company, r.contact.email, r.contact.phone, r.contact.preferredContact,
    labelOf(GOALS, r.goal), (r.categories as string[]).map((c) => labelOf(CATEGORIES, c)).join(", "), r.typeLabel, r.complexity, r.priority, labelOf(URGENCY, r.urgency ?? undefined), labelOf(BUDGET, r.budget ?? undefined), r._count.attachments, r.summary].map(cell).join(";"));
  await audit(user.id, "aanvragen.export", `${rows.length} rijen`);
  return new NextResponse("﻿" + [head.map(cell).join(";"), ...lines].join("\r\n"), { headers: {
    "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="aanvragen-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "private, no-store",
  } });
}
