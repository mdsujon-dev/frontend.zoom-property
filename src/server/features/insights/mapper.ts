import "server-only";

import type { BlogCategory, Insight } from "@/data/insights";

import { isoDate, mediaUrl } from "../../base-api";
import type { ApiPost } from "./types";

const categoryOf = (value: ApiPost["category"]): string => {
  const name = typeof value === "string" ? value : value?.name;
  return name || "All";
};

const categoriesOf = (values: ApiPost["categories"]): string[] => {
  if (!Array.isArray(values)) return [];
  return values.map(v => typeof v === "string" ? v : v?.name).filter(Boolean) as string[];
};

/** An API post to the `Insight` the cards consume. */
export const toInsight = (p: ApiPost): Insight => {
  const cats = categoriesOf(p.categories);
  const primaryCat = cats.length > 0 ? cats[0] : categoryOf(p.category);
  const allCats = cats.length > 0 ? cats : [primaryCat];

  return {
  id: p.slug || p._id,
  title: p.title,
  titleBn: p.titleBn || p.title,
  excerpt: p.excerpt || "",
  excerptBn: p.excerptBn || p.excerpt || "",
  category: primaryCat,
  categories: allCats,
  readMinutes: p.readMinutes ?? 1,
  date: isoDate(p.publishedAt),
  // The card wants the close crop; it falls back to the banner when the
  // desk has not uploaded one.
  image: mediaUrl(p.thumbnail) || mediaUrl(p.coverImage),
  coverImage: mediaUrl(p.coverImage) || mediaUrl(p.thumbnail),
  author: {
    name: p.author?.name || "",
    nameBn: p.author?.nameBn || p.author?.name || "",
    role: p.author?.role || "",
    roleBn: p.author?.roleBn || p.author?.role || "",
    // A deliberate pick wins; otherwise the writer's own photograph.
    avatar: mediaUrl(p.author?.avatar) || p.author?.avatarUrl || "",
  },
  featured: p.featured,
  trending: p.trending,
  };
};
