import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import type { Insight } from "@/data/insights";
import { cn } from "@/lib/utils";

/**
 * Article card.
 *
 * Category and date sit in a frosted bar inset on the photograph rather than in
 * a meta row beneath it: it uses space that is otherwise dead, and it leaves the
 * block below the image as title → excerpt → link, which is the order the eye
 * wants.
 *
 * The bar is `black/40 + backdrop-blur` because it lands on whatever the photo
 * happens to be — a token background would be unreadable over a bright image,
 * and a solid one would hide the part of the picture it covers.
 *
 * The card is a bordered surface with the photograph running edge to edge into
 * it, so the image needs no corner radius of its own — `overflow-hidden` on the
 * article clips it to the border instead, and the two curves stay in sync.
 */
export function InsightCard({
  insight,
  readMore,
  category,
  date,
  className,
}: {
  insight: Insight;
  readMore: string;
  /** Localised category label. */
  category: string;
  /** Pre-formatted, so the card stays free of Intl setup. */
  date: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className,
      )}
    >
      <ImageFrame
        src={insight.image}
        alt=""
        ratio="3/2"
        rounded="none"
        hover="zoom"
        sizes="third"
      >
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-xl bg-black/40 px-5 py-3 text-[15px] text-white backdrop-blur-md">
          <span className="truncate">{category}</span>
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white/45" />
          <span className="shrink-0 whitespace-nowrap">{date}</span>
        </div>
      </ImageFrame>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <Heading
          as="h3"
          size="h4"
          weight="bold"
          className="line-clamp-2 text-balance transition-colors duration-300 group-hover:text-primary"
        >
          {insight.title}
        </Heading>

        <Text size="base" className="line-clamp-2 flex-1 leading-relaxed text-muted-foreground">
          {insight.excerpt}
        </Text>

        <span className="mt-auto flex items-center gap-2.5 border-t border-border pt-4 text-[15px] font-bold text-foreground">
          {readMore}
          <Icon
            name="arrowRight"
            size="sm"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
