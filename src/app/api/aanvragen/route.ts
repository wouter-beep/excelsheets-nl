import { NextResponse } from "next/server";
import { requestSchema } from "@/lib/intake";
import { limit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { createRequest } from "@/lib/server/requests";

export const runtime = "nodejs";
const MIN_FILL_MS = 8_000;

export async function POST(req: Request) {
  const rl = await limit("aanvraag", 5, 60 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Je hebt kort na elkaar meerdere aanvragen verstuurd. Probeer het over een tijdje opnieuw of mail ons." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  let json: unknown;
  try { json = await req.json(); } catch { return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 }); }
  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    const errors = [...new Set(parsed.error.issues.map((i) => (i.message && !i.message.startsWith("Expected") && !i.message.startsWith("Invalid") ? i.message : `Controleer het veld "${i.path.join(".")}".`)))];
    return NextResponse.json({ errors }, { status: 422 });
  }
  const input = parsed.data;

  // Botbescherming: honeypot en minimale invultijd. Bots krijgen een neutraal antwoord.
  if (input.website || Date.now() - input.startedAt < MIN_FILL_MS || input.startedAt > Date.now() + 60_000) {
    return NextResponse.json({ error: "Je aanvraag kon niet worden verwerkt. Probeer het opnieuw." }, { status: 400 });
  }
  if (!(await verifyTurnstile(input.turnstileToken))) return NextResponse.json({ error: "De botcontrole is niet gelukt. Probeer het opnieuw." }, { status: 400 });

  try {
    const r = await createRequest(input);
    return NextResponse.json({ number: r.number, token: r.publicToken });
  } catch (e) {
    console.error(`[aanvraag] opslaan mislukt: ${(e as Error).message}`);
    return NextResponse.json({ error: "Er ging aan onze kant iets mis. Je aanvraag is niet opgeslagen; probeer het opnieuw of mail ons." }, { status: 500 });
  }
}
