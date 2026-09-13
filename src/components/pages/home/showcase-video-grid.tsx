"use client";

import Link from "next/link";
import { useState } from "react";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { VideoLightbox } from "@/components/media/video-lightbox";
import { Badge } from "@/components/ui/badge";
import type { VideoItem } from "@/data/videos";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { shimmerDataUrl } from "@/lib/image";

export function ShowcaseVideoGrid({
  videos,
  locale,
  page,
  totalPage,
  basePath,
  title,
  description,
  playLabel,
  closeLabel,
  pageParam = "page",
}: {
  videos: VideoItem[];
  locale: Locale;
  page: number;
  totalPage: number;
  basePath: string;
  title: string;
  description: string;
  playLabel: string;
  closeLabel: string;
  pageParam?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeVideo = videos.find((video) => video.id === activeId);
  const pageHref = (nextPage: number) =>
    localeHref(locale, `${basePath}?${pageParam}=${nextPage}#videos`);

  return (
    <section id="videos" className="border-t border-border bg-muted/30 py-16 sm:py-20">
      <AppContainer>
        <div className="max-w-2xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {title}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {videos.length ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => {
              const titleText = locale === "bn" ? video.titleBn : video.title;
              const descriptionText = locale === "bn" ? video.descriptionBn : video.description;
              const category = locale === "bn" ? video.categoryBn : video.category;
              const location = locale === "bn" ? video.locationBn : video.location;

              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveId(video.id)}
                  aria-label={`${playLabel}: ${locale === "bn" ? video.titleBn : video.title}`}
                  className="group flex flex-col h-full cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-card text-left transition-all duration-300 ease-out shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.16)] hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(27,35,24,0.06),0_20px_40px_-12px_rgba(75,128,45,0.3)] focus-visible:outline-2 focus-visible:outline-primary transform-gpu"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-black">
                    <Image
                      src={video.poster}
                      alt={titleText}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={shimmerDataUrl()}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/20" />
                    <Badge className="absolute left-3 top-3 border-0 bg-primary text-primary-foreground">
                      {category}
                    </Badge>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform group-hover:scale-110">
                        <Icon name="play" size="sm" className="ml-1 fill-current" />
                      </span>
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Icon name="location" size="xs" className="text-primary" />
                      {location}
                    </p>
                    <h3 className="line-clamp-2 font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                      {titleText}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {descriptionText}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">No videos found.</p>
        )}

        {totalPage > 1 ? (
          <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Video pagination">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                <Icon name="chevronLeft" size="xs" />
              </Link>
            ) : null}
            <span className="text-sm text-muted-foreground">{page} / {totalPage}</span>
            {page < totalPage ? (
              <Link href={pageHref(page + 1)} className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary">
                <Icon name="chevronRight" size="xs" />
              </Link>
            ) : null}
          </nav>
        ) : null}

        <VideoLightbox
          url={activeVideo?.youtubeUrl ?? null}
          title={activeVideo ? (locale === "bn" ? activeVideo.titleBn : activeVideo.title) : ""}
          closeLabel={closeLabel}
          onClose={() => setActiveId(null)}
        />
      </AppContainer>
    </section>
  );
}
