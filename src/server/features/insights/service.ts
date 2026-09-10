import "server-only";

import {
  insights as fallback,
  type BlogCategory,
  type Insight,
} from "@/data/insights";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toInsight } from "./mapper";
import type { ApiPost } from "./types";

/**
 * Blog posts, from the panel.
 *
 * The index endpoint omits the body - a list of twenty articles has no use for
 * twenty full posts - so `getInsights` returns cards and `getInsightBySlug` is
 * what fetches the writing.
 */
const posts = createResource<ApiPost, Insight>({
  path: "blog/public",
  tag: CACHE_TAGS.insights,
  map: toInsight,
  fallback,
  sort: "-publishedAt",
  slugOf: (p) => p.id,
});

export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const res = await posts.raw<{ _id: string, name: string, nameBn?: string, slug: string }[]>("blog/categories/public");
    return res?.data?.map((c) => c.name as BlogCategory) || [];
  } catch {
    return [];
  }
};

/** Published posts, newest first, for the blog index and the home strip. */
export const getInsights = (limit = 24) => posts.list({ limit });

/**
 * The few the home page shows.
 *
 * The ones the desk ticked "on home page", newest first. Nothing ticked and it
 * falls back to the newest published — a home page with an empty blog strip is
 * worse than one showing whatever was written last.
 */
export async function getHomeInsights(limit = 3): Promise<Insight[]> {
  const picked = await posts.query({ isHome: true, limit });
  if (picked?.length) return picked;
  return posts.list({ limit });
}

/** Posts in one category, for `/blog/category/[category]`. */
export async function getInsightsByCategory(
  category: BlogCategory,
  limit = 24,
): Promise<Insight[]> {
  const all = await getInsights(limit);
  if (category === "All") return all;
  return all.filter((p) => p.category === category);
}

/**
 * One post with its body.
 *
 * Returns the card fields and the HTML separately: the article page needs the
 * writing, everything else on the site only needs the card.
 */
export async function getInsightBySlug(
  slug: string,
): Promise<{ insight: Insight; content: string; contentBn: string } | null> {
  const res = await posts.raw<ApiPost>(
    `blog/public/${encodeURIComponent(slug)}`,
  );
  if (!res?.data?.slug) {
    const local = fallback.find((p) => p.id === slug);
    return local ? { insight: local, content: "", contentBn: "" } : null;
  }
  return {
    insight: posts.map(res.data),
    content: res.data.content || "",
    contentBn: res.data.contentBn || res.data.content || "",
  };
}
