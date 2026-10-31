import { LogoMark } from "@/components/brand/Logo";
import { db } from "@/lib/db";

export async function getTeam() {
  try { return await db.teamMember.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }); } catch { return []; }
}

export function TeamGrid({ team }: { team: Awaited<ReturnType<typeof getTeam>> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m) => (
        <figure key={m.id} className="card overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {m.photoUrl ? <img src={m.photoUrl} alt={`Portret van ${m.name}`} className="aspect-[4/5] w-full object-cover" loading="lazy" /> : <div className="grid aspect-[4/5] place-items-center bg-mint-50"><LogoMark className="h-16 w-16" /></div>}
          <figcaption className="p-5">
            <p className="font-display text-lg font-bold">{m.name}</p><p className="text-sm text-excel">{m.role}</p>
            <p className="mt-2 text-sm text-ink-500">{m.bio}</p>
            {m.linkedin && <a href={m.linkedin} className="mt-3 inline-block text-sm text-excel underline" rel="noopener" target="_blank">LinkedIn</a>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
