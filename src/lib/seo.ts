import type { Project } from "@/data/projects";
import { properties, type Property } from "@/data/properties";
import { siteConfig } from "@/data/site";
import type { SocialProfile } from "@/lib/contact";
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

/**
 * `sameAs` is passed in rather than imported: the profile addresses live in the
 * CMS now, and this file has no dictionary to read.
 */
export function organizationSchema(profiles: SocialProfile[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${absoluteUrl()}#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl(),
    image: absoluteUrl("/opengraph-image"),
    sameAs: profiles
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

/**
 * One blog post. `BlogPosting`, not `Article`: it is the narrower type and it
 * is what Google's article rich result actually looks for.
 *
 * Only fields the page really renders are included — there is no `dateModified`
 * in the data, so none is claimed.
 */
export function articleSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  authorName,
  authorRole,
  section,
}: {
  url: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  authorName: string;
  authorRole: string;
  section: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline,
    description,
    image,
    datePublished,
    articleSection: section,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: { "@id": `${absoluteUrl()}#organization` },
  };
}

/**
 * Breadcrumbs for a nested route. Pass the trail in order, root first; every
 * entry needs a real URL, so never put a hash link in here.
 */
export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * One listing, as a `RealEstateListing` with the asking price nested in an
 * `Offer`.
 *
 * `price` is a plain number and `priceCurrency` is separate — a formatted
 * string like "৳11.5 Cr" is what the page shows a person, and what Google
 * refuses to parse. Rentals carry the period as well, because ৳3,00,000 a month
 * and ৳3,00,000 outright are not the same claim.
 *
 * The agency is referenced by id rather than repeated: the root layout already
 * emits it as `#organization`.
 */
export function propertySchema(property: Property, path: string) {
  const isRent = property.purpose === "rent";

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name: property.title,
    image: property.images,
    numberOfBedrooms: property.beds || undefined,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.size,
      unitCode: "FTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area,
      addressRegion: property.city,
      addressCountry: "BD",
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "BDT",
      availability:
        property.status === "sold"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      ...(isRent
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: property.price,
              priceCurrency: "BDT",
              unitCode: "MON",
            },
          }
        : {}),
    },
    provider: { "@id": `${siteConfig.url}/#organization` },
  };
}

/**
 * A development, as an `ApartmentComplex` with the entry price as an `Offer`.
 *
 * Not `RealEstateListing`: that describes one unit for sale, and this is a
 * building of them at a starting price. The construction stage has no schema
 * of its own, so it is not claimed here — the page states it, and inventing a
 * property for it would put an unverifiable number in structured data.
 */
export function projectSchema(project: Project, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": absoluteUrl(path),
    url: absoluteUrl(path),
    name: project.name,
    image: project.images,
    numberOfAccommodationUnits: project.units,
    numberOfAvailableAccommodationUnits: project.unitsLeft,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.area,
      addressRegion: project.city,
      addressCountry: "BD",
    },
    makesOffer: {
      "@type": "Offer",
      price: project.startingPrice,
      priceCurrency: "BDT",
      availability: "https://schema.org/PreOrder",
      availabilityStarts: project.handover,
    },
    provider: { "@id": `${siteConfig.url}/#organization` },
  };
}
