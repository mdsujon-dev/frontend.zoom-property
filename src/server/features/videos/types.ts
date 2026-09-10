import "server-only";

import type { ApiMedia } from "../../base-api";

/** A film as `/showcase-videos/public` returns it. */
export interface ApiShowcaseVideo {
  _id: string;
  title: string;
  titleBn?: string;
  description?: string;
  descriptionBn?: string;
  youtubeUrl: string;
  poster?: ApiMedia;
  duration?: string;
  category?: string;
  categoryBn?: string;
  location?: string;
  locationBn?: string;
  views?: string;
  channelName?: string;
}
