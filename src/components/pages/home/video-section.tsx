import { AppContainer } from "@/components/common/app-container";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { VideoCarousel } from "@/components/pages/home/video-carousel";
import { homeVideos, videoSectionBackdrop, zoomItYoutubeChannel } from "@/data/videos";
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
        <SectionHeading
          title={t.title}
          tone="inverse"
          action={
            <a
              href={zoomItYoutubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-heading text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-lg transition-all hover:border-primary hover:bg-primary"
            >
              <Icon name="youtube" size="sm" className="text-red-500" />
              <span>{t.channelAction}</span>
            </a>
          }
        />

        <div className="mt-12">
          <VideoCarousel videos={homeVideos} locale={locale} dict={t} />
        </div>
      </AppContainer>
    </section>
  );
}
