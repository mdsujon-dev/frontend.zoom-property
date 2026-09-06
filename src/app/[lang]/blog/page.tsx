import type { Metadata } from "next";

import { Section } from "@/components/common/section";
import { PageHeader } from "@/components/layout/page-header";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { InsightCard } from "@/components/property/insight-card";
import { insights } from "@/data/insights";
import { pageBanners } from "@/data/page-banners";
import { localeAlternates } from "@/i18n/alternates";
import { LOCALE_TAGS } from "@/i18n/config";
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

  // Formatted here rather than in the card, so the card stays free of Intl
  // setup and the whole page shares one formatter. Bangla gets Bengali numerals.
  const formatDate = new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        image={pageBanners.blog}
      />

      <Section className="bg-background">
        <Stagger className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((post) => (
            <StaggerItem key={post.id}>
              <InsightCard
                insight={post}
                category={t.categories[post.category]}
                date={formatDate.format(new Date(post.date))}
                readMore={t.readMore}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
