import type { ReactNode } from "react";
import Link from "next/link";

import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { VideoEmbed } from "@/components/media/video-embed";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { landownerStory } from "@/data/landowner";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

export async function LandownerStory() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.landowners.story;

  return (
    <section className="border-t border-border bg-background py-16 sm:py-24">
      <AppContainer className="flex flex-col gap-16 sm:gap-24">
        {/* 1 — a landowner's own words, then why that matters */}
        <Row
          media={
            <figure className="overflow-hidden rounded-2xl border border-border bg-card">
              <ImageFrame
                src={landownerStory.testimonial.portrait}
                alt=""
                ratio="4/3"
                rounded="none"
                sizes="half"
              >
                <span className="absolute left-5 top-5 rounded-lg bg-black/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                  {t.quoteLabel}
                </span>
              </ImageFrame>

              <blockquote className="flex flex-col gap-4 p-6">
                <Icon name="quote" size="lg" className="text-primary/30" />
                <Text size="base" tone="default" className="leading-relaxed">
                  “{t.quote}”
                </Text>
                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <ImageFrame
                    src={landownerStory.testimonial.image}
                    alt=""
                    ratio="square"
                    rounded="full"
                    sizes="quarter"
                    className="w-11 shrink-0"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {t.quoteName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {t.quoteRole}
                    </span>
                  </span>
                </figcaption>
              </blockquote>
            </figure>
          }
        >
          <Heading as="h2" size="h3">
            {t.whyTitle}
          </Heading>
          <Text size="base" className="leading-relaxed text-muted-foreground">
            {t.whyBody}
          </Text>
        </Row>

        {/* 2 — copy first, video second (the flip) */}
        <Row
          reverse
          media={
            <div className="flex flex-col gap-3">
              <VideoEmbed
                url={landownerStory.video.url}
                poster={landownerStory.video.poster}
                title={t.videoCaption}
                ratio="video"
              />
              <Text size="sm" className="text-muted-foreground">
                {t.videoCaption}
              </Text>
            </div>
          }
        >
          <Heading as="h2" size="h3">
            {t.differentTitle}
          </Heading>
          <Text size="base" className="leading-relaxed text-muted-foreground">
            {t.differentBody}
          </Text>
        </Row>

        {/* 3 — handover photograph, then the ask */}
        <Row
          media={
            <ImageFrame
              src={landownerStory.handover}
              alt=""
              ratio="4/3"
              rounded="2xl"
              hover="zoom"
              sizes="half"
            />
          }
        >
          <Heading as="h2" size="h3">
            {t.moreTitle}
          </Heading>
          <Text size="base" className="leading-relaxed text-muted-foreground">
            {t.moreBody}
          </Text>
          <Button size="lg" className="mt-2 w-fit" asChild>
            <Link href={localeHref(locale, "/contact")}>
              {t.moreCta}
              <Icon name="arrowRight" size="xs" />
            </Link>
          </Button>
        </Row>
      </AppContainer>
    </section>
  );
}

function Row({
  media,
  reverse = false,
  children,
}: {
  media: ReactNode;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <Reveal className={cn(reverse && "lg:order-2")}>{media}</Reveal>
      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        <div className="flex flex-col gap-4">{children}</div>
      </Reveal>
    </div>
  );
}
