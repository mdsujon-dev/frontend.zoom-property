import "server-only";

import type { Locale } from "@/i18n/config";

import { baseApi, CACHE_TAGS } from "../../base-api";

/**
 * Copy edited in the panel, laid over the built-in dictionary.
 *
 * The panel stores one row per string per language, keyed by its dictionary
 * path with the language on the end — `hero.title.en`. So an override needs no
 * mapping table: the key *is* the path into the dictionary, which is why the
 * CMS schema was generated from these files in the first place.
 *
 * Only what somebody actually edited is stored. Everything else falls through
 * to the JSON, so a page renders the same as it always did until the desk
 * changes a line — and if the API is unreachable, the site simply renders the
 * built-in text rather than failing.
 */

interface CmsRow {
  key: string;
  value?: unknown;
  imageUrl?: string;
  group?: string;
}

/** Every CMS group. One request rather than one per page section. */
const GROUPS = [
  "home",
  "properties",
  "projects",
  "areas",
  "about",
  "services",
  "landowners",
  "blog",
  "reviews",
  "agents",
  "contact",
  "common",
] as const;

/**
 * Writes `value` at a dotted path, but only where the dictionary already has a
 * string.
 *
 * The guard is the point: a stored key that no longer matches the dictionary —
 * a section renamed, a field removed — is ignored rather than grafting a stray
 * branch onto the object the components destructure.
 */
const setPath = (target: Record<string, unknown>, path: string[], value: string) => {
  let node: Record<string, unknown> = target;
  for (const segment of path.slice(0, -1)) {
    const next = node[segment];
    if (typeof next !== "object" || next === null || Array.isArray(next)) return;
    node = next as Record<string, unknown>;
  }
  const last = path[path.length - 1];
  if (typeof node[last] !== "string") return;
  node[last] = value;
};

/** A structural copy, so one request's overrides never leak into the next. */
const clone = <T,>(value: T): T =>
  typeof structuredClone === "function"
    ? structuredClone(value)
    : (JSON.parse(JSON.stringify(value)) as T);

/**
 * Returns the dictionary with the panel's edits applied for this locale.
 *
 * Untouched when nothing is stored, so the cost of the CMS on a site nobody
 * has edited yet is one cached request.
 */
export async function applyCmsOverrides<T extends object>(
  dictionary: T,
  locale: Locale,
): Promise<T> {
  const groups = await Promise.all(
    GROUPS.map((group) =>
      baseApi.list<CmsRow>(`dynamic-content/by-group/${group}`, undefined, {
        tags: [CACHE_TAGS.cms],
      }),
    ),
  );

  const rows = groups.flatMap((g) => g?.rows ?? []);
  if (!rows.length) return dictionary;

  const suffix = `.${locale}`;
  const merged = clone(dictionary) as Record<string, unknown>;
  let applied = 0;

  for (const row of rows) {
    if (typeof row?.key !== "string" || !row.key.endsWith(suffix)) continue;
    const rawVal =
      typeof row.value === "string"
        ? row.value
        : typeof row.imageUrl === "string"
        ? row.imageUrl
        : "";
    if (!rawVal.trim()) continue;

    const path = row.key.slice(0, -suffix.length).split(".");
    if (!path.length) continue;

    setPath(merged, path, rawVal);
    applied += 1;
  }

  return applied ? (merged as T) : dictionary;
}
