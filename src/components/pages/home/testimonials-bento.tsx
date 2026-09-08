import { AppContainer } from "@/components/common/app-container";
import { Icon } from "@/components/common/icon";
import { OrnamentDivider } from "@/components/common/ornament-divider";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/data/people";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LOCALE_TAGS } from "@/i18n/config";

import { ReviewVideoCarousel } from "./review-video-carousel";

/**
 * One shadow for every card.
 *
 * Tinted with `primary` rather than black: on the near-white section a neutral
 * shadow just greys the edge, while a trace of the brand hue reads as the card
 * lifting off the page.
 *
 * Wide and faint rather than tight and dark — a big blur with a negative spread
 * puts the whole pool under the card instead of drawing a second outline around
 * it, so the border stays the only hard edge on the tile.
 */
const CARD_SHADOW = "shadow-[0_26px_60px_-28px] shadow-primary/45";

/**
 * Client reviews on the home page — filmed ones only.
 *
 * A face saying it outweighs the same sentence set in type, so the home page
 * shows nothing but video and slides through the set. Written reviews still
 * exist and still have a home on `/reviews`; the filter is what keeps a review
 * without a recording from silently rendering as a black card here.
 */
export async function TestimonialsBento() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.reviews;

  const videoReviews = reviews.filter((review) => review.video);
  if (videoReviews.length === 0) return null;

  const average =
    videoReviews.reduce((sum, r) => sum + r.rating, 0) / videoReviews.length;
  const number = new Intl.NumberFormat(LOCALE_TAGS[locale], {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <AppContainer>
        <SectionHeading
          title={t.homeTitle}
          titleClassName="whitespace-nowrap"
          align="center"
        />

        <OrnamentDivider className="mt-7" />

        {/* The average, as one line rather than a card — it is a caption on the
            reviews below, not a claim that needs its own tile. */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm">
          <Stars value={Math.round(average)} />
          <span className="font-semibold text-foreground">
            {number.format(average)}{" "}
            <span className="font-normal text-muted-foreground">{t.outOf}</span>
          </span>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <Text as="span" size="sm">
            {videoReviews.length} {t.reviewCount}
          </Text>
        </div>

        <Reveal className="mt-12">
          <ReviewVideoCarousel
            reviews={videoReviews}
            cardClassName={CARD_SHADOW}
            labels={{ play: t.playVideo, close: t.closeVideo }}
          />
        </Reveal>
      </AppContainer>
    </section>
  );
}

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
