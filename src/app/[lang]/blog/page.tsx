import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { PageHeader } from "@/components/layout/page-header";
import { BlogFeed } from "@/components/blog/blog-feed";
import { insights } from "@/data/insights";
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
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.blog;

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        image={pageBanners.blog}
      />

      <Section className="bg-background pt-10 sm:pt-14 pb-20">
        <BlogFeed
          insights={insights}
          locale={locale}
          t={t}
        />
      </Section>
    </>
  );
}
