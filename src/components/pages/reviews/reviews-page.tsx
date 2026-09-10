import Link from "next/link";

import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/data/people";
import { pageBanners } from "@/data/page-banners";
import { homeVideos } from "@/data/videos";
import { LOCALE_TAGS, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ReviewsPage({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary["reviews"];
}) {
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const number = new Intl.NumberFormat(LOCALE_TAGS[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.pageTitle}
        description={t.pageDescription}
        image={t.backgroundImage || pageBanners.reviews}
      />

      <section className="border-b border-border bg-muted/30 py-10 sm:py-14">
        <AppContainer>
          <Reveal>
            <div className="flex max-w-xl items-center gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-h1 leading-none text-foreground">
                      {number.format(average)}
                    </span>
                    <span className="text-sm text-muted-foreground">{t.outOf}</span>
                  </div>
                  <div className="mt-2 flex gap-0.5" aria-label={`${number.format(average)} / 5`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon key={index} name="star" size="xs" className="fill-brand text-brand" />
                    ))}
                  </div>
                </div>
                <div className="h-12 w-px bg-border" aria-hidden />
                <Text size="sm" className="max-w-xs text-muted-foreground">
                  {t.ratingNote}
                </Text>
            </div>
          </Reveal>
        </AppContainer>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <AppContainer>
          <SectionHeading title={t.allReviewsTitle} description={t.description} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {reviews.map((review, index) => (
              <Reveal key={review.id} delay={index * 0.05}>
                <figure className="flex h-full flex-col gap-6 rounded-xl border border-border bg-card p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5" aria-label={`${review.rating} / 5`}>
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Icon key={starIndex} name="star" size="xs" className={starIndex < review.rating ? "fill-brand text-brand" : "text-border"} />
                      ))}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {t.verified}
                    </span>
                  </div>
                  <blockquote className="flex-1">
                    <Text size="lead">“{review.quote}”</Text>
                  </blockquote>
                  <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                    <Image src={review.image} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm font-semibold text-foreground">{review.name}</span>
                      <span className="text-xs text-muted-foreground">{review.role} · {review.property}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </AppContainer>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <AppContainer>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {homeVideos.slice(0, 3).map((video, index) => (
              <Reveal key={video.id} delay={index * 0.05}>
                <Link href={video.youtubeUrl} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image src={video.poster} alt={video.title} fill priority={index === 0} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
                    <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg">
                      <Icon name="play" size="sm" aria-hidden />
                    </span>
                    <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">{video.duration}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <span className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{video.category}</span>
                      <span className="font-heading text-lg leading-tight text-foreground">{video.title}</span>
                    </span>
                    <Icon name="arrowUpRight" size="sm" className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" aria-hidden />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </AppContainer>
      </section>
    </>
  );
}