import "server-only";

import type { ApiMedia } from "./types";

/**
 * The mapping every feature needs.
 *
 * One record from the panel looks much like another: populated media, a
 * description that may be an array of paragraphs or a single string, and
 * optional fields the desk has not filled in yet. Solved once here rather than
 * in each feature folder.
 */

/** The address of a media document. Always `url`, never `key`. */
export const mediaUrl = (m?: ApiMedia | null): string => m?.url ?? "";

/** The addresses of a list of media documents, blanks dropped. */
export const mediaUrls = (list?: ApiMedia[] | null): string[] =>
  (list ?? []).map(mediaUrl).filter(Boolean);

/**
 * A gallery that always opens on the cover.
 *
 * The cover leads so a card and the banner it opens show the same frame, and
 * duplicates are dropped so a cover that also sits in the gallery is not shown
 * twice.
 */
export const gallery = (
  cover?: ApiMedia | null,
  rest?: ApiMedia[] | null,
): string[] =>
  Array.from(new Set([mediaUrl(cover), ...mediaUrls(rest)].filter(Boolean)));

/**
 * A description as the site wants it: one string per paragraph.
 *
 * The API stores an array, but older records carry a single string, so both
 * are accepted and anything empty is dropped.
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
