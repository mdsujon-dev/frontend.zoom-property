"use client";

import { useMemo } from "react";
import Link from "next/link";

import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { Icon } from "@/components/common/icon";
import { ImageFrame } from "@/components/media/image-frame";
import { Reveal } from "@/components/motion/reveal";
import { BlogStandardCard } from "./blog-card";
import { BLOG_CATEGORIES, getCategoryConfig } from "@/lib/blog-categories";
import type { Insight } from "@/data/insights";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

interface BlogCategoryViewProps {
  currentCategorySlug: string;
  locale: Locale;
  insights: Insight[];
  t: {
    all: string;
    categories: Record<string, string>;
    readMore: string;
    viewAll: string;
    minRead: string;
    publishedOn: string;
    searchPlaceholder?: string;
    featuredBadge?: string;
    trendingBadge?: string;
    browsingCategory?: string;
    featuredForYou?: string;
    postsCount?: string;
    backToAll?: string;
    sections: {
      explore: string;
      architecture: string;
      architectureDesc: string;
      lifestyle: string;
      lifestyleDesc: string;
      advisory: string;
      advisoryDesc: string;
      economy: string;
      economyDesc: string;
      realEstate: string;
      realEstateDesc: string;
      technology: string;
      technologyDesc: string;
    };
  };
}

export function BlogCategoryView({
  currentCategorySlug,
  locale,
  insights,
  t,
}: BlogCategoryViewProps) {
  const isBn = locale === "bn";

  const dateFormatter = useMemo(() => {
    return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [locale]);

  const formatDate = (dateStr: string) => {
    try {
      return dateFormatter.format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const config = getCategoryConfig(currentCategorySlug) ?? BLOG_CATEGORIES[0];

  // Category title translation
  const categoryTitle = useMemo(() => {
    const key = config.titleKey;
    return t.sections[key] ?? config.category;
  }, [config, t]);

  // Posts belonging to this category
  const posts = useMemo(() => {
    return insights.filter(
      (i) =>
        i.category.toLowerCase() === config.category.toLowerCase() ||
        i.section === config.section ||
        (config.category === "Legal" && (i.category === "Legal" || i.category === "NRB")) ||
        (config.category === "Real Estate" && (i.category === "Real Estate" || i.category === "Market")),
    );
  }, [insights, config]);

  // Related section config
  const relatedConfig =
    getCategoryConfig(config.relatedSlug) ??
    BLOG_CATEGORIES.find((c) => c.slug !== config.slug) ??
    BLOG_CATEGORIES[0];

  const relatedTitle = useMemo(() => {
    const key = relatedConfig.titleKey;
    return t.sections[key] ?? relatedConfig.category;
  }, [relatedConfig, t]);

  const relatedPosts = useMemo(() => {
    return insights.filter(
      (i) =>
        i.category.toLowerCase() === relatedConfig.category.toLowerCase() ||
        i.section === relatedConfig.section ||
        (relatedConfig.category === "Legal" && (i.category === "Legal" || i.category === "NRB")) ||
        (relatedConfig.category === "Real Estate" &&
          (i.category === "Real Estate" || i.category === "Market")),
    );
  }, [insights, relatedConfig]);

  // All category pills for top navigation
  const categoryPills = useMemo(() => {
    return [
      { slug: "all", label: t.all, href: localeHref(locale, "/blog") },
      ...BLOG_CATEGORIES.map((cat) => ({
        slug: cat.slug,
        label: t.categories[cat.category] ?? cat.category,
        href: localeHref(locale, `/blog/category/${cat.slug}`),
      })),
    ];
  }, [locale, t]);

  const browsingLabel =
    t.browsingCategory ?? (isBn ? "ক্যাটাগরি ব্রাউজ করছেন" : "BROWSING CATEGORY");
  const postsCountLabel =
    t.postsCount ?? (isBn ? "টি প্রতিবেদন" : "Posts");
  const featuredForYouLabel =
    t.featuredForYou ??
    (isBn ? "আপনার জন্য নির্বাচিত ব্লগসমূহ" : "Here are the featured blogs for you");
  const backToAllLabel =
    t.backToAll ?? (isBn ? "সবগুলো ব্লগ" : "All Articles");

  return (
    <div className="flex flex-col gap-10 sm:gap-14">
      {/* Category Navigation Pills & Back Link */}
      <Reveal>
        <div className="flex flex-col gap-4 border-b border-border/60 pb-6">
          <div className="flex items-center justify-between">
            <Link
              href={localeHref(locale, "/blog")}
              className="inline-flex items-center gap-1.5 font-heading text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              <Icon name="chevronLeft" size="xs" />
              <span>{backToAllLabel}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categoryPills.map((pill) => {
              const isActive = pill.slug === config.slug;
              return (
                <Link
                  key={pill.slug}
                  href={pill.href}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-sm ring-2 ring-primary/30"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
                  )}
                >
                  {pill.label}
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Category Header matching user's screenshot */}
      <Reveal>
        <div className="flex flex-col gap-1.5">
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {browsingLabel}
          </span>
          <Heading
            as="h1"
            size="h2"
            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground"
          >
            {categoryTitle}
          </Heading>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {posts.length} {postsCountLabel}
          </span>
        </div>
      </Reveal>

      {/* Main List of Category Posts (Horizontal Rows matching user's screenshot) */}
      <Reveal>
        <div className="flex flex-col divide-y divide-border/60 border-t border-border/60">
          {posts.map((post) => {
            const title = isBn && post.titleBn ? post.titleBn : post.title;
            const excerpt = isBn && post.excerptBn ? post.excerptBn : post.excerpt;
            const href = localeHref(locale, `/blog/${post.id}`);
            const categoryLabel = t.categories[post.category] ?? post.category;

            return (
              <article
                key={post.id}
                className="group flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center py-7 sm:py-9 transition-colors"
              >
                {/* Left Thumbnail (Wide Aspect Ratio) */}
                <Link
                  href={href}
                  className="w-full md:w-80 lg:w-[380px] xl:w-[420px] shrink-0 overflow-hidden rounded-2xl block"
                >
                  <ImageFrame
                    src={post.image}
                    alt=""
                    ratio="video"
                    hover="zoom"
                    rounded="2xl"
                    sizes="(min-width: 1280px) 420px, (min-width: 1024px) 380px, (min-width: 768px) 320px, 100vw"
                  />
                </Link>

                {/* Right Content */}
                <div className="flex flex-1 flex-col justify-center gap-2.5 sm:gap-3">
                  {/* Category Accent Dash */}
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <span className="h-0.5 w-4 rounded-full bg-primary/80" />
                    <span>{categoryLabel}</span>
                  </div>

                  {/* Title */}
                  <Heading
                    as="h3"
                    size="h4"
                    className="font-heading font-bold text-foreground transition-colors duration-200 group-hover:text-primary leading-snug"
                  >
                    <Link href={href}>{title}</Link>
                  </Heading>

                  {/* Excerpt */}
                  <Text
                    size="sm"
                    className="line-clamp-2 text-muted-foreground leading-relaxed"
                  >
                    {excerpt}
                  </Text>

                  {/* Meta / Date */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>
                      {post.readMinutes} {t.minRead}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Reveal>

      {/* Bottom Section: Featured Blogs For You (matching user's screenshot) */}
      {relatedPosts.length > 0 && (
        <Reveal>
          <div className="mt-8 sm:mt-12 pt-12 border-t border-border/80 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-1">
              <Heading
                as="h2"
                size="h3"
                className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground"
              >
                {relatedTitle}
              </Heading>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {featuredForYouLabel}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.slice(0, 4).map((post) => (
                <BlogStandardCard
                  key={post.id}
                  insight={post}
                  locale={locale}
                  categoryLabel={t.categories[post.category] ?? post.category}
                  formattedDate={formatDate(post.date)}
                  readMoreLabel={t.readMore}
                  minReadLabel={t.minRead}
                />
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
