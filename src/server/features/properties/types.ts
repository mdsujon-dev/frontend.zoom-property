import "server-only";

import type { ApiMedia } from "../../base-api";
import type { ApiAgent } from "../projects/types";

/** A listing as `/properties/public` returns it. */
export interface ApiProperty {
  _id: string;
  slug: string;
  referenceNo?: string;
  title: string;
  titleBn?: string;
  area?: { name?: string; nameBn?: string } | null;
  city?: string;
  purpose?: string;
  status?: string;
  type?: string;
  price?: number;
  beds?: number;
  baths?: number;
  size?: number;
  katha?: number;
  floor?: string;
  coverImage?: ApiMedia;
  images?: ApiMedia[];
  badge?: string;
  rajukApproved?: boolean;
  hasVirtualTour?: boolean;
  mapUrl?: string;
  furnishing?: string;
  handover?: string;
  agent?: ApiAgent | null;
  amenities?: { name?: string }[];
  description?: string[];
  descriptionBn?: string[];
}
