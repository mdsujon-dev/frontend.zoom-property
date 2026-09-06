import { properties } from "@/data/properties";
import { siteConfig, socialLinks } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

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
export async function faqSchema() {
  const dict = await getDictionary();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.content.faqs.map((faq) => ({
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
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Residence",
        name: property.title,
        url: absoluteUrl("/#listings"),
        image: property.images[0],
        address: {
          "@type": "PostalAddress",
          addressLocality: property.area,
          addressRegion: property.city,
          addressCountry: "BD",
        },
        ...(property.beds > 0 ? { numberOfBedrooms: property.beds } : {}),
        numberOfBathroomsTotal: property.baths,
        floorSize: {
          "@type": "QuantitativeValue",
          value: property.size,
          unitCode: "FTK", // UN/CEFACT code for square foot
        },
      },
    })),
  };
}
