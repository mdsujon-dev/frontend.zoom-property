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
 * The page photograph fills the banner edge to edge (`object-cover`, centred)
 * so it is never letterboxed or stretched. A primary-green gradient runs in
 * from the left where the type sits and fades out to the right, so the copy
 * always lands on a calm brand ground while the photograph itself stays
 * clear and visible on the other half.
 *
 * Kept short (~42svh): tall enough to register as a header, short enough that
 * the actual content is on screen without scrolling.
 *
 * The home page does not use this; it has its own full-height hero with the
 * search built in.
 *
 * Text is hard-coded white. It always sits on the gradient, so it must not
 * follow the theme tokens — `text-foreground` is near-black here.
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
    <section className="relative isolate flex min-h-[42svh] items-end overflow-hidden bg-primary pb-12 pt-28 sm:min-h-[46svh] sm:pb-16 sm:pt-32">
      {/* Full-bleed photo. `object-cover` fills without distortion; centred
          crop keeps the subject in frame at every viewport. */}
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

      {/* Primary ground behind the type: solid on the left, clear on the right
          so the photograph shows. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-primary via-primary/80 to-primary/20"
      />
      {/* Light foot shade so the last line of copy never sits on a bright
          patch of photo on small screens, where the copy spans the width. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-primary/60 via-transparent to-transparent"
      />

      <AppContainer>
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            {eyebrow ? (
              <span className="flex items-center gap-2 font-heading text-eyebrow font-semibold uppercase text-brand-green-light">
                <span aria-hidden className="size-1.5 rounded-full bg-brand-green-light" />
                {eyebrow}
              </span>
            ) : null}

            <Heading
              as="h1"
              size="h1"
              weight="bold"
              // Two lines at most on large screens so a long title from the
              // panel cannot push the banner taller than its design.
              className="text-white lg:line-clamp-2"
            >
              {title}
            </Heading>

            {description ? (
              <Text size="lead" className="max-w-xl text-white/95 leading-relaxed">
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
