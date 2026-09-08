import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { ListingsSection } from "@/components/pages/properties/listings-section";
import { BuyingStepsSection } from "@/components/pages/properties/buying-steps-section";
import { properties, type Purpose } from "@/data/properties";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.listings.metaTitle,
    description: dict.listings.metaDescription,
    alternates: localeAlternates(locale, "/properties"),
  };
}

/** A query-string number, or undefined when it is missing or not a number. */
function toNumber(value?: string) {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

/**
 * All listings.
 *
 * The home page's property calculator arrives here with its filters in the
 * query string — `?purpose=sale&area=gulshan&type=apartment&min=…&max=…` — so a
 * search is a URL that can be shared and reopened rather than state that only
 * exists in the tab it was typed in. Reading it makes this route render per
 * request; without a query it is the same page it always was.
 */
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    purpose?: string;
    area?: string;
    q?: string;
    type?: string;
    min?: string;
    max?: string;
  }>;
}) {
  const [dict, locale, query] = await Promise.all([
    getDictionary(),
    getLocale(),
    searchParams,
  ]);

  const filters = {
    purpose:
      query.purpose === "sale" || query.purpose === "rent"
        ? (query.purpose as Purpose)
        : undefined,
    area: query.area,
    q: query.q,
    type: query.type,
    min: toNumber(query.min),
    max: toNumber(query.max),
  };

  return (
    <>
      <PageHeader
        eyebrow={dict.listings.eyebrow}
        title={dict.listings.pageTitle}
        description={dict.listings.pageDescription.replace(
          "{count}",
          String(properties.length),
        )}
        image={pageBanners.properties}
      />

      <ListingsSection
        variant="full"
        filters={filters}
        clearHref={localeHref(locale, "/properties")}
      />

      <BuyingStepsSection />
    </>
  );
}
