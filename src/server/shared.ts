import "server-only";

/**
 * The pieces every mapper in this folder needs.
 *
 * One record from the panel looks much like another: it carries populated
 * media documents, a description that may be an array of paragraphs or a
 * single string, and optional fields the desk has not filled in yet. Rather
 * than each entity file solving that again, the shapes and the four helpers
 * live here.
 */

/** A populated media document, as the API returns it. */
export interface ApiMedia {
  _id?: string;
  key?: string;
  /** Absolute address. `key` is only the object's path inside the bucket. */
  url?: string;
}

/** What every list endpoint answers with. */
export interface ApiListMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

/**
 * The address of a media document.
 *
 * Always `url`, never `key`: the key is the object's path inside the storage
 * bucket and means nothing to a browser on its own.
 */
export const mediaUrl = (m?: ApiMedia | null): string => m?.url ?? "";

/** The addresses of a list of media documents, blanks dropped. */
export const mediaUrls = (list?: ApiMedia[] | null): string[] =>
  (list ?? []).map(mediaUrl).filter(Boolean);

/**
 * A gallery that always opens on the cover.
 *
 * The cover is repeated as the first entry so a card and the banner it opens
 * show the same frame, and duplicates are dropped so a cover that also appears
 * in the gallery does not show twice.
 */
export const gallery = (
  cover?: ApiMedia | null,
  rest?: ApiMedia[] | null,
): string[] =>
  Array.from(new Set([mediaUrl(cover), ...mediaUrls(rest)].filter(Boolean)));

/**
 * A description as the site wants it: one string per paragraph.
 *
 * The API stores an array, but older records and hand-written payloads carry a
 * single string, so both are accepted and anything empty is dropped.
 */
export const paragraphs = (value?: string[] | string | null): string[] => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
};

/** An ISO date, or "" — never the string "Invalid Date". */
export const isoDate = (value?: string | Date | null): string => {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
};
