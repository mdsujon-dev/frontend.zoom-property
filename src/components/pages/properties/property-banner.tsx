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

export interface PropertyBannerLabels {
  /** Button over the main photograph. */
  fullscreen: string;
  /** Wide button under the thumbnails, with `{count}` in it. */
  openGallery: string;
  /** Prefix on the price, e.g. "Asking price". */
  priceLabel: string;
}

/**
 * The listing banner: one large photograph carrying the name and the price,
 * with the rest of the set stacked beside it.
 *
 * The overlay is where the identity of the listing lives — badges top left,
 * title and address bottom left, price bottom right — so the first screen
 * answers "what is this and what does it cost" without scrolling. Everything
 * else on the page is detail underneath that.
 *
 * Any photograph opens the same lightbox at its own index, and so does the
 * fullscreen button. The thumbnails are a way in, not a separate gallery: a
 * second grid further down the page would make people scroll to find what the
 * banner already showed them.
 *
 * The scrim is a gradient rather than a flat wash — text sits over the bottom
 * third, and dimming the whole photograph to protect two lines of it wastes the
 * photograph, which on a property page is most of the argument.
 */
export function PropertyBanner({
  images,
  alt,
  title,
  subtitle,
  price,
  priceNote,
  badges,
  labels,
  action,
  className,
}: {
  images: string[];
  /** Base alt text; each slide gets its position appended. */
  alt: string;
  title: React.ReactNode;
  subtitle: string;
  price: string;
  priceNote?: string;
  badges?: React.ReactNode;
  labels: PropertyBannerLabels;
  /** Call button, rendered next to the price. */
  action?: React.ReactNode;
  className?: string;
}) {
  const [index, setIndex] = useState(-1);
  const close = useCallback(() => setIndex(-1), []);

  const slides: SlideImage[] = images.map((src, position) => ({
    src,
    alt: position === 0 ? alt : `${alt} — ${position + 1}`,
  }));

  // Four is what the column fits at two-up; a fifth would either shrink the
  // rows or push the button off the bottom of the banner.
  const thumbs = images.slice(1, 5);

  return (
    <>
      <div className={cn("grid gap-4 lg:grid-cols-[1.75fr_1fr]", className)}>
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
              ratio="3/2"
              rounded="2xl"
              hover="zoom"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />

            <span
              aria-hidden
              className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/85 via-black/25 to-black/40"
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

          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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

        {thumbs.length > 0 ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 lg:flex-1">
              {thumbs.map((src, position) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(position + 1)}
                  aria-label={`${alt} — ${position + 2}`}
                  className="group/thumb cursor-pointer overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <ImageFrame
                    src={src}
                    alt=""
                    ratio="4/3"
                    rounded="xl"
                    hover="zoom"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="h-full"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIndex(0)}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 font-heading text-xs font-bold tracking-wider text-background uppercase transition-colors hover:bg-primary"
            >
              <Icon name="expand" size="xs" />
              {labels.openGallery.replace("{count}", String(images.length))}
            </button>
          </div>
        ) : null}
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
