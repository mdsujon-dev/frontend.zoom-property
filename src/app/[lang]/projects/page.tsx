import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { ConstructionStagesSection } from "@/components/sections/process-sections";
import { ProjectsSection } from "@/components/sections/projects-section";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    alternates: localeAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage() {
  const dict = await getDictionary();

  return (
    <>
      <PageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.pageTitle}
        description={dict.projects.pageDescription}
        image={pageBanners.projects}
      />

      <ProjectsSection showAction={false} />

      <ConstructionStagesSection />
    </>
  );
}
