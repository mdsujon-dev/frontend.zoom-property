import type { Metadata } from "next";

import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, type Locale } from "./config";

/**
 * Canonical + the full hreflang set for one page.
 *
 * Must be called by every page that defines `generateMetadata`: Next *replaces*
 * the parent's `alternates` object rather than merging into it, so a page that
 * sets only `{ canonical }` silently drops the language alternates the layout
 * emitted — and Google then reads the two locales as duplicate pages.
 */
export function localeAlternates(
  locale: Locale,
  path: string,
): Metadata["alternates"] {
  const href = (l: Locale) => (path === "/" ? `/${l}` : `/${l}${path}`);

  return {
    canonical: href(locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [LOCALE_TAGS[l], href(l)])),
      "x-default": href(DEFAULT_LOCALE),
    },
  };
}
