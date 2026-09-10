"use client";

import { useState } from "react";
import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Eyebrow, Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { shimmerDataUrl } from "@/lib/image";
import { VideoLightbox } from "@/components/media/video-lightbox";

export interface ShowcaseDict {
  eyebrow: string;
  title: string;
  description: string;
  play: string;
  duration: string;
  poster?: string;
  video?: string;
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
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section
        onClick={() => setOpenModal(true)}
        className="group relative isolate min-h-[70svh] overflow-hidden bg-black sm:min-h-[80svh] cursor-pointer"
      >
        <Image
          src={poster}
          alt={dict.title}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20"
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
          aria-label={`${dict.play}: ${dict.title}`}
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
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
      </section>

      <VideoLightbox
        url={openModal ? video : null}
        title={dict.title}
        closeLabel="Close video"
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

