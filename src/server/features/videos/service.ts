import "server-only";

import { homeVideos as fallback, type VideoItem } from "@/data/videos";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toVideoItem } from "./mapper";
import type { ApiShowcaseVideo } from "./types";

const videos = createResource<ApiShowcaseVideo, VideoItem>({
  path: "showcase-videos/public",
  tag: CACHE_TAGS.videos,
  map: toVideoItem,
  fallback,
  sort: "order",
});

/** The films picked for the home carousel. */
export async function getHomeVideos(limit = 8): Promise<VideoItem[]> {
  const picked = await videos.query({ isHome: true, limit });
  if (picked) return picked;
  return videos.list({ limit });
}

/** Every published film, for anywhere else that shows the reel. */
export const getVideos = (limit = 24) => videos.list({ limit });
