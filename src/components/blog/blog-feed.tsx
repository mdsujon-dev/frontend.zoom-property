"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import type { Insight } from "@/data/insights";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { Reveal } from "@/components/motion/reveal";
import { BlogCategoryFilter } from "./blog-category-filter";
import { BlogHeroGrid } from "./blog-hero-grid";
import { BlogPromoBanner } from "./blog-promo-banner";
import { BlogSectionRow } from "./blog-section-row";
import { BlogNewsletter } from "./blog-newsletter";
import { BlogStandardCard } from "./blog-card";

interface BlogFeedProps {
  insights: Insight[];
  locale: Locale;
  t: {
    all: string;
    categories: Record<string, string>;
    readMore: string;
    viewAll: string;
    minRead: string;
    publishedOn: string;
    searchPlaceholder: string;
    featuredBadge: string;
    trendingBadge: string;
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
    promo: {
      badge: string;
      title: string;
      subtitle: string;
      cta1: string;
      cta2: string;
    };
    newsletter: {
      badge: string;
      title: string;
      description: string;
      placeholder: string;
      button: string;
      note: string;
    };
  };
}

export function BlogFeed({ insights, locale, t }: BlogFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const categories = useMemo(() => [
    { id: "All", label: t.all },
    { id: "Architecture", label: t.categories["Architecture"] ?? "Architecture" },
    { id: "Lifestyle", label: t.categories["Lifestyle"] ?? "Lifestyle" },
    { id: "Legal", label: t.categories["Legal"] ?? "Advisory" },
    { id: "Economy", label: t.categories["Economy"] ?? "Economy" },
    { id: "Real Estate", label: t.categories["Real Estate"] ?? "Real Estate" },
    { id: "Technology", label: t.categories["Technology"] ?? "Technology" },
  ], [t]);

  // Section post allocations
  const heroMain = useMemo(() => {
    return (
      insights.find((i) => i.section === "hero-main") ??
      insights.find((i) => i.featured) ??
      insights[0]
    );
  }, [insights]);

  const heroTopTwo = useMemo(() => {
    const items = insights.filter((i) => i.section === "hero-top");
    return items.length >= 2 ? items.slice(0, 2) : insights.slice(1, 3);
  }, [insights]);

  const heroListFour = useMemo(() => {
    const items = insights.filter((i) => i.section === "hero-list");
    return items.length >= 4 ? items.slice(0, 4) : insights.slice(3, 7);
  }, [insights]);

  const architecturePosts = useMemo(() => {
    return insights.filter((i) => i.category === "Architecture" || i.section === "architecture");
  }, [insights]);

  const lifestylePosts = useMemo(() => {
    return insights.filter((i) => i.category === "Lifestyle" || i.section === "lifestyle");
  }, [insights]);

  const advisoryPosts = useMemo(() => {
    return insights.filter(
      (i) => i.category === "Legal" || i.section === "advisory" || i.category === "NRB",
    );
  }, [insights]);

  const economyPosts = useMemo(() => {
    return insights.filter((i) => i.category === "Economy" || i.section === "economy");
  }, [insights]);

  const realEstatePosts = useMemo(() => {
    return insights.filter(
      (i) => i.category === "Real Estate" || i.section === "real-estate" || i.category === "Market",
    );
  }, [insights]);

  const technologyPosts = useMemo(() => {
    return insights.filter((i) => i.category === "Technology" || i.section === "technology");
  }, [insights]);

  // Filtered search / category items
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All" && !searchQuery.trim()) {
      return null;
    }

    const q = searchQuery.toLowerCase().trim();
    return insights.filter((post) => {
      const matchCat =
        activeCategory === "All" ||
        post.category === activeCategory ||
        (activeCategory === "Legal" && (post.category === "Legal" || post.category === "NRB")) ||
        (activeCategory === "Real Estate" && (post.category === "Real Estate" || post.category === "Market"));

      if (!matchCat) return false;
      if (!q) return true;

      const titleMatch = post.title.toLowerCase().includes(q);
      const titleBnMatch = post.titleBn?.toLowerCase().includes(q) ?? false;
      const excerptMatch = post.excerpt.toLowerCase().includes(q);
      const excerptBnMatch = post.excerptBn?.toLowerCase().includes(q) ?? false;

      return titleMatch || titleBnMatch || excerptMatch || excerptBnMatch;
    });
  }, [activeCategory, searchQuery, insights]);

  const labels = {
    readMore: t.readMore,
    minRead: t.minRead,
  };

  return (
    <div className="flex flex-col gap-12 sm:gap-16">
      {/* Category Pills & Search */}
      <Reveal>
        <BlogCategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            if (catId !== "All") {
              const el = document.getElementById(catId.toLowerCase().replace(/\s+/g, "-"));
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder={t.searchPlaceholder}
        />
      </Reveal>

      {/* FILTERED OR SEARCH VIEW */}
      {filteredPosts !== null ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 border-b border-border/60 pb-6">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {locale === "bn" ? "ক্যাটাগরি ব্রাউজ করছেন" : "BROWSING CATEGORY"}
            </span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Heading
                  as="h2"
                  size="h2"
                  className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground"
                >
                  {activeCategory !== "All"
                    ? (t.categories[activeCategory] ?? activeCategory)
                    : (locale === "bn" ? "অনুসন্ধানের ফলাফল" : "Search Results")}
                </Heading>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1 block">
                  {filteredPosts.length} {locale === "bn" ? "টি প্রতিবেদন" : "Posts"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="font-heading text-xs font-semibold uppercase tracking-wider text-primary hover:underline cursor-pointer self-start sm:self-auto"
              >
                {locale === "bn" ? "সবগুলো দেখুন (রিসেট)" : "Reset Filter"}
              </button>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base">
                {locale === "bn"
                  ? "কোনো প্রতিবেদন পাওয়া যায়নি। ভিন্ন কি-ওয়ার্ড দিয়ে আবার অনুসন্ধান করুন।"
                  : "No articles matched your filter. Try searching with different terms."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border/60">
              {filteredPosts.map((post) => {
                const isBn = locale === "bn";
                const title = isBn && post.titleBn ? post.titleBn : post.title;
                const excerpt = isBn && post.excerptBn ? post.excerptBn : post.excerpt;
                const href = localeHref(locale, `/blog#${post.id}`);
                const categoryLabel = t.categories[post.category] ?? post.category;

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center py-7 sm:py-9 transition-colors"
                  >
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

                    <div className="flex flex-1 flex-col justify-center gap-2.5 sm:gap-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                        <span className="h-0.5 w-4 rounded-full bg-primary/80" />
                        <span>{categoryLabel}</span>
                      </div>

                      <Heading
                        as="h3"
                        size="h4"
                        className="font-heading font-bold text-foreground transition-colors duration-200 group-hover:text-primary leading-snug"
                      >
                        <Link href={href}>{title}</Link>
                      </Heading>

                      <Text
                        size="sm"
                        className="line-clamp-2 text-muted-foreground leading-relaxed"
                      >
                        {excerpt}
                      </Text>

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
          )}
        </div>
      ) : (
        /* FULL MAGAZINE LAYOUT MATCHING SCREENSHOT */
        <div className="flex flex-col gap-14 sm:gap-20">
          {/* Main Hero Spotlight Grid */}
          <Reveal>
            <BlogHeroGrid
              mainFeatured={heroMain}
              topTwo={heroTopTwo}
              listFour={heroListFour}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* High-Impact Middle Banner */}
          <Reveal>
            <BlogPromoBanner locale={locale} promo={t.promo} />
          </Reveal>

          {/* 1. Architecture News (4 cards) */}
          <Reveal>
            <BlogSectionRow
              id="architecture"
              title={t.sections.architecture}
              description={t.sections.architectureDesc}
              viewAllText={t.viewAll}
              layout="4-cards"
              posts={architecturePosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 2. Awards & Recognition / Lifestyle News (Featured Left + 3 Right) */}
          <Reveal>
            <BlogSectionRow
              id="lifestyle"
              title={t.sections.lifestyle}
              description={t.sections.lifestyleDesc}
              viewAllText={t.viewAll}
              layout="featured-left"
              posts={lifestylePosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 3. Company Information & Legal Advisory News (4 Cards) */}
          <Reveal>
            <BlogSectionRow
              id="advisory"
              title={t.sections.advisory}
              description={t.sections.advisoryDesc}
              viewAllText={t.viewAll}
              layout="4-cards"
              posts={advisoryPosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 4. Economy News (3 Left + Featured Right) */}
          <Reveal>
            <BlogSectionRow
              id="economy"
              title={t.sections.economy}
              description={t.sections.economyDesc}
              viewAllText={t.viewAll}
              layout="featured-right"
              posts={economyPosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 5. Real Estate News (4 Cards) */}
          <Reveal>
            <BlogSectionRow
              id="real-estate"
              title={t.sections.realEstate}
              description={t.sections.realEstateDesc}
              viewAllText={t.viewAll}
              layout="4-cards"
              posts={realEstatePosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 6. Technology News (Featured Left + 3 Right) */}
          <Reveal>
            <BlogSectionRow
              id="technology"
              title={t.sections.technology}
              description={t.sections.technologyDesc}
              viewAllText={t.viewAll}
              layout="featured-left"
              posts={technologyPosts}
              locale={locale}
              categories={t.categories}
              formatDate={formatDate}
              labels={labels}
            />
          </Reveal>

          {/* 7. Newsletter Briefing */}
          <Reveal>
            <BlogNewsletter newsletter={t.newsletter} />
          </Reveal>
        </div>
      )}
    </div>
  );
}
