import "server-only";

import { landmarkJVProjects as fallback, type LandmarkJVProject } from "@/data/landowner";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toJVProject } from "./mapper";
import type { ApiLandownerProject } from "./types";

const projects = createResource<ApiLandownerProject, LandmarkJVProject>({
  path: "landowner-projects/public",
  tag: CACHE_TAGS.landowners,
  map: toJVProject,
  fallback,
  sort: "order",
});

/** The completed joint ventures shown on the landowners page. */
export const getLandownerProjects = (limit = 12) => projects.list({ limit });
