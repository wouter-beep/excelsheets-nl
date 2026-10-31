"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileSpreadsheet, Lock, Loader2, Pencil, Sparkles, Trash2, UploadCloud, AlertCircle } from "lucide-react";
import { GOALS, CATEGORIES, CATEGORY_FOCUS, STORY_SUGGESTIONS, USERS, FREQUENCY, SOURCES, INTEGRATION, PLATFORMS, URGENCY, BUDGET, visibleQuestions, labelOf, type GoalKey, type CategoryKey, type Situation, type SummaryData } from "@/lib/intake";
import { buildSummary } from "@/lib/classify";
import { fileSize } from "@/lib/format";
import { cn } from "@/lib/cn";

type Upload = { localId: string; name: string; size: number; status: "uploading" | "done" | "error"; token?: string; error?: string; progress: number };
type State = {
  goal?: GoalKey; categories: CategoryKey[]; story: string; situation: Situation;
  urgency?: string; budget?: string; summary: string; summaryData: SummaryData | null; summaryEdited: boolean;
  contact: { name: string; company: string; email: string; phone: string; preferred: "email" | "telefoon" }; consent: boolean;
};
const EMPTY: State = {
  categories: [], story: "", situation: { sources: [], platforms: [] }, summary: "", summaryData: null, summaryEdited: false,
  contact: { name: "", company: "", email: "", phone: "", preferred: "email" }, consent: false,
};
const STEPS = ["Doel", "Onderwerp", "Jouw verhaal", "Situatie", "Bestanden", "Planning", "Samenvatting", "Versturen"];
const MODEL_TOPICS: Record<string, { goal: GoalKey; cats: CategoryKey[] }> = {
  managementdashboard: { goal: "rapportage", cats: ["rapportage", "finance"] }, "begroting-rolling-forecast": { goal: "rapportage", cats: ["begroting", "finance"] },
  liquiditeitsprognose: { goal: "rapportage", cats: ["finance"] }, jaarrekeningwerkboek: { goal: "rapportage", cats: ["jaarrekening", "finance"] },
  personeelsplanning: { goal: "nieuw", cats: ["planning", "personeel"] }, "horeca-omzetanalyse": { goal: "rapportage", cats: ["omzet", "rapportage"] },
  "productie-efficiency": { goal: "rapportage", cats: ["productie", "rapportage"] }, kostprijsberekening: { goal: "nieuw", cats: ["kostprijs"] },
  "projecten-nacalculatie": { goal: "nieuw", cats: ["projectmanagement"] }, voorraadbeheer: { goal: "nieuw", cats: ["voorraad"] },
  consolidatie: { goal: "rapportage", cats: ["jaarrekening", "finance"] }, investeringsmodel: { goal: "rapportage", cats: ["finance"] },
};
const ACCEPT = ".xlsx,.xlsm,.xls,.xlsb,.csv";
const MAX_MB = Number(process.env.NEXT_PUBLIC_UPLOAD_MAX_MB || 15);
const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function Verzoekwijzer() {
  const router = useRouter();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(EMPTY);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const [honey, setHoney] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const restored = useRef(false);

  // Voorinvullen vanuit links en concept herstellen
  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = sessionStorage.getItem("es-verzoekwijzer");
      if (raw) { const d = JSON.parse(raw); setS({ ...EMPTY, ...d.s }); setStep(Math.min(d.step ?? 0, 6)); return; }
    } catch {}
    const doel = params.get("doel") as GoalKey | null;
    const onderwerp = params.get("onderwerp") as CategoryKey | null;
    const model = params.get("model");
    const next = { ...EMPTY };
    if (model && MODEL_TOPICS[model]) { next.goal = MODEL_TOPICS[model].goal; next.categories = MODEL_TOPICS[model].cats; }
    if (doel && GOALS.some((g) => g.key === doel)) next.goal = doel;
    if (onderwerp && CATEGORIES.some((c) => c.key === onderwerp) && !next.categories.includes(onderwerp)) next.categories = [...next.categories, onderwerp];
    setS(next);
  }, [params]);
  useEffect(() => { try { sessionStorage.setItem("es-verzoekwijzer", JSON.stringify({ s, step })); } catch {} }, [s, step]);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); setErrors([]); }, [step]);

  const set = (p: Partial<State>) => setS((x) => ({ ...x, ...p }));
  const setSit = (p: Partial<Situation>) => setS((x) => ({ ...x, situation: { ...x.situation, ...p } }));
  const vis = visibleQuestions(s.goal, s.situation);
  const doneUploads = uploads.filter((u) => u.status === "done");

  // Samenvatting opnieuw opbouwen tot de bezoeker hem zelf aanpast
  const generated = useMemo(() => s.goal ? buildSummary({ goal: s.goal, categories: s.categories, story: s.story, situation: s.situation, urgency: s.urgency, budget: s.budget, uploadCount: doneUploads.length }) : null,
    [s.goal, s.categories, s.story, s.situation, s.urgency, s.budget, doneUploads.length]);
  useEffect(() => { if (generated && !s.summaryEdited) setS((x) => ({ ...x, summary: generated.text, summaryData: generated.data })); }, [generated, s.summaryEdited]);

  const validate = (i: number): string[] => {
    if (i === 0 && !s.goal) return ["Kies wat je wilt bereiken."];
    if (i === 1 && s.categories.length === 0) return ["Kies minstens één onderwerp."];
    if (i === 2 && s.story.trim().length < 10) return ["Vertel in een paar woorden wat je zoekt (minimaal 10 tekens)."];
    if (i === 4 && uploads.some((u) => u.status === "uploading")) return ["Wacht tot de bestanden zijn geüpload."];
    if (i === 6 && s.summary.trim().length < 10) return ["De samenvatting is te kort."];
    if (i === 7) {
      const e: string[] = [];
      if (s.contact.name.trim().length < 2) e.push("Vul je naam in.");
      if (!s.contact.company.trim()) e.push("Vul je bedrijfsnaam in.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.contact.email.trim())) e.push("Vul een geldig e-mailadres in.");
      if (s.contact.phone && !/^[0-9+()\-\s]{6,}$/.test(s.contact.phone)) e.push("Controleer je telefoonnummer.");
      if (s.contact.preferred === "telefoon" && !s.contact.phone.trim()) e.push("Vul een telefoonnummer in als je liever gebeld wordt.");
      if (!s.consent) e.push("Geef aan dat je de privacyverklaring hebt gelezen.");
      if (TURNSTILE && !turnstileToken) e.push("Bevestig even dat je geen robot bent.");
      return e;
    }
    return [];
  };
  const next = () => { const e = validate(step); if (e.length) { setErrors(e); return; } setStep((x) => Math.min(x + 1, STEPS.length - 1)); window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); };
  const back = () => setStep((x) => Math.max(0, x - 1));

  async function uploadFile(file: File) {
    const localId = Math.random().toString(36).slice(2);
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    const base: Upload = { localId, name: file.name, size: file.size, status: "uploading", progress: 0 };
    if (!ACCEPT.split(",").includes(ext)) { setUploads((u) => [...u, { ...base, status: "error", error: "Dit bestandstype wordt niet ondersteund." }]); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setUploads((u) => [...u, { ...base, status: "error", error: `Bestand is groter dan ${MAX_MB} MB.` }]); return; }
    if (uploads.filter((u) => u.status !== "error").length >= 5) { setUploads((u) => [...u, { ...base, status: "error", error: "Maximaal 5 bestanden." }]); return; }
    setUploads((u) => [...u, base]);
    const fd = new FormData(); fd.append("file", file);
    await new Promise<void>((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/uploads");
      xhr.upload.onprogress = (e) => { if (e.lengthComputable) setUploads((u) => u.map((x) => x.localId === localId ? { ...x, progress: e.loaded / e.total } : x)); };
      xhr.onload = () => {
        let body: { token?: string; error?: string } = {};
        try { body = JSON.parse(xhr.responseText); } catch {}
        setUploads((u) => u.map((x) => x.localId === localId ? (xhr.status === 200 && body.token ? { ...x, status: "done", token: body.token, progress: 1 } : { ...x, status: "error", error: body.error || "Uploaden is niet gelukt." }) : x));
        resolve();
      };
      xhr.onerror = () => { setUploads((u) => u.map((x) => x.localId === localId ? { ...x, status: "error", error: "Netwerkfout tijdens uploaden." } : x)); resolve(); };
      xhr.send(fd);
    });
  }
  async function removeUpload(u: Upload) {
    setUploads((list) => list.filter((x) => x.localId !== u.localId));
    if (u.token) fetch(`/api/uploads/${u.token}`, { method: "DELETE" }).catch(() => {});
  }

  async function submit() {
    const e = validate(7);
    if (e.length) { setErrors(e); return; }
    setSubmitting(true); setErrors([]);
    try {
      const res = await fetch("/api/aanvragen", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: s.goal, categories: s.categories, story: s.story, situation: s.situation, urgency: s.urgency, budget: s.budget,
          summary: s.summary, summaryData: s.summaryData, contact: s.contact, consent: s.consent,
          uploads: doneUploads.map((u) => u.token), source: params.get("model") ?? params.get("onderwerp") ?? undefined,
          website: honey, startedAt, turnstileToken,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) { setErrors(body.errors ?? [body.error ?? "Versturen is niet gelukt. Probeer het opnieuw."]); setSubmitting(false); return; }
      try { sessionStorage.removeItem("es-verzoekwijzer"); } catch {}
      router.push(`/aanvraag-ontvangen?nr=${encodeURIComponent(body.number)}&t=${encodeURIComponent(body.token)}`);
    } catch {
      setErrors(["Er ging iets mis met de verbinding. Probeer het opnieuw."]); setSubmitting(false);
    }
  }

  const focusCats = s.goal ? CATEGORY_FOCUS[s.goal] : [];
  const orderedCats = [...CATEGORIES].sort((a, b) => (focusCats.includes(b.key) ? 1 : 0) - (focusCats.includes(a.key) ? 1 : 0));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
      {TURNSTILE && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <div className="min-w-0">
        <Progress step={step} onJump={(i) => i < step && setStep(i)} />
        <div className="card mt-6 p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <p className="font-mono text-[12px] uppercase tracking-widest text-excel">Stap {step + 1} van {STEPS.length}</p>
              <h2 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-2xl font-bold outline-none md:text-3xl">
                {["Wat wil je bereiken?", "Waar gaat jouw vraagstuk over?", "Vertel kort jouw verhaal", "Hoe ziet jouw huidige situatie eruit?", "Upload eventueel je huidige bestanden", "Wanneer wil je beginnen?", "Dit begrijpen wij van jouw vraagstuk", "Hoe kunnen we je bereiken?"][step]}
              </h2>

              {step === 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g, i) => (
                    <button key={g.key} type="button" aria-pressed={s.goal === g.key} onClick={() => { set({ goal: g.key }); setTimeout(() => setStep(1), reduce ? 0 : 220); }}
                      className={cn("group flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-card", s.goal === g.key ? "border-emerald bg-mint-50" : "border-ink/10 bg-white hover:border-emerald/50")}>
                      <GoalIllustration i={i} active={s.goal === g.key} />
                      <span><span className="block font-display text-[17px] font-bold leading-snug">{g.title}</span><span className="mt-1 block text-[14px] text-ink-500">{g.text}</span></span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <>
                  <p className="mt-2 text-ink-500">Kies alles wat van toepassing is. {s.goal && <>Bovenaan staan de onderwerpen die vaak horen bij <strong>{labelOf(GOALS, s.goal)?.toLowerCase()}</strong>.</>}</p>
                  <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Onderwerpen">
                    {orderedCats.map((c) => {
                      const on = s.categories.includes(c.key);
                      return (
                        <button key={c.key} type="button" aria-pressed={on} onClick={() => set({ categories: on ? s.categories.filter((x) => x !== c.key) : [...s.categories, c.key] })}
                          className={cn("inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[15px] font-medium transition", on ? "border-forest bg-forest text-white" : "border-ink/15 bg-white hover:border-emerald", focusCats.includes(c.key) && !on && "border-emerald/40 bg-mint-50")}>
                          {on && <Check className="h-4 w-4" aria-hidden />}{c.label}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <label htmlFor="story" className="mt-2 block text-ink-500">Wat zou je willen dat Excel voor jouw bedrijf doet? Schrijf het zoals je het aan een collega zou vertellen.</label>
                  <textarea id="story" rows={7} value={s.story} onChange={(e) => set({ story: e.target.value })} maxLength={4000}
                    placeholder="Bijvoorbeeld: elke maand plakken we drie exports uit ons boekhoudpakket in één bestand. Dat kost een dag en er gaat regelmatig iets mis. We willen een overzicht per afdeling met budget erbij…"
                    className="input mt-4 min-h-[180px] resize-y text-[16px] leading-relaxed" />
                  <div className="mt-1 flex justify-between text-[12px] text-ink-400"><span>Geen vaktermen nodig.</span><span>{s.story.length} / 4000</span></div>
                  <p className="mb-2 mt-5 flex items-center gap-1.5 text-[13px] font-semibold text-ink-700"><Sparkles className="h-4 w-4 text-excel" aria-hidden />Klik om een voorbeeld toe te voegen</p>
                  <div className="flex flex-wrap gap-2">
                    {STORY_SUGGESTIONS.map((t) => (
                      <button key={t} type="button" onClick={() => set({ story: (s.story.trim() ? s.story.trim() + " " : "") + t })} className="rounded-full border border-dashed border-excel/40 bg-mint-50 px-3.5 py-2 text-left text-[14px] text-forest hover:border-excel">“{t}”</button>
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="mt-6 space-y-7">
                  {vis.hasFile && <Choice label="Heb je al een bestaand Excel-bestand?" value={s.situation.hasFile} options={[{ key: "ja", label: "Ja" }, { key: "nee", label: "Nee, nog niet" }]} onChange={(v) => setSit({ hasFile: v as "ja" | "nee" })} />}
                  <Choice label="Hoeveel mensen gaan ermee werken?" value={s.situation.users} options={USERS} onChange={(v) => setSit({ users: v as Situation["users"] })} />
                  <Choice label="Hoe vaak gebruik je de oplossing?" value={s.situation.frequency} options={FREQUENCY} onChange={(v) => setSit({ frequency: v as Situation["frequency"] })} />
                  <Multi label="Waar komen de gegevens vandaan?" values={s.situation.sources} options={SOURCES} onChange={(v) => setSit({ sources: v as Situation["sources"] })} />
                  {vis.integration && <Choice label="Is koppeling met andere software gewenst?" value={s.situation.integration} options={INTEGRATION} onChange={(v) => setSit({ integration: v as Situation["integration"] })} />}
                  {vis.integrationWith && (
                    <div>
                      <label htmlFor="intw" className="label">Met welk pakket? <span className="font-normal text-ink-400">(optioneel)</span></label>
                      <input id="intw" className="input max-w-md" value={s.situation.integrationWith ?? ""} onChange={(e) => setSit({ integrationWith: e.target.value })} placeholder="Bijvoorbeeld Exact Online, AFAS of een eigen database" maxLength={120} />
                    </div>
                  )}
                  <Multi label="Met welke Excel werk je?" values={s.situation.platforms} options={PLATFORMS} onChange={(v) => setSit({ platforms: v as Situation["platforms"] })} />
                  <p className="text-[13px] text-ink-400">Weet je iets niet? Sla de vraag gerust over.</p>
                </div>
              )}

              {step === 4 && (
                <div className="mt-6">
                  <Dropzone onFiles={(files) => files.forEach(uploadFile)} />
                  {uploads.length > 0 && (
                    <ul className="mt-4 space-y-2" aria-live="polite">
                      {uploads.map((u) => (
                        <li key={u.localId} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3", u.status === "error" ? "border-coral/40 bg-coral-100/40" : "border-ink/10 bg-white")}>
                          <FileSpreadsheet className={cn("h-6 w-6 shrink-0", u.status === "error" ? "text-coral" : "text-excel")} aria-hidden />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium">{u.name}</p>
                            <p className="text-[12px] text-ink-400">{fileSize(u.size)} · {u.status === "uploading" ? `uploaden ${Math.round(u.progress * 100)}%` : u.status === "done" ? "veilig ontvangen" : u.error}</p>
                            {u.status === "uploading" && <span className="mt-1.5 block h-1 overflow-hidden rounded bg-ink/10"><span className="block h-full bg-emerald transition-all" style={{ width: `${u.progress * 100}%` }} /></span>}
                          </div>
                          {u.status === "uploading" ? <Loader2 className="h-5 w-5 animate-spin text-ink-400" aria-label="Bezig" /> : u.status === "done" ? <Check className="h-5 w-5 text-excel" aria-label="Geüpload" /> : <AlertCircle className="h-5 w-5 text-coral" aria-hidden />}
                          <button type="button" onClick={() => removeUpload(u)} aria-label={`Verwijder ${u.name}`} className="grid h-9 w-9 place-items-center rounded-full text-ink-400 hover:bg-coral-100 hover:text-coral"><Trash2 className="h-4 w-4" aria-hidden /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-5 flex gap-3 rounded-xl bg-mint-50 p-4 text-[14px] text-ink-700">
                    <Lock className="mt-0.5 h-5 w-5 shrink-0 text-excel" aria-hidden />
                    <p>Bedrijfsgegevens worden vertrouwelijk behandeld. Bestanden worden afgeschermd opgeslagen, zijn nooit publiek toegankelijk en worden volgens ons <Link href="/vertrouwelijkheid" className="text-excel underline">bewaarbeleid</Link> verwijderd. Uploaden is niet verplicht: je kunt bestanden ook later delen.</p>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="mt-6 space-y-8">
                  <Choice label="Wanneer wil je hiermee aan de slag?" value={s.urgency} options={URGENCY} onChange={(v) => set({ urgency: v })} />
                  <div>
                    <Choice label="Heb je al een budget in gedachten? (optioneel)" value={s.budget} options={BUDGET} onChange={(v) => set({ budget: v })} />
                    <p className="mt-3 text-[13px] text-ink-400">Dit is alleen een indicatie om je vraag goed in te schatten. Het is geen prijs of offerte. Je kunt deze vraag overslaan.</p>
                  </div>
                </div>
              )}

              {step === 6 && s.summaryData && (
                <div className="mt-6">
                  <div className="rounded-2xl border border-emerald/40 bg-mint-50 p-5">
                    <label htmlFor="summary" className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-forest"><Pencil className="h-4 w-4" aria-hidden />In één zin (je kunt alles aanpassen)</label>
                    <textarea id="summary" rows={3} value={s.summary} onChange={(e) => set({ summary: e.target.value, summaryEdited: true })} className="w-full resize-y rounded-xl border border-emerald/30 bg-white px-4 py-3 font-display text-[17px] font-semibold leading-snug text-ink focus:outline-none focus:ring-4 focus:ring-emerald/20" />
                  </div>
                  <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                    {([["oplossing", "Gewenste oplossing"], ["situatie", "Huidige situatie"], ["doelen", "Belangrijkste verbeterdoelen"], ["onderdelen", "Mogelijke technische onderdelen"], ["koppelingen", "Eventuele koppelingen"], ["planning", "Gewenste planning"]] as const).map(([k, label]) => (
                      <div key={k} className="rounded-xl border border-ink/10 bg-white p-4">
                        <dt><label htmlFor={`sd-${k}`} className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{label}</label></dt>
                        <dd><textarea id={`sd-${k}`} rows={2} value={s.summaryData![k]} onChange={(e) => set({ summaryData: { ...s.summaryData!, [k]: e.target.value }, summaryEdited: true })} className="mt-1 w-full resize-y border-0 bg-transparent p-0 text-[14.5px] leading-relaxed text-ink focus:outline-none focus:ring-0" /></dd>
                      </div>
                    ))}
                  </dl>
                  {s.summaryEdited && <button type="button" onClick={() => set({ summaryEdited: false })} className="mt-3 text-[13px] text-excel underline">Opnieuw laten opstellen op basis van mijn antwoorden</button>}
                  <p className="mt-6 font-display text-xl font-bold text-forest">Klinkt dit als jouw vraagstuk? Dan denken wij graag met je mee.</p>
                  <p className="mt-1 text-[13px] text-ink-400">Deze samenvatting is automatisch opgesteld uit je antwoorden, zonder AI. Er wordt niets naar externe diensten gestuurd.</p>
                </div>
              )}

              {step === 7 && (
                <div className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Naam" autoComplete="name" value={s.contact.name} onChange={(v) => set({ contact: { ...s.contact, name: v } })} required />
                    <Field id="company" label="Bedrijfsnaam" autoComplete="organization" value={s.contact.company} onChange={(v) => set({ contact: { ...s.contact, company: v } })} required />
                    <Field id="email" label="Zakelijk e-mailadres" type="email" autoComplete="email" value={s.contact.email} onChange={(v) => set({ contact: { ...s.contact, email: v } })} required />
                    <Field id="phone" label="Telefoonnummer" hint="optioneel" type="tel" autoComplete="tel" value={s.contact.phone} onChange={(v) => set({ contact: { ...s.contact, phone: v } })} />
                  </div>
                  <Choice label="Hoe wil je het liefst contact?" value={s.contact.preferred} options={[{ key: "email", label: "Per e-mail" }, { key: "telefoon", label: "Telefonisch" }]} onChange={(v) => set({ contact: { ...s.contact, preferred: v as "email" | "telefoon" } })} />
                  <div className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden>
                    <label>Laat dit veld leeg<input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} name="website" /></label>
                  </div>
                  <label className="flex items-start gap-3 rounded-xl border border-ink/10 bg-paper p-4 text-[14px]">
                    <input type="checkbox" checked={s.consent} onChange={(e) => set({ consent: e.target.checked })} className="mt-0.5 h-5 w-5 accent-[#147D52]" />
                    <span>Ik heb de <Link href="/privacy" target="_blank" className="text-excel underline">privacyverklaring</Link> gelezen. ExcelSheets.nl gebruikt mijn gegevens en eventuele bestanden alleen om op deze aanvraag te reageren.</span>
                  </label>
                  {TURNSTILE && <div className="cf-turnstile" data-sitekey={TURNSTILE} data-callback="esTurnstile" data-language="nl" ref={() => { (window as unknown as Record<string, unknown>).esTurnstile = (t: string) => setTurnstileToken(t); }} />}
                  <p className="text-[13px] text-ink-400">Geen account nodig. Je ontvangt een bevestiging met je aanvraagnummer en de samenvatting.</p>
                </div>
              )}

              {errors.length > 0 && (
                <div role="alert" className="mt-6 rounded-xl border border-coral/30 bg-coral-100/60 p-4 text-[14px] text-coral">
                  <ul className="space-y-1">{errors.map((e) => <li key={e} className="flex gap-2"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{e}</li>)}</ul>
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                {step > 0 ? <button type="button" onClick={back} className="btn-ghost"><ArrowLeft className="h-4 w-4" aria-hidden />Vorige</button> : <span />}
                <div className="flex flex-col gap-3 sm:flex-row">
                  {(step === 4 || step === 5 || step === 3) && <button type="button" onClick={() => setStep(step + 1)} className="btn text-ink-500 hover:text-ink">Overslaan</button>}
                  {step < 7 ? (
                    <button type="button" onClick={next} className="btn-dark">{step === 6 ? "Klopt, verder" : "Volgende"}<ArrowRight className="h-4 w-4" aria-hidden /></button>
                  ) : (
                    <button type="button" onClick={submit} disabled={submitting} className="btn-primary text-base">
                      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden />Versturen…</> : <>Verstuur mijn Excel-aanvraag<ArrowRight className="h-4 w-4" aria-hidden /></>}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <aside className="hidden lg:block" aria-label="Jouw aanvraag tot nu toe">
        <div className="sticky top-28"><LiveSheet s={s} uploads={doneUploads.length} step={step} /></div>
      </aside>
    </div>
  );
}

function Progress({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <nav aria-label="Voortgang">
      <ol className="grid grid-cols-8 gap-1.5">
        {STEPS.map((l, i) => (
          <li key={l}>
            <button type="button" onClick={() => onJump(i)} disabled={i >= step} aria-current={i === step ? "step" : undefined} className="group block w-full text-left disabled:cursor-default">
              <span className={cn("block h-2 rounded-full transition-colors duration-500", i < step ? "bg-excel" : i === step ? "bg-emerald" : "bg-ink/10")} />
              <span className={cn("mt-2 hidden truncate text-[11.5px] md:block", i === step ? "font-semibold text-ink" : i < step ? "text-excel group-hover:underline" : "text-ink-400")}>{l}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[13px] text-ink-500 md:hidden">Stap {step + 1}: {STEPS[step]}</p>
    </nav>
  );
}

function Choice({ label, value, options, onChange }: { label: string; value?: string; options: readonly { key: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="label">{label}</legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.key} type="button" aria-pressed={value === o.key} onClick={() => onChange(o.key)}
            className={cn("min-h-[44px] rounded-xl border px-4 py-2 text-[15px] font-medium transition", value === o.key ? "border-forest bg-forest text-white" : "border-ink/15 bg-white hover:border-emerald")}>
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Multi({ label, values, options, onChange }: { label: string; values: string[]; options: readonly { key: string; label: string }[]; onChange: (v: string[]) => void }) {
  return (
    <fieldset>
      <legend className="label">{label} <span className="font-normal text-ink-400">(meerdere mogelijk)</span></legend>
      <div className="mt-1 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = values.includes(o.key);
          return (
            <button key={o.key} type="button" aria-pressed={on} onClick={() => onChange(on ? values.filter((x) => x !== o.key) : [...values, o.key])}
              className={cn("inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border px-4 py-2 text-[15px] font-medium transition", on ? "border-forest bg-forest text-white" : "border-ink/15 bg-white hover:border-emerald")}>
              {on && <Check className="h-4 w-4" aria-hidden />}{o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({ id, label, hint, value, onChange, type = "text", autoComplete, required }: { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; type?: string; autoComplete?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label} {hint && <span className="font-normal text-ink-400">({hint})</span>}</label>
      <input id={id} type={type} autoComplete={autoComplete} required={required} aria-required={required} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  );
}

function Dropzone({ onFiles }: { onFiles: (f: File[]) => void }) {
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  return (
    <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFiles(Array.from(e.dataTransfer.files)); }}
      className={cn("relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition", over ? "border-emerald bg-mint-50" : "border-ink/15 bg-paper")}>
      <div className="relative mb-4 grid grid-cols-3 gap-1" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => <span key={i} className={cn("h-3 w-5 rounded-sm transition", over ? "bg-emerald" : i % 4 === 0 ? "bg-excel/60" : "bg-ink/10")} />)}
        <UploadCloud className="absolute -right-8 -top-3 h-7 w-7 text-excel" />
      </div>
      <p className="font-display text-lg font-bold">Sleep je Excel-bestanden hierheen</p>
      <p className="mt-1 text-[14px] text-ink-500">.xlsx, .xlsm, .xls, .xlsb of .csv · maximaal {MAX_MB} MB per bestand · tot 5 bestanden</p>
      <button type="button" onClick={() => input.current?.click()} className="btn-ghost mt-5 bg-white">Kies bestanden</button>
      <input ref={input} type="file" multiple accept={ACCEPT} className="sr-only" aria-label="Kies Excel-bestanden om te uploaden" onChange={(e) => { onFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} />
    </div>
  );
}

function GoalIllustration({ i, active }: { i: number; active: boolean }) {
  const c = active ? "#18B979" : "#147D52";
  const shapes: ReactNode[] = [
    <><rect x="4" y="4" width="40" height="40" rx="8" fill="#E6FBEF" /><path d="M24 14v20M14 24h20" stroke={c} strokeWidth="3.5" strokeLinecap="round" /></>,
    <><rect x="4" y="4" width="40" height="40" rx="8" fill="#E6FBEF" /><path d="M12 32l8-8 6 6 10-12" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="36" cy="18" r="3" fill={c} /></>,
    <><rect x="4" y="4" width="40" height="40" rx="8" fill="#E6FBEF" />{[10, 18, 26, 34].map((x, k) => <rect key={x} x={x} y={34 - (k + 1) * 5} width="5" height={(k + 1) * 5} rx="1" fill={c} />)}</>,
    <><rect x="4" y="4" width="40" height="40" rx="8" fill="#E6FBEF" /><text x="24" y="31" textAnchor="middle" fontSize="18" fontFamily="monospace" fill={c} fontWeight="700">fx</text></>,
  ];
  return <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0 transition group-hover:scale-105" aria-hidden>{shapes[i]}</svg>;
}

/** Signature-element: de aanvraag bouwt zich op als werkblad terwijl je de stappen doorloopt. */
function LiveSheet({ s, uploads, step }: { s: State; uploads: number; step: number }) {
  const rows: [string, string | undefined][] = [
    ["Doel", labelOf(GOALS, s.goal)],
    ["Onderwerp", s.categories.map((c) => labelOf(CATEGORIES, c)).join(", ") || undefined],
    ["Verhaal", s.story ? s.story.slice(0, 60) + (s.story.length > 60 ? "…" : "") : undefined],
    ["Gebruikers", labelOf(USERS, s.situation.users)],
    ["Frequentie", labelOf(FREQUENCY, s.situation.frequency)],
    ["Bestanden", uploads ? `${uploads} bestand(en)` : undefined],
    ["Start", labelOf(URGENCY, s.urgency)],
    ["Samenvatting", step >= 6 ? "✓ opgesteld" : undefined],
  ];
  const filled = rows.filter((r) => r[1]).length;
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <div className="flex items-center justify-between bg-forest px-4 py-2.5 font-mono text-[11px] text-mint"><span>Mijn_aanvraag.xlsx</span><span>{filled}/{rows.length}</span></div>
      <div className="grid grid-cols-[28px_96px_1fr] text-[12px]">
        <span className="border-b border-r border-ink/10 bg-paper-200" /><span className="border-b border-r border-ink/10 bg-paper-200 py-1 text-center font-mono text-[10px] text-ink-400">A</span><span className="border-b border-ink/10 bg-paper-200 py-1 text-center font-mono text-[10px] text-ink-400">B</span>
        {rows.map(([k, v], i) => (
          <div key={k} className="contents">
            <span className="flex items-center justify-center border-b border-r border-ink/10 bg-paper-200 font-mono text-[10px] text-ink-400">{i + 1}</span>
            <span className="border-b border-r border-ink/10 px-2 py-2 font-medium text-ink-500">{k}</span>
            <motion.span key={v ?? "leeg"} initial={{ backgroundColor: "#CBF8E0" }} animate={{ backgroundColor: v ? "#F2FDF7" : "#FFFFFF" }} transition={{ duration: 1.2 }} className="truncate border-b border-ink/10 px-2 py-2 text-ink">{v ?? <span className="text-ink-300">—</span>}</motion.span>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="h-2 overflow-hidden rounded-full bg-ink/10"><motion.div className="h-full bg-emerald" animate={{ width: `${(filled / rows.length) * 100}%` }} /></div>
        <p className="mt-3 text-[12.5px] leading-relaxed text-ink-500">Je antwoorden worden pas verstuurd bij de laatste stap. Tot die tijd blijven ze alleen in deze browser.</p>
      </div>
    </div>
  );
}
