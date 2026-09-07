import Link from "next/link";
import { AppContainer } from "@/components/common/app-container";
import { SectionHeading } from "@/components/common/section-heading";
import { InsightCard } from "@/components/pages/blog/insight-card";
import { insights } from "@/data/insights";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LOCALE_TAGS } from "@/i18n/config";
import { localeHref } from "@/i18n/href";

export async function HomeBlogSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.blog;

  const dateFormatter = new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const latestInsights = insights.slice(0, 3);

  return (
    <section className="border-t border-border bg-background py-16 sm:py-24">
      <AppContainer size="lg">
        <SectionHeading
          title={t.title}
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestInsights.map((insight) => (
            <Link key={insight.id} href={localeHref(locale, `/blog/${insight.id}`)} className="group h-full">
              <InsightCard
                insight={{
                  ...insight,
                  title: locale === "bn" ? insight.titleBn : insight.title,
                  excerpt: locale === "bn" ? insight.excerptBn : insight.excerpt,
                }}
                readMore={t.readMore || "Read More"}
                category={t.categories[insight.category as keyof typeof t.categories] ?? insight.category}
                date={dateFormatter.format(new Date(insight.date))}
              />
            </Link>
          ))}
        </div>
      </AppContainer>
    </section>
  );
}
