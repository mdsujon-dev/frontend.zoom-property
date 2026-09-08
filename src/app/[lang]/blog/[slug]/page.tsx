import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { JsonLd } from "@/components/common/json-ld";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ArticleBody } from "@/components/pages/blog/article-body";
import { ArticleComments } from "@/components/pages/blog/article-comments";
import { ArticleQuickContact } from "@/components/pages/blog/article-quick-contact";
import { ArticleShare } from "@/components/pages/blog/article-share";
import { InsightCard } from "@/components/pages/blog/insight-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { articleBlocks } from "@/data/insight-article";
import { insights } from "@/data/insights";
import { localeAlternates } from "@/i18n/alternates";
import { LOCALES, LOCALE_TAGS, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { relatedInsights } from "@/lib/related-insights";
import { absoluteUrl, articleSchema, breadcrumbSchema } from "@/lib/seo";

/**
 * One article.
 *
 * Every post in every locale is prerendered — the content is a static array, so
 * there is nothing to gain from rendering these on demand.
 *
 * Layout: photograph, then a two-column body with the enquiry form in a sticky
 * rail. The rail drops below the article on tablet and narrower, because a
 * 320px form beside a 40-character measure is worse than no rail.
 *
 * Every section uses `size="lg"` rather than the site default. Two reasons, and
 * they point the same way: the narrower container leaves the body column at a
 * readable measure without capping it (a cap inside a wider column shows up as
 * dead space beside the text), and one width across the page keeps the title,
 * the photograph, the body and the related row on a single left edge.
 */
export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    insights.map((insight) => ({ lang, slug: insight.id })),
  );
}

function findInsight(slug: string) {
  return insights.find((insight) => insight.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const insight = findInsight(slug);

  if (!insight) return {};

  const isBn = lang === "bn";
  const title = isBn && insight.titleBn ? insight.titleBn : insight.title;
  const description = isBn && insight.excerptBn ? insight.excerptBn : insight.excerpt;

  return {
    title,
    description,
    alternates: localeAlternates(lang, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: insight.date,
      authors: [isBn && insight.author.nameBn ? insight.author.nameBn : insight.author.name],
      images: [insight.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) {
  const { lang, slug } = await params;
  const insight = findInsight(slug);

  if (!insight) notFound();

  const dict = await getDictionary();
  const t = dict.blog;
  const a = t.article;
  const isBn = lang === "bn";

  const title = isBn && insight.titleBn ? insight.titleBn : insight.title;
  const excerpt = isBn && insight.excerptBn ? insight.excerptBn : insight.excerpt;
  const authorName =
    isBn && insight.author.nameBn ? insight.author.nameBn : insight.author.name;
  const authorRole =
    isBn && insight.author.roleBn ? insight.author.roleBn : insight.author.role;
  const categoryLabel = t.categories[insight.category as keyof typeof t.categories] ?? insight.category;

  const dateFormatter = new Intl.DateTimeFormat(LOCALE_TAGS[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDate = dateFormatter.format(new Date(insight.date));

  const blocks = articleBlocks(insight, lang);
  const related = relatedInsights(insight, insights, 3);

  const blogHref = localeHref(lang, "/blog");
  const articleUrl = absoluteUrl(`/${lang}/blog/${slug}`);

  return (
    <>
      <JsonLd
        schema={articleSchema({
          url: articleUrl,
          headline: title,
          description: excerpt,
          image: insight.image,
          datePublished: insight.date,
          authorName,
          authorRole,
          section: categoryLabel,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: a.breadcrumbHome, url: absoluteUrl(`/${lang}`) },
          { name: t.title, url: absoluteUrl(`/${lang}/blog`) },
          { name: title, url: articleUrl },
        ])}
      />

      {/* The header sits under the fixed site header, hence the top padding. */}
      <section className="bg-background pt-28 pb-10 sm:pt-32">
        <AppContainer size="lg">
          <Reveal>
            <div className="flex max-w-3xl flex-col gap-5">
              <Link
                href={blogHref}
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon name="chevronLeft" size="xs" />
                {a.backToBlog}
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 font-semibold tracking-wider text-primary uppercase">
                  {categoryLabel}
                </span>
                <time dateTime={insight.date} className="text-muted-foreground">
                  {formattedDate}
                </time>
                <span aria-hidden className="size-1 rounded-full bg-border" />
                <span className="text-muted-foreground">
                  {insight.readMinutes} {t.minRead}
                </span>
              </div>

              <Heading as="h1" size="h1" className="text-balance">
                {title}
              </Heading>

              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarImage src={insight.author.avatar} alt="" />
                  <AvatarFallback>{authorName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {a.by} {authorName}
                  </span>
                  <span className="text-xs text-muted-foreground">{authorRole}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </AppContainer>
      </section>

      <AppContainer size="lg">
        <Reveal delay={0.1}>
          <ImageFrame
            src={insight.image}
            alt={title}
            ratio="auto"
            rounded="2xl"
            sizes="full"
            priority
            className="h-56 sm:h-72 lg:h-[26rem]"
          />
        </Reveal>
      </AppContainer>

      <section className="bg-background py-14 sm:py-20">
        <AppContainer size="lg">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <div className="flex flex-col gap-10">
              <ArticleBody blocks={blocks} />

              <ArticleShare
                url={articleUrl}
                title={title}
                label={a.share}
                copyLabel={a.copyLink}
                copiedLabel={a.copied}
              />

              <ArticleComments dict={a.comments} articleTitle={title} />
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <ArticleQuickContact dict={a.quickContact} articleTitle={title} />
            </aside>
          </div>
        </AppContainer>
      </section>

      {/* Six more, ranked by category then author — see `relatedInsights`. */}
      <section className="border-t border-border bg-muted/30 py-16 sm:py-20">
        <AppContainer size="lg">
          <Reveal>
            <div className="flex flex-col gap-3">
              <Heading as="h2" size="h3">
                {a.related.title}
              </Heading>
              <Text size="base" className="max-w-2xl leading-relaxed">
                {a.related.description}
              </Text>
            </div>
          </Reveal>

          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={localeHref(lang, `/blog/${post.id}`)}
                  className="group block h-full"
                >
                  <InsightCard
                    insight={{
                      ...post,
                      title: isBn && post.titleBn ? post.titleBn : post.title,
                      excerpt: isBn && post.excerptBn ? post.excerptBn : post.excerpt,
                    }}
                    readMore={t.readMore}
                    category={
                      t.categories[post.category as keyof typeof t.categories] ?? post.category
                    }
                    date={dateFormatter.format(new Date(post.date))}
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </AppContainer>
      </section>
    </>
  );
}
