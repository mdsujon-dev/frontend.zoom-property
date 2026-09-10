import "server-only";

import {
  insights as fallback,
  type BlogCategory,
  type Insight,
} from "@/data/insights";
import { apiGet, apiList } from "@/lib/api";

import { isoDate, mediaUrl, type ApiMedia } from "./shared";

/**
 * Blog posts, from the panel.
 *
 * The index endpoint omits the body — a list of twenty articles has no use for
 * twenty full posts — so `getInsights` returns cards and `getInsightBySlug` is
 * what fetches the writing.
 */

/** A post as `/blog/public` returns it. */
interface ApiPost {
  _id: string;
  slug: string;
  title: string;
  titleBn?: string;
  excerpt?: string;
  excerptBn?: string;
  content?: string;
  contentBn?: string;
  category?: { name?: string } | string | null;
  tags?: string[];
  coverImage?: ApiMedia;
  author?: {
    name?: string;
    nameBn?: string;
    role?: string;
    roleBn?: string;
    avatar?: ApiMedia;
  } | null;
  readMinutes?: number;
  publishedAt?: string;
  featured?: boolean;
  trending?: boolean;
}

/** The categories the site's filters know. Anything else reads as "All". */
const KNOWN: BlogCategory[] = [
  "Real Estate",
  "Architecture",
  "Economy",
  "Legal",
  "Technology",
  "Lifestyle",
  "Market",
  "Guide",
  "NRB",
];

const categoryOf = (value: ApiPost["category"]): BlogCategory => {
  const name = typeof value === "string" ? value : value?.name;
  const match = KNOWN.find((c) => c.toLowerCase() === (name ?? "").toLowerCase());
  return match ?? "All";
};

const toInsight = (p: ApiPost): Insight => ({
  id: p.slug || p._id,
  title: p.title,
  titleBn: p.titleBn || p.title,
  excerpt: p.excerpt || "",
  excerptBn: p.excerptBn || p.excerpt || "",
  category: categoryOf(p.category),
  readMinutes: p.readMinutes ?? 1,
  date: isoDate(p.publishedAt),
  image: mediaUrl(p.coverImage),
  author: {
    name: p.author?.name || "",
    nameBn: p.author?.nameBn || p.author?.name || "",
    role: p.author?.role || "",
    roleBn: p.author?.roleBn || p.author?.role || "",
    avatar: mediaUrl(p.author?.avatar),
  },
  featured: p.featured,
  trending: p.trending,
});

/** Published posts, newest first, for the blog index and the home strip. */
export async function getInsights(limit = 24): Promise<Insight[]> {
  const res = await apiList<ApiPost>("blog/public", {
    limit,
    sort: "-publishedAt",
  });
  if (!res?.rows.length) return fallback;
  return res.rows.map(toInsight);
}

/** The few the home page shows. */
export async function getHomeInsights(limit = 3): Promise<Insight[]> {
  const all = await getInsights(limit);
  return all.slice(0, limit);
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
  const res = await apiGet<ApiPost>(`blog/public/${encodeURIComponent(slug)}`);
  if (!res?.data?.slug) {
    const local = fallback.find((p) => p.id === slug);
    return local ? { insight: local, content: "", contentBn: "" } : null;
  }
  return {
    insight: toInsight(res.data),
    content: res.data.content || "",
    contentBn: res.data.contentBn || res.data.content || "",
  };
}
