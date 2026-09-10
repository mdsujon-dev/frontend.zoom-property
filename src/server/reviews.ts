import "server-only";

import { reviews as fallback, type Review } from "@/data/people";
import { apiList } from "@/lib/api";

import { mediaUrl, type ApiMedia } from "./shared";

/**
 * Client reviews, from the panel.
 *
 * `/reviews/public` answers only for reviews somebody published — a review
 * goes up because the desk decided it should, not because it was typed in.
 *
 * The quote is always carried as text even when there is a film of it: the
 * card shows the words before anyone presses play, and they are the only
 * version a crawler or a muted visitor ever reads.
 */

/** A review as `/reviews/public` returns it. */
interface ApiReview {
  _id: string;
  clientName: string;
  clientNameBn?: string;
  role?: string;
  roleBn?: string;
  quote: string;
  quoteBn?: string;
  rating?: number;
  photo?: ApiMedia;
  property?: { title?: string } | null;
  propertyLabel?: string;
  video?: {
    youtubeUrl?: string;
    poster?: ApiMedia;
    duration?: string;
  } | null;
}

const toReview = (r: ApiReview): Review => {
  const image = mediaUrl(r.photo);
  const youtubeUrl = r.video?.youtubeUrl || "";

  return {
    id: r._id,
    quote: r.quote,
    name: r.clientName,
    role: r.role || "",
    // The label the desk typed wins over the linked listing's own title: it is
    // written for the quote ("3-bed in Gulshan 2"), not for a search result.
    property: r.propertyLabel || r.property?.title || "",
    rating: r.rating ?? 5,
    image,
    // Only a review with a film gets the video block, so the card can tell the
    // difference between "no recording" and "a recording that will not play".
    ...(youtubeUrl
      ? {
          video: {
            youtubeUrl,
            poster: mediaUrl(r.video?.poster) || image,
            duration: r.video?.duration || "",
          },
        }
      : {}),
  };
};

/** The reviews the home page shows. */
export async function getHomeReviews(limit = 6): Promise<Review[]> {
  const res = await apiList<ApiReview>("reviews/public", {
    featured: true,
    limit,
    sort: "order",
  });
  if (res?.rows.length) return res.rows.map(toReview);

  const any = await apiList<ApiReview>("reviews/public", { limit, sort: "order" });
  if (!any?.rows.length) return fallback.slice(0, limit);
  return any.rows.map(toReview);
}

/** Every published review, for `/reviews`. */
export async function getReviews(limit = 60): Promise<Review[]> {
  const res = await apiList<ApiReview>("reviews/public", { limit, sort: "order" });
  if (!res?.rows.length) return fallback;
  return res.rows.map(toReview);
}

/** Just the filmed ones, for the video carousel. */
export async function getVideoReviews(limit = 12): Promise<Review[]> {
  const all = await getReviews(limit);
  return all.filter((r) => r.video?.youtubeUrl);
}
