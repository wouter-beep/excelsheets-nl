import { NextResponse } from "next/server";
import { EXPORTS } from "@/models/registry";
import { buildWorkbook } from "@/lib/xlsx";
import { demoModels } from "@/content/models";

export const runtime = "nodejs";
const cacheMap = new Map<string, Uint8Array>();

/** Download van een demonstratiemodel als echte Excel-werkmap met formules. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = demoModels.find((m) => m.slug === slug);
  const build = EXPORTS[slug];
  if (!meta || !build) return new NextResponse("Niet gevonden", { status: 404 });
  let buf = cacheMap.get(slug);
  if (!buf) {
    buf = new Uint8Array(await buildWorkbook({ title: meta.title, company: meta.company, description: meta.summary, sheets: build() }));
    cacheMap.set(slug, buf);
  }
  return new NextResponse(buf as BodyInit, { headers: {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="ExcelSheets-voorbeeld-${slug}.xlsx"`,
    "Cache-Control": "public, max-age=3600",
  } });
}
