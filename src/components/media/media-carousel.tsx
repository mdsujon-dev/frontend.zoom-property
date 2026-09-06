"use client";

import type { ReactNode } from "react";

import { ImageFrame } from "@/components/media/image-frame";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { AspectRatio } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface MediaCarouselItem {
  src: string;
  alt: string;
  caption?: ReactNode;
}

const PER_VIEW = {
  1: "basis-full",
  2: "basis-full sm:basis-1/2",
  3: "basis-full sm:basis-1/2 lg:basis-1/3",
  4: "basis-full sm:basis-1/2 lg:basis-1/4",
} as const;

export interface MediaCarouselProps {
  items: MediaCarouselItem[];
  perView?: keyof typeof PER_VIEW;
  ratio?: AspectRatio;
  loop?: boolean;
  className?: string;
}

/** Draggable / swipeable media rail built on the shadcn (Embla) carousel. */
export function MediaCarousel({
  items,
  perView = 3,
  ratio = "4/3",
  loop = true,
  className,
}: MediaCarouselProps) {
  return (
    <Carousel opts={{ loop, align: "start" }} className={cn("w-full", className)}>
      <CarouselContent className="-ml-4">
        {items.map((item) => (
          <CarouselItem key={item.src} className={cn("pl-4", PER_VIEW[perView])}>
            <ImageFrame
              src={item.src}
              alt={item.alt}
              ratio={ratio}
              hover="zoom"
              sizes="third"
              overlay={Boolean(item.caption)}
            >
              {item.caption ? (
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white">
                  {item.caption}
                </figcaption>
              ) : null}
            </ImageFrame>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-3 sm:-left-5" />
      <CarouselNext className="-right-3 sm:-right-5" />
    </Carousel>
  );
}
