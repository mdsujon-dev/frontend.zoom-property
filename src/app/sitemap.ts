import type { MetadataRoute } from "next";

import { galleryImages, listings, siteConfig } from "@/data/site";

/**
 * One route exists today: `/`. The entries in `mainNav` (`#listings`,
 * `#gallery`, `#tour`, `#faq`) are anchors on that page, not URLs — never list
 * them here. Add real entries as `/listings/[slug]` and friends land.
 *
 * The images are declared so the home page's media is eligible for Google
 * Images; `changeFrequency` and `priority` are omitted because Google ignores
 * them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      images: [
        ...listings.map((listing) => listing.image),
        ...galleryImages.map((image) => image.src),
      ],
    },
  ];
}
