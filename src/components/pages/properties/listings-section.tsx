import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { InteractiveListings, type ListingFilters } from "./interactive-listings";
import { PropertyCard } from "./property-card";
import { getHomeProperties, getProperties } from "@/server/features/properties";
import { getAreas } from "@/server/features/areas";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import type { Property } from "@/data/properties";
import type { Area } from "@/data/areas";

export async function ListingsSection({
  variant = "preview",
  limit = 6,
  filters,
  clearHref,
  properties: initialProperties,
  areas: initialAreas,
}: {
  variant?: "preview" | "full";
  limit?: number;
  /** From the query string, when the visitor arrived via the calculator. */
  filters?: ListingFilters;
  clearHref?: string;
  properties?: Property[];
  areas?: Area[];
}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  if (variant === "full") {
    const [propList, areaList] = await Promise.all([
      initialProperties ? Promise.resolve(initialProperties) : getProperties(100),
      initialAreas ? Promise.resolve(initialAreas) : getAreas(60),
    ]);

    return (
      <Section id="listings" className="bg-background">
        {/* `limit` is the page size here, not a cap on what is fetched:
            the whole list is filtered and searched in the browser, and this
            is how many of the results a page shows at a time. */}
        <InteractiveListings
          locale={locale}
          filters={filters}
          clearHref={clearHref}
          properties={propList}
          areas={areaList}
          pageSize={limit}
        />
      </Section>
    );
  }

  const propList = initialProperties ?? (await getHomeProperties(limit));

  return (
    <Section id="listings" className="bg-background">
      <SectionHeading
        title={dict.listings.title}
        action={
          <Link
            href={localeHref(locale, "/properties")}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground shadow-xs transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <span>
              {locale === "bn" ? "সবগুলো প্রপার্টি" : "All Properties"}
            </span>
            <Icon
              name="arrowRight"
              size="xs"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        }
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {propList.map((property) => (
          <StaggerItem key={property.id}>
            <PropertyCard property={property} locale={locale} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
