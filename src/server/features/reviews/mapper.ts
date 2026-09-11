import "server-only";

import type { Review } from "@/data/people";

import { mediaUrl } from "../../base-api";
import type { ApiReview } from "./types";

/**
 * An API review to the `Review` the cards consume.
 *
 * The quote is always carried as text even when there is a film of it: the
 * card shows the words before anyone presses play, and they are the only
 * version a crawler or a muted visitor ever reads.
 */
export const toReview = (r: ApiReview): Review => {
  const youtubeUrl = r.video?.youtubeUrl || "";

  // A filmed review is not asked for a portrait — the still it already has is
  // a picture of the person talking. Falling back here is what lets the
  // written grid on /reviews show a filmed one without an empty frame.
  const image = mediaUrl(r.photo) || mediaUrl(r.video?.poster);

  return {
    id: r._id,
    quote: r.quote,
    // Carried through so the home strip can prefer what the desk ticked
    // *after* it has narrowed the set to films — see `getVideoReviews`.
    isHome: r.isHome === true,
    featured: r.featured === true,
    name: r.clientName,
    role: r.role || "",
    // The label the desk typed wins over the linked listing's own title: it is
    // written for the quote ("3-bed in Gulshan 2"), not for a search result.
    property: r.propertyLabel || r.property?.title || "",
    rating: r.rating ?? 5,
    image,
    // Only a review with a film gets the video block, so a card can tell
    // "no recording" apart from "a recording that will not play".
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
