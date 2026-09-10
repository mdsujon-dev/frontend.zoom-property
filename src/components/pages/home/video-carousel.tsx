"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "@/components/common/image";
import { Icon } from "@/components/common/icon";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { VideoLightbox } from "@/components/media/video-lightbox";
import type { VideoItem } from "@/data/videos";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface VideoCarouselDict {
  play?: string;
  close?: string;
  verified?: string;
  prev?: string;
  next?: string;
  channelAction?: string;
}

export interface VideoCarouselProps {
  videos: VideoItem[];
  locale: string;
  dict?: VideoCarouselDict;
}

export function VideoCarousel({ videos, locale, dict }: VideoCarouselProps) {
  const isBn = locale === "bn";
  const prevLabel = dict?.prev ?? (isBn ? "পূর্ববর্তী ভিডিও" : "Previous video");
  const nextLabel = dict?.next ?? (isBn ? "পরবর্তী ভিডিও" : "Next video");
  const playLabel = dict?.play ?? (isBn ? "ভিডিও দেখুন" : "Play Video");
  const closeLabel = dict?.close ?? (isBn ? "ভিডিও বন্ধ করুন" : "Close Player");
  const verifiedLabel = dict?.verified ?? (isBn ? "ভেরিফাইড ওয়াকথ্রু" : "Verified Walkthrough");

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeVideo = videos.find((video) => video.id === activeId) ?? null;

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div className="relative w-full">
      {/* Navigation Header / Controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          <span className="size-2 rounded-full bg-brand animate-pulse" />
          <span>
            {String(current + 1).padStart(2, "0")} / {String(count || videos.length).padStart(2, "0")}
          </span>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label={prevLabel}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-sky-400 hover:bg-sky-500 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon name="chevronLeft" size="sm" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label={nextLabel}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-sky-400 hover:bg-sky-500 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon name="chevronRight" size="sm" />
          </button>
        </div>
      </div>

      {/* Main Carousel Slider */}
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {videos.map((video) => {
            const title = locale === "bn" ? video.titleBn : video.title;
            const description = locale === "bn" ? video.descriptionBn : video.description;
            const category = locale === "bn" ? video.categoryBn : video.category;
            const location = locale === "bn" ? video.locationBn : video.location;

            return (
              <CarouselItem
                key={video.id}
                className="basis-full pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-sky-400/50 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-sky-500/10">
                  {/* Top: poster only. Playback moved to the dialog — a quarter-width
                      card is too small to actually watch a walkthrough in. */}
                  <div className="relative h-[225px] w-full overflow-hidden bg-black sm:h-[240px]">
                    <Image
                      src={video.poster}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl()}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Gradient Scrims */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/40"
                    />

                    {/* Badges on poster */}
                    <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-brand" />
                        {category}
                      </span>

                      <span className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-md tabular-nums">
                        <Icon name="clock" size="xs" />
                        {video.duration}
                      </span>
                    </div>

                    {/* Play affordance — decorative; the whole card is the button. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="relative flex size-14 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md shadow-xl transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-sky-400 group-hover:bg-sky-500 sm:size-16">
                        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-60 group-hover:bg-sky-400/40" />
                        <Icon
                          name="play"
                          size="md"
                          className="ml-1 fill-white text-white transition-transform group-hover:scale-110"
                        />
                      </span>
                    </span>
                  </div>

                  {/* Bottom: Info & Details */}
                  <div className="flex flex-col gap-2.5 p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1.5 font-medium text-white/80">
                        <Icon name="location" size="xs" className="text-brand" />
                        {location}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <Icon name="approved" size="xs" />
                        {verifiedLabel}
                      </span>
                    </div>

                    <h3 className="line-clamp-2 font-heading text-base font-semibold text-white transition-colors duration-300 group-hover:text-sky-400 sm:text-lg leading-snug">
                      {title}
                    </h3>

                    <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90">
                      {description}
                    </p>
                  </div>

                  {/* Stretched trigger: the whole card opens the player. Last in the
                      DOM so it sits over the scrims without a z-index war. */}
                  <button
                    type="button"
                    onClick={() => setActiveId(video.id)}
                    className="absolute inset-0 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    <span className="sr-only">{`${playLabel}: ${title}`}</span>
                  </button>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Slide dots indicator below */}
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === index
                  ? "w-8 bg-sky-400 shadow-sm shadow-sky-400/50"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      )}

      <VideoLightbox
        url={activeVideo?.youtubeUrl ?? null}
        title={
          activeVideo
            ? locale === "bn"
              ? activeVideo.titleBn
              : activeVideo.title
            : ""
        }
        closeLabel={closeLabel}
        onClose={() => setActiveId(null)}
      />
    </div>
  );
}
