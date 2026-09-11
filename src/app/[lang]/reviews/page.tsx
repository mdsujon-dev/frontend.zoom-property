import type { Metadata } from "next";

import { ReviewsPage } from "@/components/pages/reviews/reviews-page";
import { ContactCta } from "@/components/common/contact-cta";
import { localeAlternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getReviewPage } from "@/server/features/reviews";
import { getHomeVideos } from "@/server/features/videos";

/** Quotes per page. Two columns, so an even number keeps the grid square. */
const PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.reviews.metaTitle,
    description: dict.reviews.metaDescription,
    alternates: localeAlternates(locale, "/reviews"),
  };
}

export default async function ReviewsRoute({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const query = await searchParams;
  // `?page=abc` is a URL somebody edited; treat it as the first page rather
  // than passing NaN down.
  const requested = Number.parseInt(query.page ?? "1", 10);

  const [dict, locale, page, videos] = await Promise.all([
    getDictionary(),
    getLocale(),
    getReviewPage(Number.isFinite(requested) ? requested : 1, PER_PAGE),
    getHomeVideos(3),
  ]);

  return (
    <>
      <ReviewsPage locale={locale} t={dict.reviews} page={page} videos={videos} />
      <ContactCta />
    </>
  );
}
