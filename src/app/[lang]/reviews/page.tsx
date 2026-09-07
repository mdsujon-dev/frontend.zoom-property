import type { Metadata } from "next";

import { ReviewsPage } from "@/components/pages/reviews/reviews-page";
import { localeAlternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.reviews.metaTitle,
    description: dict.reviews.metaDescription,
    alternates: localeAlternates(locale, "/reviews"),
  };
}

export default async function ReviewsRoute() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return <ReviewsPage locale={locale} t={dict.reviews} />;
}