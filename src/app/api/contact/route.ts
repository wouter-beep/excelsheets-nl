import { NextResponse } from "next/server";
import { z } from "zod";
import { limit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { createRequest } from "@/lib/server/requests";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(120),
  company: z.string().trim().min(1, "Vul je bedrijfsnaam in").max(160),
  email: z.string().trim().toLowerCase().email("Vul een geldig e-mailadres in").max(200),
  phone: z.string().trim().max(40).regex(/^[0-9+()\-\s]*$/, "Controleer je telefoonnummer").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Je bericht is te kort").max(4000),
  consent: z.literal(true, { errorMap: () => ({ message: "Geef aan dat je de privacyverklaring hebt gelezen" }) }),
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(4096).optional(),
});

/** Kort contactformulier. Komt als aanvraag (doel: andere vraag) in het beheer terecht. */
export async function POST(req: Request) {
  const rl = await limit("contact", 5, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Te veel berichten kort na elkaar. Probeer het later opnieuw." }, { status: 429 });
  const p = schema.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ errors: [...new Set(p.error.issues.map((i) => i.message))] }, { status: 422 });
  const d = p.data;
  if (d.website || Date.now() - d.startedAt < 4000) return NextResponse.json({ error: "Je bericht kon niet worden verwerkt." }, { status: 400 });
  if (!(await verifyTurnstile(d.turnstileToken))) return NextResponse.json({ error: "De botcontrole is niet gelukt." }, { status: 400 });
  const summary = `Vraag via het contactformulier: ${d.message.slice(0, 160)}${d.message.length > 160 ? "…" : ""}`;
  try {
    const r = await createRequest({
      goal: "anders", categories: ["overig"], story: d.message, situation: { sources: [], platforms: [] }, summary,
      summaryData: { oplossing: "Nog te bespreken", situatie: "Via contactformulier", doelen: "Nog te bespreken", onderdelen: "Nog te bespreken", koppelingen: "Nog niet bekend", planning: "Nog niet aangegeven" },
      contact: { name: d.name, company: d.company, email: d.email, phone: d.phone, preferred: d.phone ? "telefoon" : "email" }, consent: true, uploads: [], source: "contactformulier", startedAt: d.startedAt,
    });
    return NextResponse.json({ number: r.number });
  } catch (e) {
    console.error(`[contact] opslaan mislukt: ${(e as Error).message}`);
    return NextResponse.json({ error: "Er ging iets mis. Probeer het opnieuw." }, { status: 500 });
  }
}
