import Image from "next/image";

import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/data/people";
import { galleryImages } from "@/data/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LOCALE_TAGS } from "@/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Testimonials, as a mosaic rather than a carousel.
 *
 * A carousel hides most of its content behind an interaction nobody performs;
 * this puts the aggregate score, the proof photography and two full quotes on
 * screen at once. Three columns on desktop that stack to one on mobile — the
 * tall centre panel drops to a normal aspect ratio there rather than becoming a
 * letterbox.
 *
 * The score and review count are derived from the review data, not typed in, so
 * they cannot drift from the quotes shown beside them.
 */
export async function TestimonialsBento() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.reviews;

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const number = new Intl.NumberFormat(LOCALE_TAGS[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(LOCALE_TAGS[locale]);

  // The two most recent quotes get the right-hand column.
  const featured = reviews.slice(0, 2);

  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <Container>
        <SectionHeading
          title={t.title}
          align="center"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_1fr]">
          {/* Aggregate score */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-h1 leading-none text-foreground">
                  {number.format(average)}
                </span>
                <span className="text-sm text-muted-foreground">{t.outOf}</span>
              </div>

              <Text size="sm" className="text-muted-foreground">
                {t.ratingNote}
              </Text>

              <div className="mt-auto flex items-center gap-4 pt-2">
                {/* Avatar stack — negative margin overlaps them, ring separates. */}
                <ul className="flex">
                  {reviews.map((review) => (
                    <li key={review.id} className="-ml-2.5 first:ml-0">
                      <Image
                        src={review.image}
                        alt=""
                        width={40}
                        height={40}
                        className="size-9 rounded-full object-cover ring-2 ring-card"
                      />
                    </li>
                  ))}
                </ul>

                <Stars value={Math.round(average)} />
              </div>

              <Text as="span" size="xs" className="text-muted-foreground">
                {reviews.length} {t.reviewCount}
              </Text>
            </div>
          </Reveal>

          {/* Supporting photograph */}
          <Reveal delay={0.05} className="lg:col-start-1 lg:row-start-2">
            <ImageFrame
              src={galleryImages[4].src}
              alt={galleryImages[4].alt}
              ratio="4/3"
              rounded="xl"
              hover="zoom"
              sizes="third"
              className="h-full"
            />
          </Reveal>

          {/* Tall centre panel with the headline number over it */}
          <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="relative h-full min-h-72 overflow-hidden rounded-xl">
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6">
                <Icon name="quote" size="lg" className="mb-1 text-white/50" />
                <Text size="sm" className="text-white/80">
                  {t.statLabel}
                </Text>
                <span className="font-heading text-h1 leading-none text-white">
                  {percent.format(41)}%
                </span>
              </div>
            </div>
          </Reveal>

          {/* Two full quotes */}
          {featured.map((review, index) => (
            <Reveal
              key={review.id}
              delay={0.15 + index * 0.05}
              className={cn("lg:col-start-3", index === 0 ? "lg:row-start-1" : "lg:row-start-2")}
            >
              <figure className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
                <Stars value={review.rating} />

                <blockquote className="flex-1">
                  <Text size="sm" tone="default">
                    “{review.quote}”
                  </Text>
                </blockquote>

                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <Image
                    src={review.image}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 shrink-0 rounded-full object-cover"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {review.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {review.property}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Filled up to `value`, hollow after — five glyphs either way. */
function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} / 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size="xs"
          className={
            index < value
              ? "fill-brand text-brand"
              : "fill-transparent text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}
