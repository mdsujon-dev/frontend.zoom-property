import "server-only";

import type { LandmarkJVProject } from "@/data/landowner";

import { mediaUrl } from "../../base-api";
import type { ApiLandownerProject } from "./types";

/** An API case study to the shape the landowners table consumes. */
export const toJVProject = (p: ApiLandownerProject): LandmarkJVProject => ({
  name: p.name,
  location: p.location || "",
  landSizeKatha: p.landSizeKatha ?? 0,
  floors: p.floors ?? 0,
  ownerSharePercent: p.ownerSharePercent ?? 0,
  completedYear: p.completedYear ?? 0,
  image: mediaUrl(p.image),
});
