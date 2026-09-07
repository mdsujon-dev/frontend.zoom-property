import Image from "@/components/common/image";

import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { shimmerDataUrl } from "@/lib/image";
import { ReactNode } from "react";

/**
 * The banner every inner page opens with.
 *
 * A photograph, not a tinted band — each page gets its own so the site does not
 * feel like one template with the heading swapped. Sized at roughly 45svh: tall
 * enough to register as a hero, short enough that the actual content is on
 * screen without scrolling, which a full-height hero on an inner page is not.
 *
 * The home page does not use this; it has its own full-height hero with the
 * search built in.
 *
 * Text is hard-coded white over a scrim. It always sits on a photograph, so it
 * must not follow the theme tokens — `text-foreground` is near-black here.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Page-specific photograph. */
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[45svh] items-end overflow-hidden pb-12 pt-32 sm:min-h-[52svh] sm:pb-16 sm:pt-36">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={shimmerDataUrl()}
        className="-z-10 object-cover object-center"
      />
      {/* Darkest at the foot where the type sits, so the picture still reads. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/55 to-black/35"
      />

      <AppContainer>
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-4">
            {eyebrow ? (
              // Dot + label, matching the eyebrow treatment used site-wide but
              // recoloured for a dark ground.
              <span className="flex items-center gap-2.5 font-heading text-eyebrow uppercase text-white/80">
                <span aria-hidden className="size-1.5 rounded-full bg-brand" />
                {eyebrow}
              </span>
            ) : null}

            <Heading as="h1" size="h1" className="text-white">
              {title}
            </Heading>

            {description ? (
              <Text size="lead" className="text-white/75">
                {description}
              </Text>
            ) : null}

            {children}
          </div>
        </Reveal>
      </AppContainer>
    </section>
  );
}
