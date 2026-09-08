"use client";

import { useMemo, useState } from "react";

import { Heading } from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import type { Insight } from "@/data/insights";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/motion/reveal";
import { BlogCategoryFilter } from "./blog-category-filter";
import { BlogGridCard } from "./blog-grid-card";
import { BlogNewsletter } from "./blog-newsletter";

interface BlogFeedProps {
  insights: Insight[];
  locale: Locale;
  t: {
    all: string;
    categories: Record<string, string>;
    readMore: string;
    minRead: string;
    searchPlaceholder: string;
    categoriesPrev: string;
    categoriesNext: string;
    postsCount: string;
    loadMore: string;
    noResults: string;
    resetFilter: string;
    article: { by: string };
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

/** How many articles the grid opens with, and how many each press adds. */
const PAGE_SIZE = 9;

/**
 * The all-articles index.
 *
 * Category pills and a search box, then every article in one even grid. The
 * page used to open with a magazine layout — a hero spotlight, then a row per
 * category — which answers "what should I read?" but not "where is the piece
 * about X?", and this is the page people arrive at with the second question.
 * The editorial layouts still exist as components and still run on the category
 * pages.
 *
 * Filtering is client-side because the whole corpus is a static array that is
 * already in the bundle; a round trip to filter it would be slower than not.
 */
export function BlogFeed({ insights, locale, t }: BlogFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  // Bangla gets Bangla digits — the count sits next to Bangla words.
  const countFormatter = useMemo(
    () => new Intl.NumberFormat(LOCALE_TAGS[locale]),
    [locale],
  );

  const formatDate = (dateStr: string) => {
    try {
      return dateFormatter.format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const categories = useMemo(
    () => [
      { id: "All", label: t.all },
      { id: "Architecture", label: t.categories["Architecture"] ?? "Architecture" },
      { id: "Lifestyle", label: t.categories["Lifestyle"] ?? "Lifestyle" },
      { id: "Legal", label: t.categories["Legal"] ?? "Advisory" },
      { id: "Economy", label: t.categories["Economy"] ?? "Economy" },
      { id: "Real Estate", label: t.categories["Real Estate"] ?? "Real Estate" },
      { id: "Technology", label: t.categories["Technology"] ?? "Technology" },
    ],
    [t],
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return insights.filter((post) => {
      // Two categories are shown under a broader pill: NRB pieces are advisory
      // in everything but name, and Market pieces are real estate.
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory ||
        (activeCategory === "Legal" && post.category === "NRB") ||
        (activeCategory === "Real Estate" && post.category === "Market");

      if (!matchesCategory) return false;
      if (!q) return true;

      return [post.title, post.titleBn, post.excerpt, post.excerptBn].some(
        (field) => field?.toLowerCase().includes(q),
      );
    });
  }, [activeCategory, searchQuery, insights]);

  // A new filter is a new list, so it starts at the first page. Done where the
  // filter changes rather than in an effect: this is one event, not two states
  // that have to be synchronised afterwards.
  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setShown(PAGE_SIZE);
  };

  const search = (query: string) => {
    setSearchQuery(query);
    setShown(PAGE_SIZE);
  };

  const reset = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setShown(PAGE_SIZE);
  };

  const isFiltered = activeCategory !== "All" || searchQuery.trim() !== "";
  const visible = filtered.slice(0, shown);

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      <Reveal>
        <BlogCategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          searchQuery={searchQuery}
          onSearchChange={search}
          searchPlaceholder={t.searchPlaceholder}
          scrollPrevLabel={t.categoriesPrev}
          scrollNextLabel={t.categoriesNext}
        />
      </Reveal>

      {/* The count is always there; the title and the reset only once a filter
          is doing something, so the default view opens straight into the grid. */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-5">
        <div className="flex flex-col gap-1">
          {isFiltered ? (
            <Heading as="h2" size="h4" className="font-heading font-bold">
              {activeCategory !== "All"
                ? (t.categories[activeCategory] ?? activeCategory)
                : t.all}
            </Heading>
          ) : null}

          <span className="text-sm text-muted-foreground">
            {countFormatter.format(filtered.length)} {t.postsCount}
          </span>
        </div>

        {isFiltered ? (
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer font-heading text-xs font-semibold tracking-wider text-primary uppercase hover:underline"
          >
            {t.resetFilter}
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">{t.noResults}</p>
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {visible.map((post) => (
              <BlogGridCard
                key={post.id}
                insight={post}
                locale={locale}
                formattedDate={formatDate(post.date)}
                readMoreLabel={t.readMore}
                byLabel={t.article.by}
              />
            ))}
          </div>

          {shown < filtered.length ? (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setShown((count) => count + PAGE_SIZE)}
                className="px-8"
              >
                {t.loadMore}
              </Button>
            </div>
          ) : null}
        </>
      )}

      <Reveal>
        <BlogNewsletter newsletter={t.newsletter} />
      </Reveal>
    </div>
  );
}
