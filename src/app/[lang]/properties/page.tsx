import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { ListingsSection } from "@/components/sections/listings-section";
import { BuyingStepsSection } from "@/components/sections/process-sections";
import { properties } from "@/data/properties";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.listings.metaTitle,
    description: dict.listings.metaDescription,
    alternates: localeAlternates(locale, "/properties"),
  };
}

export default async function PropertiesPage() {
  const dict = await getDictionary();

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

      <ListingsSection variant="full" />

      <BuyingStepsSection />
    </>
  );
}
