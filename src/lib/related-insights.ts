import type { Insight } from "@/data/insights";

/**
 * The "keep reading" set under an article.
 *
 * Ranked rather than random, so the row is actually related: same category
 * first, then anything else by the same author, then the newest of the rest.
 * Each tier is sorted newest-first, and the current article is never in it.
 *
 * Deterministic on purpose — the page is prerendered, so a random pick would
 * freeze at build time anyway and only look random.
 */
export function relatedInsights(
  current: Insight,
  all: Insight[],
  count = 6,
): Insight[] {
  const byNewest = (a: Insight, b: Insight) => b.date.localeCompare(a.date);
  const pool = all.filter((insight) => insight.id !== current.id);

  const sameCategory = pool
    .filter((insight) => insight.category === current.category)
    .sort(byNewest);

  const sameAuthor = pool
    .filter(
      (insight) =>
        insight.author.name === current.author.name &&
        insight.category !== current.category,
    )
    .sort(byNewest);

  const rest = pool
    .filter(
      (insight) =>
        insight.category !== current.category &&
        insight.author.name !== current.author.name,
    )
    .sort(byNewest);

  return [...sameCategory, ...sameAuthor, ...rest].slice(0, count);
}
