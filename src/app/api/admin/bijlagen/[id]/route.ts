import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { audit, can, currentUser } from "@/lib/server/auth";
import { readStored } from "@/lib/server/storage";

export const runtime = "nodejs";

/** Download van een klantbestand: alleen voor ingelogde gebruikers met leesrechten, altijd gelogd. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user || !can(user.role, "requests.read")) return new NextResponse("Geen toegang", { status: 403 });
  const { id } = await params;
  const a = await db.attachment.findUnique({ where: { id }, include: { request: { select: { number: true } } } });
  if (!a || !a.request) return new NextResponse("Niet gevonden", { status: 404 });
  if (a.scanStatus === "INFECTED") return new NextResponse("Bestand geblokkeerd door virusscanner", { status: 423 });
  const buf = await readStored(a.storedName).catch(() => null);
  if (!buf) return new NextResponse("Bestand niet meer aanwezig", { status: 410 });
  await audit(user.id, "bijlage.download", `${a.request.number}:${a.id}`);
  return new NextResponse(new Uint8Array(buf), { headers: {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(a.originalName)}`,
    "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
  } });
}
