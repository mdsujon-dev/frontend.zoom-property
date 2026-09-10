import "server-only";

import { baseApi, type RequestOptions } from "./client";
import type { QueryParams } from "./types";

/**
 * Builds a feature's reads from its endpoint, its mapper and its fallback.
 *
 * Every feature was repeating the same three steps: call the endpoint, map
 * each row to the type the components expect, fall back to the built-in data
 * when there is nothing. Written once here, a feature service becomes a
 * declaration rather than a procedure.
 */

export interface ResourceConfig<TApi, TOut> {
  /** Public endpoint, e.g. `"projects/public"`. */
  path: string;
  /** The cache tag every read of this resource carries. See `tags.ts`. */
  tag: string;
  /** One API row to the type the components consume. */
  map: (raw: TApi) => TOut;
  /** What to serve when the API has nothing to say. */
  fallback: TOut[];
  /** Default ordering for list reads. */
  sort?: string;
  /** How a fallback row is matched when looking one up by slug. */
  slugOf?: (row: TOut) => string;
}

export interface Resource<TApi, TOut> {
  /**
   * Mapped rows, or `null` when the API returned nothing.
   *
   * The one that does *not* fall back, so a caller can try a narrow read first
   * ("the ones ticked for the home page") and widen on its own terms rather
   * than being handed demo data prematurely.
   */
  query(params?: QueryParams): Promise<TOut[] | null>;

  /** Mapped rows, falling back to the built-in data. */
  list(params?: QueryParams): Promise<TOut[]>;

  /** One row by slug, falling back to the built-in data. */
  bySlug(slug: string): Promise<TOut | null>;

  /**
   * For an endpoint whose response is not a plain row — a project that comes
   * back with its listings, a post that comes back with its body. Still
   * tagged, so it is invalidated with everything else in the feature.
   */
  raw<T>(path: string, params?: QueryParams): Promise<{ data: T } | null>;

  /** The mapper, for a caller unwrapping an unusual envelope itself. */
  map: (raw: TApi) => TOut;

  /** This resource's cache tag, for a page that wants to state its own. */
  tag: string;
}

export function createResource<TApi, TOut>(
  config: ResourceConfig<TApi, TOut>,
): Resource<TApi, TOut> {
  const { path, tag, map, fallback, sort, slugOf } = config;
  const options: RequestOptions = { tags: [tag] };

  const query = async (params?: QueryParams): Promise<TOut[] | null> => {
    const res = await baseApi.list<TApi>(path, { sort, ...params }, options);
    if (!res?.rows.length) return null;
    return res.rows.map(map);
  };

  const list = async (params?: QueryParams): Promise<TOut[]> => {
    const rows = await query(params);
    if (rows) return rows;
    const limit = Number(params?.limit ?? 0);
    return limit > 0 ? fallback.slice(0, limit) : fallback;
  };

  const bySlug = async (slug: string): Promise<TOut | null> => {
    const res = await baseApi.get<TApi>(
      `${path}/${encodeURIComponent(slug)}`,
      undefined,
      options,
    );
    if (res?.data) return map(res.data);
    if (!slugOf) return null;
    return fallback.find((row) => slugOf(row) === slug) ?? null;
  };

  const raw = <T,>(rawPath: string, params?: QueryParams) =>
    baseApi.get<T>(rawPath, params, options);

  return { query, list, bySlug, raw, map, tag };
}
