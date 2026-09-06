import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { AreaComparisonSection } from "@/components/sections/area-comparison";
import { AreasSection } from "@/components/sections/areas-section";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.areas.metaTitle,
    description: dict.areas.metaDescription,
    alternates: localeAlternates(locale, "/areas"),
  };
}

export default async function AreasPage() {
  const dict = await getDictionary();

  return (
    <>
      <PageHeader
        eyebrow={dict.areas.eyebrow}
        title={dict.areas.pageTitle}
        description={dict.areas.pageDescription}
        image={pageBanners.areas}
      />

      <AreasSection />
      <AreaComparisonSection />
    </>
  );
}
