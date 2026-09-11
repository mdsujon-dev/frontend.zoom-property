import "server-only";

import { homeVideos as fallback, type VideoItem } from "@/data/videos";

import { baseApi, CACHE_TAGS, createResource, type ApiMeta } from "../../base-api";
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

export async function getVideosPage(page = 1, limit = 6) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, Math.min(limit, 24));
  const result = await baseApi.list<ApiShowcaseVideo>(
    "showcase-videos/public",
    { page: safePage, limit: safeLimit, sort: "order" },
    { tags: [CACHE_TAGS.videos] },
  );

  if (result) {
    return {
      videos: result.rows.map(toVideoItem),
      meta: result.meta ?? {
        page: safePage,
        limit: safeLimit,
        total: result.rows.length,
        totalPage: 1,
      },
    };
  }

  const start = (safePage - 1) * safeLimit;
  const videos = fallback.slice(start, start + safeLimit);
  const total = fallback.length;
  const meta: ApiMeta = {
    page: safePage,
    limit: safeLimit,
    total,
    totalPage: Math.max(1, Math.ceil(total / safeLimit)),
  };
  return { videos, meta };
}
