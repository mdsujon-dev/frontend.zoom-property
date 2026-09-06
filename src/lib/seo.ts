import { faqs, listings, siteConfig, socialLinks } from "@/data/site";

/**
 * Structured data builders. Keep every schema in here rather than inline in a
 * page, so the shapes stay consistent and there is one place to check when
 * Google's requirements change.
 *
 * Rule: only describe what is actually rendered on the page.
 */

/** Absolute URL from a site-relative path. Schema.org needs fully qualified URLs. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${absoluteUrl()}#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(),
    image: absoluteUrl("/opengraph-image"),
    sameAs: socialLinks
      // wa.me is a contact channel, not a profile page — sameAs is for profiles.
      .filter((link) => !link.href.startsWith("https://wa.me/"))
      .map((link) => link.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl()}#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(),
    publisher: { "@id": `${absoluteUrl()}#organization` },
  };
}

/** Built from the `faqs` rendered in the FAQ accordion — keep the two in sync. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * The listings shown on the home page. They are anchors on `/`, not their own
 * routes, so each item points at `/#listings` rather than a URL that 404s.
 * Give them real `url`s the moment `/listings/[slug]` exists.
 */
export function listingsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured listings",
    itemListElement: listings.map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Residence",
        name: listing.title,
        url: absoluteUrl("/#listings"),
        image: listing.image,
        address: {
          "@type": "PostalAddress",
          addressLocality: listing.location,
        },
        numberOfBedrooms: listing.beds,
        numberOfBathroomsTotal: listing.baths,
        floorSize: {
          "@type": "QuantitativeValue",
          value: listing.area,
          unitCode: "FTK", // UN/CEFACT code for square foot
        },
      },
    })),
  };
}
