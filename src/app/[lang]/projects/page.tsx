import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ContactCta } from "@/components/common/contact-cta";
import { pageBanners } from "@/data/page-banners";
import { ConstructionStagesSection } from "@/components/pages/projects/construction-stages-section";
import { ProjectsSection } from "@/components/pages/projects/projects-section";
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

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    stage?: string;
    q?: string;
    page?: string;
  }>;
}) {
  const [dict, query] = await Promise.all([
    getDictionary(),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.pageTitle}
        description={dict.projects.pageDescription}
        image={dict.projects.backgroundImage || pageBanners.projects}
      />

      <ProjectsSection
        variant="full"
        initialStage={query?.stage}
        initialSearch={query?.q}
        initialPage={query?.page ? Number(query.page) : undefined}
      />

      <ConstructionStagesSection />
      <ContactCta />
    </>
  );
}
