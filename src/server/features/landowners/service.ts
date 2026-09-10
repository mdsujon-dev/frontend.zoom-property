import "server-only";

import { baseApi, CACHE_TAGS, createResource } from "../../base-api";
import { toBlock } from "./mapper";
import type { ApiLandownerBlock, LandownerBlock } from "./types";

const PATH = "landowner-projects/public";

/**
 * The blocks on the landowners page.
 *
 * No built-in fallback: unlike a listing or an area, there is no demo version
 * of this copy worth showing. When nothing is published the section takes
 * itself off the page, which is why these can return empty.
 */
const blocks = createResource<ApiLandownerBlock, LandownerBlock>({
  path: PATH,
  tag: CACHE_TAGS.landowners,
  map: toBlock,
  fallback: [],
  sort: "order",
});

export async function getLandownerBlocks(limit = 100): Promise<LandownerBlock[]> {
  return (await blocks.query({ limit })) ?? [];
}

export interface LandownerBlockPage {
  blocks: LandownerBlock[];
  /** How many are published in total, not how many are on this page. */
  total: number;
  totalPages: number;
  page: number;
  /** 1-based index of the first block on this page, for "showing 5 to 8". */
  from: number;
}

/**
 * One page of blocks.
 *
 * Paged by the API rather than fetched whole and sliced here: the desk can
 * publish as many of these as it likes, and pulling every one of them on every
 * request to show four is work nobody asked for.
 *
 * The page number is clamped rather than 404'd — `?page=99` is a URL somebody
 * edited, not a broken link.
 */
export async function getLandownerBlockPage(
  page = 1,
  perPage = 4,
): Promise<LandownerBlockPage> {
  const empty: LandownerBlockPage = {
    blocks: [],
    total: 0,
    totalPages: 0,
    page: 1,
    from: 0,
  };

  const first = await baseApi.list<ApiLandownerBlock>(
    PATH,
    { page, limit: perPage, sort: "order" },
    { tags: [CACHE_TAGS.landowners] },
  );
  if (!first) return empty;

  const total = first.meta?.total ?? first.rows.length;
  const totalPages = Math.max(1, first.meta?.totalPage ?? 1);

  // Past the end: ask again for the last real page instead of rendering a
  // heading over an empty grid.
  if (!first.rows.length && total > 0 && page > totalPages) {
    const last = await baseApi.list<ApiLandownerBlock>(
      PATH,
      { page: totalPages, limit: perPage, sort: "order" },
      { tags: [CACHE_TAGS.landowners] },
    );
    if (!last) return empty;
    return {
      blocks: last.rows.map(toBlock),
      total,
      totalPages,
      page: totalPages,
      from: (totalPages - 1) * perPage + 1,
    };
  }

  if (!first.rows.length) return empty;

  const current = Math.min(Math.max(1, page), totalPages);
  return {
    blocks: first.rows.map(toBlock),
    total,
    totalPages,
    page: current,
    from: (current - 1) * perPage + 1,
  };
}
