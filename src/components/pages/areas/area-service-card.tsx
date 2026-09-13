import Link from "next/link";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
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
        "group relative isolate flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card/95 backdrop-blur-sm transition-all duration-300 ease-out",
        "shadow-[0_1px_2px_rgba(27,35,24,0.04),0_10px_30px_-18px_rgba(27,35,24,0.55)]",
        "hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(27,35,24,0.06),0_22px_46px_-20px_rgba(75,128,45,0.45)]",
        className,
      )}
    >
      <div className="flex items-stretch gap-3 px-4 pt-3.5 pb-3">
        {/* Thumbnail + listings */}
        <div className="relative shrink-0">
          <div className="h-16 w-24 overflow-hidden rounded-md border border-border/70 bg-muted/40">
            <Image
              src={area.image}
              alt=""
              fill
              sizes="120px"
              placeholder="blur"
              blurDataURL={shimmerDataUrl()}
              className="object-cover"
            />
          </div>

          <span className="absolute -top-2 -right-1 z-10 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-primary shadow-[0_4px_10px_rgba(27,35,24,0.18)]">
            <Icon name="building" size="xs" className="size-3" />
            {listingsText}
          </span>
        </div>

        {/* Name + copy */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="line-clamp-2 font-heading text-[15px] font-semibold leading-snug text-foreground">
            {name}
          </span>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Icon name="location" size="xs" className="shrink-0 text-brand-green-light" />
            <span className="truncate">
              {area.city}
            </span>
          </div>

          {tagline && (
            <span className="truncate text-[13px] font-semibold text-foreground/90">
              {tagline}
            </span>
          )}

          <span className="truncate text-[11px] font-medium text-muted-foreground">
            {inAreaLabel}
          </span>
        </div>
      </div>

      {/* Meta strip (no pricing / no button) */}
      <div className="mt-auto flex items-center justify-start gap-3 border-t border-border/70 bg-muted/40 px-4 py-2.5 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-0.5">
            <Icon name="shieldCheck" size="xs" className="text-brand-green-light" />
            <span className="truncate max-w-30">
              {area.securityTier}
            </span>
          </span>
          {area.rentalYield && (
            <span className="hidden items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 font-medium text-foreground/80 sm:inline-flex">
              <Icon name="chartUp" size="xs" />
              {isBn ? area.rentalYield.replace("%", "% লাভ") : `${area.rentalYield} yield`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
