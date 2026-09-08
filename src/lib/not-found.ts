import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

/**
 * Working out what a visitor probably meant by a URL that does not exist.
 *
 * Deliberately free of `next/*` imports so both 404 entry points — the segment
 * boundary and the global one — can run it on the server, before any of it
 * reaches the browser.
 */

/**
 * Request header the proxy stamps the requested path onto. A 404 has no params
 * of its own, so this is the only reliable way for it to learn the URL.
 */
export const PATHNAME_HEADER = "x-pathname";

/**
 * The routes a mistyped URL could plausibly have meant. A literal list rather
 * than `mainNav`, because the guess should also be able to land on pages that
 * are not in the header (`/about`, `/reviews`).
 */
export const KNOWN_ROUTES = [
  "properties",
  "projects",
  "areas",
  "landowners",
  "blog",
  "contact",
  "agents",
  "about",
  "reviews",
  "services",
] as const;

/** Levenshtein distance. Small enough to inline, and only ever run on a slug. */
function distance(a: string, b: string) {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    previous = current;
  }

  return previous[b.length];
}

/**
 * "propertys" → "properties". Returns null when nothing is close enough, so a
 * genuinely unrelated URL gets no misleading suggestion.
 */
export function closestRoute(segment: string) {
  if (!segment) return null;

  const slug = segment.toLowerCase();
  let best: { route: string; score: number } | null = null;

  for (const route of KNOWN_ROUTES) {
    // A substring hit beats edit distance: "propert" clearly meant
    // "properties" even though three edits separate them.
    const score =
      route.includes(slug) || slug.includes(route) ? 0 : distance(slug, route);
    if (!best || score < best.score) best = { route, score };
  }

  if (!best) return null;
  // Allow roughly a third of the slug to be wrong before giving up.
  return best.score <= Math.max(2, Math.floor(slug.length / 3)) ? best.route : null;
}

export interface ResolvedNotFound {
  /** The language to answer in, taken from the URL. */
  locale: Locale;
  /** What was asked for, with the locale segment stripped. */
  attempted: string;
  /** The closest real route, or null when nothing is close enough. */
  suggestion: string | null;
}

/** Split a requested path into the three things the 404 page needs. */
export function resolveNotFound(pathname: string): ResolvedNotFound {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = segments.length > 0 && isLocale(segments[0]);
  const rest = hasLocale ? segments.slice(1) : segments;

  return {
    locale: hasLocale ? (segments[0] as Locale) : DEFAULT_LOCALE,
    attempted: `/${rest.join("/")}`,
    suggestion: closestRoute(rest[0] ?? ""),
  };
}
