import "server-only";

import type { ApiMedia } from "../../base-api";

/** A block as `/landowner-projects/public` returns it. */
export interface ApiLandownerBlock {
  _id: string;
  title: string;
  titleBn?: string;
  /** HTML from the panel's editor. */
  description?: string;
  descriptionBn?: string;
  image?: ApiMedia;
}

/** What the landowners page renders: a picture, a heading, a passage. */
export interface LandownerBlock {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  image: string;
}
