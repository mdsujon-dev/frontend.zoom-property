import Image from "@/components/common/image";
import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import type { Insight } from "@/data/insights";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

interface CardBaseProps {
  insight: Insight;
  locale: Locale;
  categoryLabel: string;
  formattedDate: string;
  readMoreLabel: string;
  minReadLabel: string;
  className?: string;
}

/**
 * Large full-bleed image card with dark scrim overlay.
 * Used for main hero stories and primary category highlights.
 */
export function BlogFeaturedOverlayCard({
  insight,
  locale,
  categoryLabel,
  formattedDate,
  minReadLabel,
  className,
  priority = false,
}: CardBaseProps & { priority?: boolean }) {
  const isBn = locale === "bn";
  const title = (isBn && insight.titleBn) ? insight.titleBn : insight.title;
  const excerpt = (isBn && insight.excerptBn) ? insight.excerptBn : insight.excerpt;
  const authorName = (isBn && insight.author.nameBn) ? insight.author.nameBn : insight.author.name;
  const href = localeHref(locale, `/blog#${insight.id}`);

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl border border-border/60 bg-brand-navy-deep shadow-md transition-all duration-300 hover:shadow-xl",
        className,
      )}
    >
      <Image
        src={insight.image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Multi-layer gradient scrim ensuring high contrast readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-black/95 via-black/60 to-black/20 transition-opacity duration-300 group-hover:via-black/50"
      />

      <div className="relative z-10 flex flex-col gap-3.5 p-6 sm:p-8 lg:p-10">
        {/* Category badge and read time */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full bg-emerald-600/90 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-sm">
            {categoryLabel}
          </span>
          {insight.trending && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/90 px-2.5 py-0.5 text-xs font-semibold text-white">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              HOT
            </span>
          )}
          <span className="text-xs font-medium text-white/75">
            {insight.readMinutes} {minReadLabel}
          </span>
        </div>

        {/* Title */}
        <Heading
          as="h2"
          size="h3"
          className="text-balance font-extrabold text-white transition-colors duration-200 group-hover:text-amber-200"
        >
          <Link href={href} className="focus:outline-none focus:underline">
            {title}
          </Link>
        </Heading>

        {/* Excerpt */}
        <Text
          size="sm"
          className="line-clamp-2 text-white/80 sm:line-clamp-3 sm:text-base leading-relaxed"
        >
          {excerpt}
        </Text>

        {/* Meta / Author row */}
        <div className="mt-2 flex items-center justify-between border-t border-white/15 pt-4 text-xs sm:text-sm text-white/80">
          <div className="flex items-center gap-2.5">
            {insight.author.avatar ? (
              <div className="relative size-7 overflow-hidden rounded-full border border-white/30">
                <Image
                  src={insight.author.avatar}
                  alt={authorName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <span className="font-medium text-white">{authorName}</span>
          </div>
          <time dateTime={insight.date} className="text-white/70">
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
}

/**
 * Standard vertical card with photograph above title and metadata.
 * Clean, structured, highly readable.
 */
export function BlogStandardCard({
  insight,
  locale,
  categoryLabel,
  formattedDate,
  readMoreLabel,
  minReadLabel,
  className,
}: CardBaseProps) {
  const isBn = locale === "bn";
  const title = (isBn && insight.titleBn) ? insight.titleBn : insight.title;
  const excerpt = (isBn && insight.excerptBn) ? insight.excerptBn : insight.excerpt;
  const href = localeHref(locale, `/blog#${insight.id}`);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg",
        className,
      )}
    >
      <Link href={href} className="block overflow-hidden rounded-xl">
        <ImageFrame
          src={insight.image}
          alt=""
          ratio="3/2"
          hover="zoom"
          rounded="xl"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        >
          <div className="pointer-events-none absolute left-3 top-3">
            <span className="inline-flex rounded-md bg-black/60 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {categoryLabel}
            </span>
          </div>
        </ImageFrame>
      </Link>

      <div className="flex flex-1 flex-col justify-between pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <time dateTime={insight.date}>{formattedDate}</time>
            <span>{insight.readMinutes} {minReadLabel}</span>
          </div>

          <Heading
            as="h3"
            size="h6"
            className="line-clamp-2 font-bold text-foreground transition-colors duration-200 group-hover:text-primary"
          >
            <Link href={href}>{title}</Link>
          </Heading>

          <Text size="sm" className="line-clamp-2 leading-relaxed text-muted-foreground">
            {excerpt}
          </Text>
        </div>

        <div className="mt-4 pt-3 border-t border-border/60">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-brand-blue"
          >
            <span>{readMoreLabel}</span>
            <Icon
              name="arrowRight"
              size="xs"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Compact horizontal list item card with thumbnail on left,
 * title, date, and reading time on right. Perfect for sidebar / lists.
 */
export function BlogHorizontalCard({
  insight,
  locale,
  categoryLabel,
  formattedDate,
  minReadLabel,
  className,
}: Omit<CardBaseProps, "readMoreLabel">) {
  const isBn = locale === "bn";
  const title = (isBn && insight.titleBn) ? insight.titleBn : insight.title;
  const href = localeHref(locale, `/blog#${insight.id}`);

  return (
    <article
      className={cn(
        "group flex items-center gap-3.5 rounded-xl border border-border/50 bg-card p-2.5 transition-colors duration-200 hover:border-primary/30 hover:bg-muted/40",
        className,
      )}
    >
      <Link
        href={href}
        className="relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={insight.image}
          alt=""
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-center gap-1 min-w-0">
        <span className="font-heading text-[11px] font-bold uppercase tracking-wider text-primary">
          {categoryLabel}
        </span>

        <h4 className="line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary">
          <Link href={href} className="focus:outline-none">
            {title}
          </Link>
        </h4>

        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <time dateTime={insight.date}>{formattedDate}</time>
          <span>•</span>
          <span>{insight.readMinutes} {minReadLabel}</span>
        </div>
      </div>
    </article>
  );
}
