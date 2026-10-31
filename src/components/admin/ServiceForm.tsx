"use client";
import { useActionState } from "react";
import { saveService } from "@/app/admin/(panel)/diensten/actions";
import { Field } from "./ui";

export function ServiceForm({ slug, v }: { slug: string; v: Record<string, string | number | boolean> }) {
  const [state, action, pending] = useActionState(saveService.bind(null, slug), undefined);
  const s = (k: string) => String(v[k] ?? "");
  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <Field label="H1" name="h1" defaultValue={s("h1")} required />
        <Field label="Intro" name="lead" rows={3} defaultValue={s("lead")} required />
        <Field label="Probleem: kop" name="problemTitle" defaultValue={s("problemTitle")} />
        <Field label="Probleem: tekst" name="problem" rows={4} defaultValue={s("problem")} />
        <Field label="Wat je krijgt" name="deliverables" rows={6} defaultValue={s("deliverables")} hint="per regel: Titel :: tekst" />
        <Field label="Voorbeeld: titel" name="exampleTitle" defaultValue={s("exampleTitle")} />
        <Field label="Voorbeeld: tekst" name="exampleText" rows={3} defaultValue={s("exampleText")} />
        <Field label="Voorbeeld: punten" name="exampleBullets" rows={4} defaultValue={s("exampleBullets")} hint="één per regel" />
        <Field label="Voordelen" name="benefits" rows={5} defaultValue={s("benefits")} hint="per regel: Titel :: tekst" />
        <Field label="Aanpak" name="approach" rows={5} defaultValue={s("approach")} hint="per regel: Titel :: tekst" />
        <Field label="Veelgestelde vragen" name="faq" rows={6} defaultValue={s("faq")} hint="per regel: Vraag :: antwoord" />
      </div>
      <div className="space-y-5">
        <div className="card space-y-4 p-5">
          <label className="flex items-center gap-2 text-[14px] font-semibold"><input type="checkbox" name="published" defaultChecked={!!v.published} className="h-4 w-4 accent-[#147D52]" />Online</label>
          <Field label="Volgorde" name="sortOrder" type="number" defaultValue={s("sortOrder")} />
          {state?.error && <p role="alert" className="rounded-lg bg-coral-100 px-3 py-2 text-[13px] text-coral">{state.error}</p>}
          {state?.ok && <p role="status" className="rounded-lg bg-mint-50 px-3 py-2 text-[13px] text-forest">✓ Opgeslagen</p>}
          <button disabled={pending} className="btn-primary w-full">{pending ? "Opslaan…" : "Opslaan"}</button>
        </div>
        <div className="card space-y-4 p-5">
          <Field label="Titel" name="title" defaultValue={s("title")} />
          <Field label="Menunaam" name="navTitle" defaultValue={s("navTitle")} />
          <Field label="SEO-titel" name="seoTitle" defaultValue={s("seoTitle")} />
          <Field label="Metabeschrijving" name="metaDescription" rows={3} defaultValue={s("metaDescription")} />
          <Field label="Interactief model" name="visual" defaultValue={s("visual")} hint="slug van voorbeeld" />
          <Field label="Gerelateerde voorbeelden" name="relatedModels" defaultValue={s("relatedModels")} hint="slugs, komma's" />
        </div>
      </div>
    </form>
  );
}
