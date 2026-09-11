import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { ContactCta } from "@/components/common/contact-cta";
import { PageHeader } from "@/components/layout/page-header";
import { BlogFeed } from "@/components/pages/blog/blog-feed";
import { getInsights } from "@/server/features/insights";
import { getBlogCategories } from "@/server/features/insights/service";
import { pageBanners } from "@/data/page-banners";
import { localeAlternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: localeAlternates(locale, "/blog"),
  };
}

export default async function BlogPage() {
  const [dict, locale, insights, categories] = await Promise.all([
    getDictionary(),
    getLocale(),
    getInsights(60),
    getBlogCategories(),
  ]);
  const t = dict.blog;

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        image={dict.blog.backgroundImage || pageBanners.blog}
      />

      <Section className="bg-background pt-10 sm:pt-14 pb-20">
        <BlogFeed
          insights={insights}
          backendCategories={categories}
          locale={locale}
          t={t}
        />
      </Section>
      <div className="mb-8 md:mb-12 lg:mb-20">
        <ContactCta  tone="surface"/>
      </div>
    </>
  );
}
