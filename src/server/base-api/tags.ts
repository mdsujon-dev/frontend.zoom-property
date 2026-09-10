import "server-only";

/**
 * Cache tags, and the vocabulary the panel uses to invalidate them.
 *
 * Every read is tagged with the feature it belongs to. When the desk saves a
 * project, the API posts that tag to `/api/revalidate` and Next drops exactly
 * the cached responses that mention it — not the whole site, and not one URL
 * at a time.
 *
 * The names are shared with the backend (`revalidateFrontend`), so changing
 * one here means changing it there. That is why they live in a single object
 * rather than being spelled out at each call site.
 */
export const CACHE_TAGS = {
  areas: "zp:areas",
  projects: "zp:projects",
  properties: "zp:properties",
  reviews: "zp:reviews",
  insights: "zp:insights",
  videos: "zp:videos",
  cms: "zp:cms",
} as const;

export type CacheTagName = keyof typeof CACHE_TAGS;

/** Every tag, for a "something changed, refresh everything" ping. */
export const ALL_CACHE_TAGS = Object.values(CACHE_TAGS);

/** Resolves a name the API sent ("projects") to the tag the site cached with. */
export const resolveTag = (name: string): string | undefined =>
  CACHE_TAGS[name as CacheTagName] ??
  (ALL_CACHE_TAGS.includes(name as (typeof ALL_CACHE_TAGS)[number])
    ? name
    : undefined);
