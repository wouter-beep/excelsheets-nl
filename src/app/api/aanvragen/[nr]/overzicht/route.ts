import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { summaryWorkbook } from "@/lib/server/requests";
import { currentUser, can } from "@/lib/server/auth";
import { limit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";

/** Samenvatting als .xlsx. Toegang met de geheime link uit de bevestiging, of als ingelogde beheerder. */
export async function GET(req: Request, { params }: { params: Promise<{ nr: string }> }) {
  const { nr } = await params;
  if (!/^ES-\d{4}-\d{4,6}$/.test(nr)) return new NextResponse("Niet gevonden", { status: 404 });
  const rl = await limit("overzicht", 60, 60 * 60 * 1000);
  if (!rl.ok) return new NextResponse("Te veel verzoeken", { status: 429 });
  const wb = await summaryWorkbook(nr);
  if (!wb) return new NextResponse("Niet gevonden", { status: 404 });
  const t = new URL(req.url).searchParams.get("t") ?? "";
  const tokenOk = t.length === wb.publicToken.length && timingSafeEqual(Buffer.from(t), Buffer.from(wb.publicToken));
  if (!tokenOk) {
    const user = await currentUser().catch(() => null);
    if (!user || !can(user.role, "requests.read")) return new NextResponse("Niet gevonden", { status: 404 });
  }
  return new NextResponse(new Uint8Array(wb.buffer), { headers: {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="ExcelSheets-aanvraag-${nr}.xlsx"`,
    "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex",
  } });
}
