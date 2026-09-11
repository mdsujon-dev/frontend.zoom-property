import "server-only";

import type { ApiMedia } from "../../base-api";

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
  furnishing?: string;
  handover?: string;
  agent?: { _id?: string } | null;
  amenities?: { name?: string }[];
  description?: string[];
  descriptionBn?: string[];
}
