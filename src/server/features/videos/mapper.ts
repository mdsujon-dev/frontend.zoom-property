import "server-only";

import type { VideoItem } from "@/data/videos";

import { mediaUrl } from "../../base-api";
import type { ApiShowcaseVideo } from "./types";

/**
 * An API film to the `VideoItem` the carousel consumes.
 *
 * Each Bangla field falls back to its English one rather than to an empty
 * string: a card with a blank title in one language is worse than the same
 * card in both.
 */
export const toVideoItem = (v: ApiShowcaseVideo): VideoItem => ({
  id: v._id,
  title: v.title,
  titleBn: v.titleBn || v.title,
  description: v.description || "",
  descriptionBn: v.descriptionBn || v.description || "",
  youtubeUrl: v.youtubeUrl,
  poster: mediaUrl(v.poster),
  duration: v.duration || "",
  category: v.category || "",
  categoryBn: v.categoryBn || v.category || "",
  location: v.location || "",
  locationBn: v.locationBn || v.location || "",
  views: v.views,
  channelName: v.channelName || "",
});
