import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { MilestonesSection } from "@/components/pages/about/milestones-section";
import { VettingSection } from "@/components/pages/about/vetting-section";
import { GallerySection } from "@/components/pages/about/gallery-section";
import { StatsSection } from "@/components/pages/shared/stats-section";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage() {
  const dict = await getDictionary();

  return (
    <>
      <PageHeader
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        description={dict.about.description}
        image={pageBanners.about}
      />

      <StatsSection />
      <VettingSection />
      <MilestonesSection />
      <GallerySection />

    </>
  );
}
