import type { ReactNode } from "react";
import Link from "next/link";

import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
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
        {/* 1 — photograph on one side, the words on the other */}
        <Row
          media={
            <ImageFrame
              src={landownerStory.testimonial.portrait}
              alt={`${t.quoteName} — ${t.quoteRole}`}
              ratio="4/3"
              rounded="2xl"
              hover="zoom"
              sizes="half"
            />
          }
        >
          <Heading as="h2" size="h3">
            {t.whyTitle}
          </Heading>
          <Text size="base" className="leading-relaxed text-muted-foreground">
            {t.whyBody}
          </Text>
        </Row>

        {/* 2 — copy first, photograph second (the flip) */}
        <Row
          reverse
          media={
            <ImageFrame
              src={landownerStory.video.poster}
              alt={t.videoCaption}
              ratio="4/3"
              rounded="2xl"
              hover="zoom"
              sizes="half"
            />
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
