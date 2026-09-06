import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap((locale) =>
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
}
