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
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ImageFrame } from "@/components/media/image-frame";
import type { AspectRatio } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export interface GalleryProps {
  images: GalleryImage[];
  columns?: keyof typeof COLUMNS;
  ratio?: AspectRatio;
  className?: string;
}

/**
 * Responsive image grid with a full-screen lightbox (zoom, thumbnails,
 * counter, keyboard + swipe navigation). Grid thumbnails go through
 * `next/image`; the lightbox loads the full-size source on open.
 */
export function Gallery({
  images,
  columns = 3,
  ratio = "4/3",
  className,
}: GalleryProps) {
  const [index, setIndex] = useState(-1);

  const slides: SlideImage[] = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    description: image.caption,
  }));

  const close = useCallback(() => setIndex(-1), []);

  return (
    <>
      <Stagger className={cn("grid grid-cols-1 gap-4", COLUMNS[columns], className)}>
        {images.map((image, i) => (
          <StaggerItem key={image.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open image: ${image.alt}`}
              className="group/item w-full cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <ImageFrame
                src={image.src}
                alt={image.alt}
                ratio={ratio}
                hover="zoom"
                sizes="third"
              >
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100">
                  <span className="rounded-full bg-white/90 p-3 text-black">
                    <Icon name="expand" size="md" />
                  </span>
                </span>
              </ImageFrame>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

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
