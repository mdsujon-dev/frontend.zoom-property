import "server-only";

import type { ApiMedia } from "../../base-api";

/** A review as `/reviews/public` returns it. */
export interface ApiReview {
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
  video?: { youtubeUrl?: string; poster?: ApiMedia; duration?: string } | null;
}
