import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { AdvisorMatchSection } from "@/components/pages/agents/advisor-match-section";
import { AgentsSection } from "@/components/pages/agents/agents-section";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.agentsSection.metaTitle,
    description: dict.agentsSection.metaDescription,
    alternates: localeAlternates(locale, "/agents"),
  };
}

export default async function AgentsPage() {
  const dict = await getDictionary();

  return (
    <>
      <PageHeader
        eyebrow={dict.agentsSection.eyebrow}
        title={dict.agentsSection.pageTitle}
        description={dict.agentsSection.pageDescription}
        image={pageBanners.agents}
      />

      <AgentsSection />
      <AdvisorMatchSection />
    </>
  );
}
