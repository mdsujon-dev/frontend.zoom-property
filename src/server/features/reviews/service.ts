import "server-only";

import { reviews as fallback, type Review } from "@/data/people";

import { baseApi, CACHE_TAGS, createResource } from "../../base-api";
import { toReview } from "./mapper";
import type { ApiReview } from "./types";

const reviews = createResource<ApiReview, Review>({
  path: "reviews/public",
  tag: CACHE_TAGS.reviews,
  map: toReview,
  fallback,
  sort: "order",
});

/**
 * The reviews the home page shows.
 *
 * Whatever the desk ticked, then whatever it starred, then simply the newest.
 * Three steps rather than one because the block must never be empty: an
 * untouched database still has something to show, and the desk’s choice wins
 * the moment it makes one.
 */
export async function getHomeReviews(limit = 6): Promise<Review[]> {
  const picked = await reviews.query({ isHome: true, limit });
  if (picked?.length) return picked;

  const featured = await reviews.query({ featured: true, limit });
  if (featured?.length) return featured;

  return reviews.list({ limit });
}

/** Every published review, for `/reviews`. */
export const getReviews = (limit = 60) => reviews.list({ limit });

/**
 * The filmed ones, for the home carousel.
 *
 * A written review is not dropped from the site; it is on `/reviews` in full.
 * It is dropped from *this* shelf, which is a row of players, and a player
 * with nothing behind it is a black tile.
 *
 * The narrowing happens before the desk’s picks are applied, not after.
 * Filtering a home-page selection down to its films can leave nothing at all
 * — tick three written reviews and the strip would vanish — whereas choosing
 * among the films always has something to choose from.
 */
export async function getVideoReviews(limit = 12): Promise<Review[]> {
  const all = await getReviews(60);
  const filmed = all.filter((r) => r.video?.youtubeUrl);
  if (!filmed.length) return [];

  const picked = filmed.filter((r) => r.isHome);
  if (picked.length) return picked.slice(0, limit);

  const featured = filmed.filter((r) => r.featured);
  if (featured.length) return featured.slice(0, limit);

  return filmed.slice(0, limit);
}

const PATH = "reviews/public";

export interface ReviewPage {
  reviews: Review[];
  total: number;
  totalPages: number;
  page: number;
  /** 1-based index of the first review on this page, for "Showing 9–16 of 40". */
  from: number;
  /** Averaged over the whole set, not this page — a rating is about the firm. */
  average: number;
}

const EMPTY: ReviewPage = {
  reviews: [],
  total: 0,
  totalPages: 0,
  page: 1,
  from: 0,
  average: 0,
};

/**
 * One page of `/reviews`, plus the headline average.
 *
 * The average is asked for separately and over the whole published set,
 * because the figure at the top of the page is the firm’s rating — computing
 * it from the sixteen quotes that happen to be on page two would make the
 * number move as you paged, which is worse than not showing it.
 */
export async function getReviewPage(
  page = 1,
  perPage = 12,
): Promise<ReviewPage> {
  const [pageResult, all] = await Promise.all([
    baseApi.list<ApiReview>(
      PATH,
      { page, limit: perPage, sort: "order" },
      { tags: [CACHE_TAGS.reviews] },
    ),
    reviews.list({ limit: 200 }),
  ]);

  const rated = (all ?? []).filter((r) => r.rating > 0);
  const average = rated.length
    ? rated.reduce((sum, r) => sum + r.rating, 0) / rated.length
    : 0;

  // No API, or nothing published: fall back to whatever `list()` gave us
  // rather than rendering an empty page with a heading over it.
  if (!pageResult) {
    if (!all?.length) return EMPTY;
    const totalPages = Math.max(1, Math.ceil(all.length / perPage));
    const current = Math.min(Math.max(1, page), totalPages);
    return {
      reviews: all.slice((current - 1) * perPage, current * perPage),
      total: all.length,
      totalPages,
      page: current,
      from: (current - 1) * perPage + 1,
      average,
    };
  }

  const total = pageResult.meta?.total ?? pageResult.rows.length;
  const totalPages = Math.max(1, pageResult.meta?.totalPage ?? 1);

  // Past the end — an edited URL. Show the last real page.
  if (!pageResult.rows.length && total > 0 && page > totalPages) {
    const last = await baseApi.list<ApiReview>(
      PATH,
      { page: totalPages, limit: perPage, sort: "order" },
      { tags: [CACHE_TAGS.reviews] },
    );
    if (!last) return EMPTY;
    return {
      reviews: last.rows.map(toReview),
      total,
      totalPages,
      page: totalPages,
      from: (totalPages - 1) * perPage + 1,
      average,
    };
  }

  if (!pageResult.rows.length) return EMPTY;

  const current = Math.min(Math.max(1, page), totalPages);
  return {
    reviews: pageResult.rows.map(toReview),
    total,
    totalPages,
    page: current,
    from: (current - 1) * perPage + 1,
    average,
  };
}
