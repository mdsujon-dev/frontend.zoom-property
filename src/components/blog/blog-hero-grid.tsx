import type { Insight } from "@/data/insights";
import type { Locale } from "@/i18n/config";
import {
  BlogFeaturedOverlayCard,
  BlogHorizontalCard,
  BlogStandardCard,
} from "./blog-card";

interface BlogHeroGridProps {
  mainFeatured: Insight;
  topTwo: Insight[];
  listFour: Insight[];
  locale: Locale;
  categories: Record<string, string>;
  formatDate: (date: string) => string;
  labels: {
    readMore: string;
    minRead: string;
  };
}

export function BlogHeroGrid({
  mainFeatured,
  topTwo,
  listFour,
  locale,
  categories,
  formatDate,
  labels,
}: BlogHeroGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column: Big Featured Story Card */}
      <div className="lg:col-span-6 xl:col-span-5 flex">
        <BlogFeaturedOverlayCard
          insight={mainFeatured}
          locale={locale}
          categoryLabel={categories[mainFeatured.category] ?? mainFeatured.category}
          formattedDate={formatDate(mainFeatured.date)}
          readMoreLabel={labels.readMore}
          minReadLabel={labels.minRead}
          priority
          className="w-full min-h-[460px] lg:min-h-[580px]"
        />
      </div>

      {/* Right Column: 2 Top Cards + 4 Bottom List Items */}
      <div className="flex flex-col gap-6 lg:col-span-6 xl:col-span-7">
        {/* Top: 2 Medium Grid Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {topTwo.map((item) => (
            <BlogStandardCard
              key={item.id}
              insight={item}
              locale={locale}
              categoryLabel={categories[item.category] ?? item.category}
              formattedDate={formatDate(item.date)}
              readMoreLabel={labels.readMore}
              minReadLabel={labels.minRead}
            />
          ))}
        </div>

        {/* Bottom: 4 Horizontal Compact Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {listFour.map((item) => (
            <BlogHorizontalCard
              key={item.id}
              insight={item}
              locale={locale}
              categoryLabel={categories[item.category] ?? item.category}
              formattedDate={formatDate(item.date)}
              minReadLabel={labels.minRead}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
