import "server-only";

/**
 * The one client every feature goes through.
 *
 *   client.ts    the transport — the only `fetch` in the site
 *   resource.ts  the factory every feature service is built from
 *   tags.ts      cache tags, shared with the backend's revalidation ping
 *   mappers.ts   media, paragraph and date helpers
 *   types.ts     the envelope, paging, and a populated media document
 *
 * A feature imports from here and nowhere else in this folder.
 */

export { baseApi, buildUrl, REVALIDATE, type RequestOptions } from "./client";
export { gallery, isoDate, mediaUrl, mediaUrls, paragraphs } from "./mappers";
export { createResource, type Resource, type ResourceConfig } from "./resource";
export {
  ALL_CACHE_TAGS,
  CACHE_TAGS,
  resolveTag,
  type CacheTagName,
} from "./tags";
export type { ApiEnvelope, ApiMedia, ApiMeta, QueryParams } from "./types";
