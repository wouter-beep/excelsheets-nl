"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";

export function ContactForm() {
  const [startedAt] = useState(() => Date.now());
  const [state, setState] = useState<{ status: "idle" | "busy" | "done"; errors?: string[]; number?: string }>({ status: "idle" });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ status: "busy" });
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      name: fd.get("name"), company: fd.get("company"), email: fd.get("email"), phone: fd.get("phone"), message: fd.get("message"), consent: fd.get("consent") === "on", website: fd.get("website"), startedAt,
    }) }).catch(() => null);
    const body = res ? await res.json().catch(() => ({})) : {};
    if (!res || !res.ok) return setState({ status: "idle", errors: body.errors ?? [body.error ?? "Versturen is niet gelukt."] });
    setState({ status: "done", number: body.number });
  }
  if (state.status === "done") return (
    <div role="status" className="rounded-2xl border border-emerald/40 bg-mint-50 p-6"><Check className="h-7 w-7 text-excel" aria-hidden /><p className="mt-3 font-display text-xl font-bold">Bedankt, je bericht is verstuurd.</p><p className="mt-1 text-ink-500">Je referentienummer is <span className="font-mono font-semibold">{state.number}</span>. We nemen zo snel mogelijk contact met je op.</p></div>
  );
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="c-name" className="label">Naam</label><input id="c-name" name="name" autoComplete="name" required className="input" /></div>
        <div><label htmlFor="c-company" className="label">Bedrijfsnaam</label><input id="c-company" name="company" autoComplete="organization" required className="input" /></div>
        <div><label htmlFor="c-email" className="label">Zakelijk e-mailadres</label><input id="c-email" name="email" type="email" autoComplete="email" required className="input" /></div>
        <div><label htmlFor="c-phone" className="label">Telefoon <span className="font-normal text-ink-400">(optioneel)</span></label><input id="c-phone" name="phone" type="tel" autoComplete="tel" className="input" /></div>
      </div>
      <div><label htmlFor="c-message" className="label">Je vraag</label><textarea id="c-message" name="message" rows={5} required className="input" /></div>
      <div className="absolute -left-[9999px]" aria-hidden><label>Laat leeg<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="flex items-start gap-3 text-[14px]"><input type="checkbox" name="consent" className="mt-0.5 h-5 w-5 accent-[#147D52]" /><span>Ik heb de <Link href="/privacy" className="text-excel underline">privacyverklaring</Link> gelezen.</span></label>
      {state.errors && <ul role="alert" className="rounded-xl bg-coral-100 px-4 py-3 text-[14px] text-coral">{state.errors.map((e) => <li key={e}>{e}</li>)}</ul>}
      <button disabled={state.status === "busy"} className="btn-dark">{state.status === "busy" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Versturen…</> : "Verstuur bericht"}</button>
    </form>
  );
}
