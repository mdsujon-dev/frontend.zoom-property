import { AppContainer } from "@/components/common/app-container";
import { OrnamentDivider } from "@/components/common/ornament-divider";
import { SectionHeading } from "@/components/common/section-heading";
import { VideoCarousel } from "@/components/pages/home/video-carousel";
import { homeVideos, videoSectionBackdrop } from "@/data/videos";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

/**
 * Home Video Carousel Section.
 *
 * Displays curated architectural and walkthrough videos with Zoom IT & Zoom Property
 * YouTube integration, layered over a luxury background image.
 * Inline playback replaces the thumbnail on click — no annoying auto-opening drawers.
 */
export async function VideoSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.videoSection;

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center bg-fixed py-20 max-md:bg-scroll sm:py-28"
      style={{ backgroundImage: `url(${videoSectionBackdrop})` }}
    >
      {/* Dark gradient backdrop scrim */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/90 via-black/80 to-black/95"
      />

      {/* Subtle ambient lighting glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 -z-10 size-96 rounded-full bg-primary/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 -z-10 size-96 rounded-full bg-brand/15 blur-[140px]"
      />

      <AppContainer>
        <SectionHeading title={t.title} align="center" tone="inverse" />

        <OrnamentDivider tone="inverse" className="mt-7" />

        <div className="mt-12">
          <VideoCarousel videos={homeVideos} locale={locale} dict={t} />
        </div>
      </AppContainer>
    </section>
  );
}
