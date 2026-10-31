import "server-only";
/** Optionele botcontrole via Cloudflare Turnstile (privacyvriendelijk, geen tracking-cookies). */
export async function verifyTurnstile(token: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // niet geconfigureerd: honeypot + tijdscontrole + rate limiting blijven actief
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body: new URLSearchParams({ secret, response: token }), cache: "no-store",
    });
    const body = (await res.json()) as { success?: boolean };
    return !!body.success;
  } catch { return false; }
}
