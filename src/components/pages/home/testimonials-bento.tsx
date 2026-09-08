import { AppContainer } from "@/components/common/app-container";
import { OrnamentDivider } from "@/components/common/ornament-divider";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/data/people";
import { getDictionary } from "@/i18n/dictionaries";

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
  const dict = await getDictionary();
  const t = dict.reviews;

  const videoReviews = reviews.filter((review) => review.video);
  if (videoReviews.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <AppContainer>
        <SectionHeading
          title={t.homeTitle}
          titleClassName="whitespace-nowrap"
          align="center"
        />

        <OrnamentDivider className="mt-7" />

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
