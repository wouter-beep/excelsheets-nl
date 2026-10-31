"use client";
import { useActionState } from "react";
import { saveArticle } from "@/app/admin/(panel)/artikelen/actions";
import { Field } from "./ui";

type V = { title: string; slug: string; number: number; subjectYear: number; status: string; publishedAt: string; summary: string; body: string; practice: string; sources: string; serviceLinks: string; visual: string; seoTitle: string; metaDescription: string; factNote: string; topics: string[] } | null;

export function ArticleForm({ id, v, topics, nextNumber }: { id: string | null; v: V; topics: { id: string; name: string }[]; nextNumber: number }) {
  const [state, action, pending] = useActionState(saveArticle.bind(null, id), undefined);
  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <Field label="Titel" name="title" defaultValue={v?.title} required />
        <Field label="Samenvatting" name="summary" rows={3} defaultValue={v?.summary} required />
        <Field label="Tekst" name="body" rows={22} defaultValue={v?.body} hint="Markdown: ## kop, - opsomming, **vet**, [link](/diensten/...)" required />
        <Field label="Wat betekent dit in de praktijk?" name="practice" rows={5} defaultValue={v?.practice} />
        <Field label="Bronnen" name="sources" rows={4} defaultValue={v?.sources} hint="één per regel: Titel | https://…" />
        <Field label="Controle-opmerking" name="factNote" rows={2} defaultValue={v?.factNote} hint="intern: wat moet nog geverifieerd worden?" />
      </div>
      <div className="space-y-5">
        <div className="card space-y-4 p-5">
          <div><label htmlFor="status" className="label">Status</label><select id="status" name="status" defaultValue={v?.status ?? "DRAFT"} className="input"><option value="DRAFT">Concept</option><option value="REVIEW">Ter controle</option><option value="PUBLISHED">Gepubliceerd</option></select></div>
          <Field label="Publicatiedatum" name="publishedAt" type="date" defaultValue={v?.publishedAt} hint="echte datum" />
          <Field label="Onderwerpjaar" name="subjectYear" type="number" defaultValue={v?.subjectYear ?? 2026} required />
          <Field label="Nummer" name="number" type="number" defaultValue={v?.number ?? nextNumber} required />
          <Field label="URL (slug)" name="slug" defaultValue={v?.slug} required />
          {state?.error && <p role="alert" className="rounded-lg bg-coral-100 px-3 py-2 text-[13px] text-coral">{state.error}</p>}
          {state?.ok && <p role="status" className="rounded-lg bg-mint-50 px-3 py-2 text-[13px] text-forest">✓ Opgeslagen</p>}
          <button disabled={pending} className="btn-primary w-full">{pending ? "Opslaan…" : "Opslaan"}</button>
        </div>
        <div className="card space-y-4 p-5">
          <Field label="SEO-titel" name="seoTitle" defaultValue={v?.seoTitle} hint="max 80" />
          <Field label="Metabeschrijving" name="metaDescription" rows={3} defaultValue={v?.metaDescription} hint="max 170" />
          <Field label="Gekoppelde diensten" name="serviceLinks" defaultValue={v?.serviceLinks} hint="slugs, komma-gescheiden" />
          <Field label="Visual" name="visual" defaultValue={v?.visual ?? "grid"} hint="grid, query, array, ai, python, chart, lookup, collab, shield, text" />
          <fieldset><legend className="label">Thema&apos;s</legend><div className="space-y-1.5">{topics.map((t) => <label key={t.id} className="flex items-center gap-2 text-[14px]"><input type="checkbox" name="topics" value={t.id} defaultChecked={v?.topics.includes(t.id)} className="h-4 w-4 accent-[#147D52]" />{t.name}</label>)}</div></fieldset>
        </div>
      </div>
    </form>
  );
}
