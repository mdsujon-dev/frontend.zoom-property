import "server-only";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toBlock } from "./mapper";
import type { ApiLandownerBlock, LandownerBlock } from "./types";

/**
 * The blocks on the landowners page.
 *
 * No built-in fallback: unlike a listing or an area, there is no demo version
 * of this copy worth showing. When nothing is published the section takes
 * itself off the page, which is why `getLandownerBlocks` can return empty.
 */
const blocks = createResource<ApiLandownerBlock, LandownerBlock>({
  path: "landowner-projects/public",
  tag: CACHE_TAGS.landowners,
  map: toBlock,
  fallback: [],
  sort: "order",
});

export async function getLandownerBlocks(limit = 12): Promise<LandownerBlock[]> {
  return (await blocks.query({ limit })) ?? [];
}
