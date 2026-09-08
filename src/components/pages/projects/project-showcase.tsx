"use client";

import { useCallback, useState } from "react";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { Icon } from "@/components/common/icon";
import { ImageFrame } from "@/components/media/image-frame";
import { cn } from "@/lib/utils";

export interface ProjectShowcaseLabels {
  fullscreen: string;
  priceLabel: string;
}

/**
 * The top of a project page: the building at full width and the rest of the
 * set as a strip under it.
 *
 * Full width rather than a column with thumbnails beside it, because a
 * development is sold on the elevation — the one photograph that shows what
 * will be standing there. Cropping it to two thirds of the page to make room
 * for four small frames spends the best asset on the least useful one.
 *
 * The strip is deliberately small and horizontal. It says "there are more" and
 * gives a way in; it is not trying to be the gallery, which is what the
 * lightbox is for.
 *
 * The walkthrough is not here: it is a section of its own further down the
 * page, where a visitor who has read the stage and the write-up arrives ready
 * to spend four minutes on it.
 */
export function ProjectShowcase({
  images,
  alt,
  title,
  subtitle,
  price,
  priceNote,
  badges,
  action,
  labels,
  className,
}: {
  images: string[];
  alt: string;
  title: React.ReactNode;
  subtitle: string;
  price: string;
  priceNote?: string;
  badges?: React.ReactNode;
  action?: React.ReactNode;
  labels: ProjectShowcaseLabels;
  className?: string;
}) {
  const [index, setIndex] = useState(-1);
  const close = useCallback(() => setIndex(-1), []);

  const slides: SlideImage[] = images.map((src, position) => ({
    src,
    alt: position === 0 ? alt : `${alt} — ${position + 1}`,
  }));

  return (
    <>
      <div className={cn("flex flex-col gap-4", className)}>
        <div className="relative isolate overflow-hidden rounded-2xl">
          <button
            type="button"
            onClick={() => setIndex(0)}
            aria-label={labels.fullscreen}
            className="group block w-full cursor-pointer"
          >
            <ImageFrame
              src={images[0]}
              alt={alt}
              ratio="video"
              rounded="2xl"
              hover="zoom"
              sizes="100vw"
            />

            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/85 via-black/20 to-black/45"
            />
          </button>

          {badges ? (
            <div className="pointer-events-none absolute top-4 left-4 flex flex-wrap items-center gap-2">
              {badges}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIndex(0)}
            className="absolute top-4 right-4 flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/70"
          >
            <Icon name="expand" size="xs" />
            {labels.fullscreen}
          </button>

          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 flex-col gap-1">
              {title}
              <span className="flex items-center gap-1.5 text-sm text-white/80">
                <Icon name="location" size="xs" />
                {subtitle}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-3">
              <span className="flex flex-col sm:items-end">
                <span className="text-[10px] font-semibold tracking-wider text-white/60 uppercase">
                  {labels.priceLabel}
                </span>
                <span className="font-heading text-xl font-bold text-white sm:text-2xl">
                  {price}
                </span>
                {priceNote ? (
                  <span className="text-[11px] text-white/60">{priceNote}</span>
                ) : null}
              </span>

              {action}
            </div>
          </div>
        </div>

        {/* The strip. Every frame including the first, so a visitor can get
            back to the photograph the banner opened on. There is no button
            beside it: each tile already opens the same lightbox, and the
            banner carries the one fullscreen control the page needs. */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {images.map((src, position) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={`${alt} — ${position + 1}`}
              className="cursor-pointer overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <ImageFrame
                src={src}
                alt=""
                ratio="4/3"
                rounded="xl"
                hover="zoom"
                sizes="(min-width: 640px) 18vw, 30vw"
              />
            </button>
          ))}
        </div>

      </div>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={close}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter]}
        carousel={{ finite: false, padding: 0 }}
        thumbnails={{ border: 0, borderRadius: 8, padding: 0, gap: 8 }}
        animation={{ fade: 250, swipe: 400 }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .92)" } }}
      />

    </>
  );
}
