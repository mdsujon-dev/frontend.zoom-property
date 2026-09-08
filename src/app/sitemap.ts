import type { MetadataRoute } from "next";

import { insights } from "@/data/insights";
import { properties } from "@/data/properties";
import { galleryImages, siteConfig } from "@/data/site";
import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS } from "@/i18n/config";

/**
 * Every route in every locale, each carrying the full hreflang alternate set —
 * that is what tells Google the two language versions are the same page rather
 * than duplicates.
 *
 * `changeFrequency` and `priority` are omitted because Google ignores both.
 */
const ROUTES = [
  "",
  "/properties",
  "/projects",
  "/areas",
  "/agents",
  "/landowners",
  "/blog",
  "/about",
  "/contact",
] as const;

const url = (locale: string, route: string) =>
  `${siteConfig.url}/${locale}${route}`;

/**
 * One entry per article per locale. `lastModified` is the publication date
 * rather than the build time — claiming every post changed on every deploy is
 * the fastest way to get a sitemap's dates ignored.
 */
function articleEntries(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    insights.map((insight) => {
      const route = `/blog/${insight.id}`;
      return {
        url: url(locale, route),
        lastModified: new Date(insight.date),
        alternates: {
          languages: {
            ...Object.fromEntries(
              LOCALES.map((l) => [LOCALE_TAGS[l], url(l, route)]),
            ),
            "x-default": url(DEFAULT_LOCALE, route),
          },
        },
        images: [insight.image],
      };
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: url(locale, route),
      lastModified,
      alternates: {
        languages: {
          ...Object.fromEntries(
            LOCALES.map((l) => [LOCALE_TAGS[l], url(l, route)]),
          ),
          "x-default": url(DEFAULT_LOCALE, route),
        },
      },
      ...(route === ""
        ? {
            images: [
              ...properties.map((property) => property.images[0]),
              ...galleryImages.map((image) => image.src),
            ],
          }
        : {}),
    })),
  );

  return [...pages, ...articleEntries()];
}
