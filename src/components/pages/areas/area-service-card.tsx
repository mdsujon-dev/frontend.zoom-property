import Link from "next/link";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import { FormatBdt } from "@/components/ui/format-bdt";
import type { Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { formatNumber, toBengaliDigits } from "@/lib/format";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * The service-area card.
 *
 * The photograph is the card: full-bleed on top, with the area name set on
 * a dark foot so the place and its picture are read together. The strip
 * under it answers the two things that decide whether to look further —
 * how much is on the market here, and what a square foot costs — and the
 * service promise sits above an arrow that fills in on hover.
 *
 * `inAreaLabel` arrives pre-composed from the dictionary so the sentence can
 * be ordered differently per language rather than concatenated here.
 */
export function AreaServiceCard({
  area,
  locale,
  inAreaLabel,
  className,
}: {
  area: Area;
  locale: Locale;
  /** Already interpolated, e.g. "in Badda Area". */
  inAreaLabel: string;
  className?: string;
}) {
  const isBn = locale === "bn";
  const name = isBn && area.nameBn ? area.nameBn : area.name;
  const tagline = isBn && area.taglineBn ? area.taglineBn : area.tagline;
  const listingsText = isBn
    ? toBengaliDigits(formatNumber(area.listings))
    : formatNumber(area.listings);

  return (
    <Link
      href={localeHref(locale, `/properties?area=${area.id}`)}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 ease-out",
        "shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.16)]",
        "hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(27,35,24,0.06),0_20px_40px_-12px_rgba(75,128,45,0.3)]",
        className,
      )}
    >
      {/* ── Photo with name ───────────────────────────────────────── */}
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={area.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/5"
        />

        {/* Listings count, top-right. */}
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-bold text-primary shadow-sm">
          <Icon name="building" size="xs" className="size-3" />
          {listingsText}
        </span>

        {/* Name on the foot. */}
        <div className="absolute inset-x-4 bottom-3 z-10 flex items-center gap-1.5">
          <Icon name="location" size="sm" className="shrink-0 text-brand-green-light" />
          <span className="truncate font-heading text-lg font-bold leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
            {name}
          </span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 px-4 pt-3.5 pb-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-muted-foreground">
            {isBn ? "প্রতি বর্গফুট" : "Per sq ft"}
          </span>
          <span className="font-bold text-foreground">
            <FormatBdt value={area.pricePerSqft} exact />
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/70 pt-3">
          <span className="flex min-w-0 flex-col leading-snug">
            <span className="truncate text-sm font-semibold text-primary">{tagline}</span>
            <span className="truncate text-xs text-muted-foreground">{inAreaLabel}</span>
          </span>

          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
          >
            <Icon
              name="arrowRight"
              size="xs"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
