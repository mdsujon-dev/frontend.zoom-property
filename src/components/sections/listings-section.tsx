import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { InteractiveListings } from "@/components/property/interactive-listings";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { properties } from "@/data/properties";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

/**
 * `variant="preview"` is the home page cut — a fixed number of cards and a link
 * onward. `variant="full"` is the /properties page, where the filterable client
 * component earns its JavaScript because filtering is the point of the page.
 */
export async function ListingsSection({
  variant = "preview",
  limit = 6,
}: {
  variant?: "preview" | "full";
  limit?: number;
}) {
  if (variant === "full") {
    return (
      <Section id="listings" className="bg-background">
        <InteractiveListings />
      </Section>
    );
  }

  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <Section id="listings" className="bg-background">
      <SectionHeading
        eyebrow={dict.listings.eyebrow}
        title={dict.listings.title}
        description={dict.listings.description}
        action={
          <Button variant="outline" size="lg" asChild>
            <Link href={localeHref(locale, "/properties")}>
              {dict.listings.action}
              <Icon name="arrowRight" size="xs" />
            </Link>
          </Button>
        }
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, limit).map((property) => (
          <StaggerItem key={property.id}>
            <PropertyCard property={property} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
