import Link from "next/link";
import { Icon } from "@/components/common/icon";
import type { Insight } from "@/data/insights";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import {
  BlogFeaturedOverlayCard,
  BlogHorizontalCard,
  BlogStandardCard,
} from "./blog-card";

export type BlogSectionLayout =
  | "2-cards"
  | "4-cards"
  | "featured-left"
  | "featured-right";

interface BlogSectionRowProps {
  id: string;
  title: string;
  description?: string;
  viewAllText: string;
  layout: BlogSectionLayout;
  posts: Insight[];
  locale: Locale;
  categories: Record<string, string>;
  formatDate: (date: string) => string;
  labels: {
    readMore: string;
    minRead: string;
  };
}

export function BlogSectionRow({
  id,
  title,
  description,
  viewAllText,
  layout,
  posts,
  locale,
  categories,
  formatDate,
  labels,
}: BlogSectionRowProps) {
  if (!posts.length) return null;

  return (
    <section id={id} className="flex flex-col gap-6 pt-10 border-t border-border/60">
      {/* Section Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <Link
          href={localeHref(locale, `/blog/category/${id}`)}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          <span>{viewAllText}</span>
          <Icon name="arrowRight" size="xs" />
        </Link>
      </div>

      {/* Dynamic Content Grid */}
      {layout === "2-cards" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.slice(0, 2).map((post) => (
            <BlogStandardCard
              key={post.id}
              insight={post}
              locale={locale}
              categoryLabel={categories[post.category] ?? post.category}
              formattedDate={formatDate(post.date)}
              readMoreLabel={labels.readMore}
              minReadLabel={labels.minRead}
            />
          ))}
        </div>
      )}

      {layout === "4-cards" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((post) => (
            <BlogStandardCard
              key={post.id}
              insight={post}
              locale={locale}
              categoryLabel={categories[post.category] ?? post.category}
              formattedDate={formatDate(post.date)}
              readMoreLabel={labels.readMore}
              minReadLabel={labels.minRead}
            />
          ))}
        </div>
      )}

      {layout === "featured-left" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Featured Large Card */}
          <div className="lg:col-span-6 flex">
            {posts[0] && (
              <BlogFeaturedOverlayCard
                insight={posts[0]}
                locale={locale}
                categoryLabel={categories[posts[0].category] ?? posts[0].category}
                formattedDate={formatDate(posts[0].date)}
                readMoreLabel={labels.readMore}
                minReadLabel={labels.minRead}
                className="w-full min-h-[380px] lg:min-h-[420px]"
              />
            )}
          </div>

          {/* 3 Horizontal Items on Right */}
          <div className="flex flex-col justify-between gap-3.5 lg:col-span-6">
            {posts.slice(1, 4).map((post) => (
              <BlogHorizontalCard
                key={post.id}
                insight={post}
                locale={locale}
                categoryLabel={categories[post.category] ?? post.category}
                formattedDate={formatDate(post.date)}
                minReadLabel={labels.minRead}
              />
            ))}
          </div>
        </div>
      )}

      {layout === "featured-right" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* 3 Horizontal Items on Left */}
          <div className="order-2 lg:order-1 flex flex-col justify-between gap-3.5 lg:col-span-6">
            {posts.slice(1, 4).map((post) => (
              <BlogHorizontalCard
                key={post.id}
                insight={post}
                locale={locale}
                categoryLabel={categories[post.category] ?? post.category}
                formattedDate={formatDate(post.date)}
                minReadLabel={labels.minRead}
              />
            ))}
          </div>

          {/* Featured Large Card on Right */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex">
            {posts[0] && (
              <BlogFeaturedOverlayCard
                insight={posts[0]}
                locale={locale}
                categoryLabel={categories[posts[0].category] ?? posts[0].category}
                formattedDate={formatDate(posts[0].date)}
                readMoreLabel={labels.readMore}
                minReadLabel={labels.minRead}
                className="w-full min-h-[380px] lg:min-h-[420px]"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
