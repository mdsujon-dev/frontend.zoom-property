"use client";

import { useState } from "react";
import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Eyebrow, Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { embedUrl, parseVideoId } from "@/lib/video";
import { shimmerDataUrl } from "@/lib/image";

export interface ShowcaseDict {
  eyebrow: string;
  title: string;
  description: string;
  play: string;
  duration: string;
}

export function CinematicShowcase({
  poster,
  video,
  dict,
}: {
  poster: string;
  video: string;
  dict: ShowcaseDict;
}) {
  const [playing, setPlaying] = useState(false);
  const id = parseVideoId(video, "youtube");

  return (
    <section className="relative isolate min-h-[70svh] overflow-hidden bg-black sm:min-h-[80svh]">
      {playing ? (
        <iframe
          src={embedUrl(id, "youtube")}
          title={dict.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <>
          <Image
            src={poster}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={shimmerDataUrl()}
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20"
          />

          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${dict.play}: ${dict.title}`}
            className="group absolute inset-0 z-10 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <span className="relative flex size-20 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:size-24">
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-white/20"
              />
              <Icon name="play" size="lg" className="ml-1 fill-white text-white" />
            </span>
          </button>

          <AppContainer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-12 sm:pb-16">
            <div className="flex max-w-2xl flex-col gap-3">
              <Eyebrow className="text-white/70">{dict.eyebrow}</Eyebrow>
              <Heading as="h2" size="h2" className="text-white">
                {dict.title}
              </Heading>
              <Text size="lead" className="text-white/75">
                {dict.description}
              </Text>
              <span className="flex items-center gap-2 pt-1 text-sm text-white/60">
                <Icon name="clock" size="xs" />
                {dict.duration}
              </span>
            </div>
          </AppContainer>
        </>
      )}
    </section>
  );
}
