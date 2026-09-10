import "server-only";

import type { ApiMedia } from "../../base-api";

/** An area as `/areas/public` returns it. */
export interface ApiArea {
  _id: string;
  slug?: string;
  name: string;
  nameBn?: string;
  city?: string;
  tagline?: string;
  taglineBn?: string;
  medianPrice?: number;
  pricePerSqft?: number;
  rentalYield?: string;
  image?: ApiMedia;
  note?: string;
  securityTier?: string;
  metroConnectivity?: string;
  /** Live listing count, counted by the API over the whole page in one query. */
  listings?: number;
}
