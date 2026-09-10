import "server-only";

import { mediaUrl } from "../../base-api";
import type { ApiLandownerBlock, LandownerBlock } from "./types";

/**
 * An API block to the shape the landowners page renders.
 *
 * Each Bangla field falls back to its English one rather than to an empty
 * string: a block with a blank heading in one language is worse than the same
 * block in both.
 */
export const toBlock = (b: ApiLandownerBlock): LandownerBlock => ({
  id: b._id,
  title: b.title,
  titleBn: b.titleBn || b.title,
  description: b.description || "",
  descriptionBn: b.descriptionBn || b.description || "",
  image: mediaUrl(b.image),
});
