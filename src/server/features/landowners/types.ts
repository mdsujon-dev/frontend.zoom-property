import "server-only";

import type { ApiMedia } from "../../base-api";

/** A case study as `/landowner-projects/public` returns it. */
export interface ApiLandownerProject {
  _id: string;
  name: string;
  nameBn?: string;
  location?: string;
  locationBn?: string;
  landSizeKatha?: number;
  floors?: number;
  ownerSharePercent?: number;
  completedYear?: number;
  image?: ApiMedia;
}
