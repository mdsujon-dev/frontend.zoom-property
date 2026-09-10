import "server-only";

/**
 * The site's server-side data layer.
 *
 * One file per thing the panel manages, each owning three concerns and no
 * more: the shape the API returns, the mapping from that shape to the type the
 * components already consume, and the fallback when the API cannot be reached.
 *
 *   areas.ts       neighbourhoods
 *   projects.ts    developments
 *   properties.ts  listings
 *   reviews.ts     client reviews
 *   insights.ts    blog posts
 *   cms.ts         copy edited in the panel, laid over the dictionary
 *   shared.ts      the media and paragraph helpers they all need
 *
 * Two rules hold across all of them. A page component never sees an API shape
 * — it receives `Area`, `Project`, `Property`, `Review`, `Insight` exactly as
 * `src/data` defines them, so a card need not know whether its photograph
 * arrived as an object key or a URL. And nothing here throws: when the API is
 * unreachable the built-in demo data is returned, because a stale home page is
 * better than an empty one.
 *
 * Import from the entity file directly (`@/server/projects`) in a page that
 * needs one thing; this barrel is for the few that need several.
 */

export { getAreaBySlug, getAreas, getHomeAreas } from "./areas";
export { applyCmsOverrides } from "./cms";
export {
  getHomeInsights,
  getInsightBySlug,
  getInsights,
  getInsightsByCategory,
} from "./insights";
export { getHomeProjects, getProjectBySlug, getProjects } from "./projects";
export {
  getHomeProperties,
  getProperties,
  getPropertyBySlug,
} from "./properties";
export { getHomeReviews, getReviews, getVideoReviews } from "./reviews";
export type { ApiListMeta, ApiMedia } from "./shared";
