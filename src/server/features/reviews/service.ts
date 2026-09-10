import "server-only";

import { reviews as fallback, type Review } from "@/data/people";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toReview } from "./mapper";
import type { ApiReview } from "./types";

const reviews = createResource<ApiReview, Review>({
  path: "reviews/public",
  tag: CACHE_TAGS.reviews,
  map: toReview,
  fallback,
  sort: "order",
});

/** The reviews the home page shows: the featured ones, else any published. */
export async function getHomeReviews(limit = 6): Promise<Review[]> {
  const featured = await reviews.query({ featured: true, limit });
  if (featured) return featured;
  return reviews.list({ limit });
}

/** Every published review, for `/reviews`. */
export const getReviews = (limit = 60) => reviews.list({ limit });

/** Just the filmed ones, for the video carousel. */
export async function getVideoReviews(limit = 12): Promise<Review[]> {
  const all = await getReviews(limit);
  return all.filter((r) => r.video?.youtubeUrl);
}
