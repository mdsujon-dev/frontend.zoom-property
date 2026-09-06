import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import type { Insight } from "@/data/insights";
import { cn } from "@/lib/utils";

/**
 * Article card.
 *
 * The category and date sit in a frosted pill inset on the photograph rather
 * than in a meta row under it: it fills otherwise dead space at the foot of the
 * image, and it keeps the block below the picture to title → excerpt → link,
 * which is the order the eye wants.
 *
 * The pill is `black/45 + backdrop-blur` because it lands on whatever the photo
 * happens to be — a token background would be unreadable over a bright image.
 */
export function InsightCard({
  insight,
  readTime,
  readMore,
  category,
  date,
  className,
}: {
  insight: Insight;
  /** "min read" */
  readTime: string;
  readMore: string;
  /** Localised category label. */
  category: string;
  /** Pre-formatted, so the card stays free of Intl setup. */
  date: string;
  className?: string;
}) {
  return (
    <article className={cn("group flex h-full flex-col gap-5", className)}>
      <ImageFrame
        src={insight.image}
        alt=""
        ratio="4/3"
        rounded="xl"
        hover="zoom"
        sizes="third"
      >
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-lg bg-black/45 px-4 py-2.5 text-sm text-white backdrop-blur-md">
          <span className="truncate font-medium">{category}</span>
          <span aria-hidden className="size-1 shrink-0 rounded-full bg-brand" />
          <span className="shrink-0 whitespace-nowrap text-white/85">{date}</span>
        </div>
      </ImageFrame>

      <div className="flex flex-1 flex-col gap-3">
        <Heading
          as="h3"
          size="h5"
          className="text-balance transition-colors duration-300 group-hover:text-primary"
        >
          {insight.title}
        </Heading>

        <Text size="sm" className="line-clamp-3 flex-1 text-muted-foreground">
          {insight.excerpt}
        </Text>

        <span className="flex items-center gap-2 pt-1 text-sm font-semibold text-foreground">
          {readMore}
          <Icon
            name="arrowRight"
            size="xs"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>

        <Text as="span" size="xs" className="text-muted-foreground">
          {insight.readMinutes} {readTime}
        </Text>
      </div>
    </article>
  );
}
