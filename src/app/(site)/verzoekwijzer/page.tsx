import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Verzoekwijzer } from "@/components/wizard/Verzoekwijzer";

export const metadata: Metadata = {
  title: "De Excel Verzoekwijzer: vraag een Excel-oplossing op maat aan",
  description: "Beschrijf in een paar stappen wat je zoekt. Je ziet direct hoe wij jouw vraagstuk begrijpen en ontvangt een samenvatting met aanvraagnummer. Geen account nodig.",
  alternates: { canonical: "/verzoekwijzer" },
};

export default function Page() {
  return (
    <section className="relative pb-24 pt-8 md:pt-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-grid mask-fade-b" aria-hidden />
      <div className="container relative">
        <Breadcrumbs items={[{ href: "/verzoekwijzer", label: "Verzoekwijzer" }]} />
        <p className="eyebrow">De Excel Verzoekwijzer</p>
        <h1 className="h-display mt-3 max-w-3xl text-3xl md:text-5xl">Vertel ons wat Excel voor jou moet doen.</h1>
        <p className="lead mt-4 max-w-2xl">Acht korte stappen, ongeveer vijf minuten. Je hoeft geen vaktermen te kennen: aan het eind zie je hoe wij jouw vraagstuk begrijpen, en dat kun je nog aanpassen.</p>
        <div className="mt-10">
          <Suspense fallback={<div className="card h-96 animate-pulse" />}><Verzoekwijzer /></Suspense>
        </div>
      </div>
    </section>
  );
}
