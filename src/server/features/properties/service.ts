import "server-only";

import { properties as fallback, type Property } from "@/data/properties";

import { CACHE_TAGS, createResource, type QueryParams } from "../../base-api";
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

/** Every listing on the market, with URL filters passed to the API. */
export const getProperties = (params: number | QueryParams = 60) =>
  properties.list(typeof params === "number" ? { limit: params } : params);

/**
 * One listing by its slug, or `null` when there is none.
 *
 * This is the read that counts a view, so it must not be called to test
 * whether a listing exists.
 */
export const getPropertyBySlug = (slug: string) => properties.bySlug(slug);

export interface ApiPropertyType {
  name: string;
  nameBn?: string;
  description?: string;
  icon?: string;
}

export async function getPropertyTypes() {
  const { baseApi } = await import("../../base-api");
  const res = await baseApi.list<ApiPropertyType>(
    "properties/options/types",
    { activeOnly: true },
    { tags: [CACHE_TAGS.properties] },
  );
  return res?.rows ?? [];
}
