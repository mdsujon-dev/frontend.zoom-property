"use client";

import { useMemo, useRef, useState } from "react";

import { Heading } from "@/components/common/heading";
import type { Insight } from "@/data/insights";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import { Reveal } from "@/components/motion/reveal";
import { BlogCategoryFilter } from "./blog-category-filter";
import { BlogGridCard } from "./blog-grid-card";
import { BlogPagination } from "./blog-pagination";

interface BlogFeedProps {
  insights: Insight[];
  backendCategories: string[];
  locale: Locale;
  t: {
    all: string;
    categories: Record<string, string>;
    readMore: string;
    minRead: string;
    searchPlaceholder: string;
    categoriesPrev: string;
    categoriesNext: string;
    noResults: string;
    resetFilter: string;
    prevPage: string;
    nextPage: string;
    pageLabel: string;
    pageOf: string;
    article: { by: string };
  };
}

/** Articles per page — three rows of the three-up grid. */
const PER_PAGE = 9;

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
 * Every match is rendered — no pagination. The corpus is a static array that is
 * already in the bundle, so filtering is client-side and there is nothing to
 * fetch that a "load more" would be hiding.
 */
export function BlogFeed({ insights, backendCategories, locale, t }: BlogFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);
  const gridTop = useRef<HTMLDivElement>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [locale],
  );

  const formatDate = (dateStr: string) => {
    try {
      return dateFormatter.format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const categories = useMemo(() => {
    // We could receive backendCategories from props. For now, let's assume it's passed in.
    return [
      { id: "All", label: t.all },
      ...(backendCategories?.map(c => ({ id: c, label: t.categories[c] ?? c })) || [])
    ];
  }, [t, backendCategories]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return insights.filter((post) => {
      // Two categories are shown under a broader pill: NRB pieces are advisory
      // in everything but name, and Market pieces are real estate.
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory;

      if (!matchesCategory) return false;
      if (!q) return true;

      return [post.title, post.titleBn, post.excerpt, post.excerptBn].some(
        (field) => field?.toLowerCase().includes(q),
      );
    });
  }, [activeCategory, searchQuery, insights]);

  // Every filter change is a new list, so it starts on page one. Done in the
  // handlers rather than an effect: this is one event, not two states to
  // reconcile after the fact.
  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setPage(1);
  };

  const search = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const reset = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setPage(1);
  };

  const goToPage = (next: number) => {
    setPage(next);
    // Otherwise page two opens at the bottom of page one.
    gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isFiltered = activeCategory !== "All" || searchQuery.trim() !== "";
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  // A filter can shrink the list under the page someone is on.
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <div ref={gridTop} className="flex flex-col gap-10 sm:gap-12 scroll-mt-28">
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

      {/* Only once a filter is doing something: the default view goes straight
          from the pills into the grid. */}
      {isFiltered ? (
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border/60 pb-5">
          <Heading as="h2" size="h4" className="font-heading font-bold">
            {activeCategory !== "All"
              ? (t.categories[activeCategory] ?? activeCategory)
              : t.all}
          </Heading>

          <button
            type="button"
            onClick={reset}
            className="cursor-pointer font-heading text-xs font-semibold tracking-wider text-primary uppercase hover:underline"
          >
            {t.resetFilter}
          </button>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">{t.noResults}</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
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
      )}

      <BlogPagination
        current={current}
        total={totalPages}
        onSelect={goToPage}
        labels={{
          prev: t.prevPage,
          next: t.nextPage,
          page: t.pageLabel,
          pageOf: t.pageOf,
        }}
      />
    </div>
  );
}
