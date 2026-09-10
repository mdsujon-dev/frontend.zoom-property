import "server-only";

import type { BlogCategory, Insight } from "@/data/insights";

import { isoDate, mediaUrl } from "../../base-api";
import type { ApiPost } from "./types";

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

/** An API post to the `Insight` the cards consume. */
export const toInsight = (p: ApiPost): Insight => ({
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
