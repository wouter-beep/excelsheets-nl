import { articles2017 } from "./2017";
import { articles2018 } from "./2018";
import { articles2019 } from "./2019";
import { articles2020 } from "./2020";
import { articles2021 } from "./2021";
import { articles2022 } from "./2022";
import { articles2023 } from "./2023";
import { articles2024 } from "./2024";
import { articles2025 } from "./2025";
import { articles2026 } from "./2026";
import { EXTRAS } from "./extras";
import type { ArticleContent } from "./types";

/** Voegt de verdiepingsparagraaf in vóór de laatste ##-kop (meestal "Terugblik"). */
function withExtra(a: ArticleContent): ArticleContent {
  const x = EXTRAS[a.number];
  if (!x) return a;
  const block = `## ${x.heading}\n\n${x.text}`;
  const idx = a.body.lastIndexOf("\n## ");
  const body = idx === -1 ? `${a.body}\n\n${block}` : `${a.body.slice(0, idx)}\n\n${block}\n${a.body.slice(idx)}`;
  return { ...a, body };
}

export const allArticles: ArticleContent[] = [
  ...articles2017, ...articles2018, ...articles2019, ...articles2020, ...articles2021,
  ...articles2022, ...articles2023, ...articles2024, ...articles2025, ...articles2026,
].map(withExtra).sort((a, b) => a.number - b.number);
export * from "./types";
