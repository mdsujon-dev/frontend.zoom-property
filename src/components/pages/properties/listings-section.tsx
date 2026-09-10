import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { InteractiveListings, type ListingFilters } from "./interactive-listings";
import { PropertyCard } from "./property-card";
import { getHomeProperties } from "@/server/features/properties";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function ListingsSection({
  variant = "preview",
  limit = 6,
  filters,
  clearHref,
}: {
  variant?: "preview" | "full";
  limit?: number;
  /** From the query string, when the visitor arrived via the calculator. */
  filters?: ListingFilters;
  clearHref?: string;
}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);


  if (variant === "full") {
    return (
      <Section id="listings" className="bg-background">
        <InteractiveListings
          locale={locale}
          filters={filters}
          clearHref={clearHref}
        />
      </Section>
    );
  }

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
        {(await getHomeProperties(limit)).map((property) => (
          <StaggerItem key={property.id}>
            <PropertyCard property={property} locale={locale} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
