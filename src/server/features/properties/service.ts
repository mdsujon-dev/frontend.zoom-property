import "server-only";

import { properties as fallback, type Property } from "@/data/properties";

import { CACHE_TAGS, createResource } from "../../base-api";
import { toProperty } from "./mapper";
import type { ApiProperty } from "./types";

const properties = createResource<ApiProperty, Property>({
  path: "properties/public",
  tag: CACHE_TAGS.properties,
  map: toProperty,
  fallback,
  slugOf: (p) => p.slug,
});

/**
 * Listings for the home page.
 *
 * The ticked ones if there are any, the newest otherwise - a home page with an
 * empty listings strip is worse than one showing whatever is on the market.
 */
export async function getHomeProperties(limit = 6): Promise<Property[]> {
  const picked = await properties.query({ isHome: true, limit });
  if (picked) return picked;
  return properties.list({ limit });
}

/** Every listing on the market, for `/properties`. */
export const getProperties = (limit = 60) => properties.list({ limit });

/**
 * One listing by its slug, or `null` when there is none.
 *
 * This is the read that counts a view, so it must not be called to test
 * whether a listing exists.
 */
export const getPropertyBySlug = (slug: string) => properties.bySlug(slug);

export async function getPropertyTypes() {
  const { baseApi } = await import("../../base-api");
  const res = await baseApi("properties/options/types?activeOnly=true", {
    next: { tags: [CACHE_TAGS.properties] },
  });
  if (!res.ok) return [];
  const body = await res.json();
  return body.data || [];
}
