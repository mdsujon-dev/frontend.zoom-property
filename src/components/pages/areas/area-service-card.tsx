import Link from "next/link";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import type { Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * The card's decorative tint.
 *
 * One tint, the brand primary, rather than the reference design's five-hue
 * cycle. Those hues were five colours the brand does not have - a blue, a
 * teal, a violet, an orange and a pink - and a grid of them read as five
 * categories rather than as decoration.
 *
 * Written as whole class strings rather than assembled at runtime: Tailwind
 * scans source text, so a class built from a variable is never generated.
 */
const TINT = {
  panel: "bg-primary/10",
  wash: "bg-primary/12",
  pin: "text-primary",
  chip: "bg-primary/12 text-primary group-hover:bg-primary group-hover:text-white",
  border: "hover:border-primary/45",
} as const;

/**
 * The service-area card.
 *
 * A photograph in a tinted panel, the area name behind a pin, a two-line
 * service promise, and an arrow chip that fills in on hover — the reference
 * design, including its cycle of a different hue per card.
 *
 * `inAreaLabel` arrives pre-composed from the dictionary so the sentence can be
 * ordered differently per language rather than concatenated here.
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

  return (
    <Link
      href={localeHref(locale, `/properties?area=${area.id}`)}
      className={cn(
        "group relative isolate flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4",
        "shadow-[0_10px_30px_-22px] shadow-foreground/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        TINT.border,
        className,
      )}
    >
      {/* Corner wash — always there, the way the reference has it, and it
          deepens rather than appears on hover. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-14 -right-14 -z-10 size-36 rounded-full opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          TINT.wash,
        )}
      />

      <div
        className={cn(
          "relative h-28 w-full overflow-hidden rounded-xl",
          TINT.panel,
        )}
      >
        <Image
          src={area.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* The panel tint again, over the photograph — the reference shows the
            hue in the media, and a full-bleed photo would otherwise cover it. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 mix-blend-multiply",
            TINT.panel,
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="location" size="sm" className={cn("shrink-0", TINT.pin)} />
        <span className="truncate font-heading text-base font-bold text-foreground">
          {name}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3">
        <span className="flex min-w-0 flex-col text-xs leading-relaxed text-muted-foreground">
          <span className="truncate">{tagline}</span>
          <span className="truncate">{inAreaLabel}</span>
        </span>

        <span
          aria-hidden
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            TINT.chip,
          )}
        >
          <Icon
            name="arrowRight"
            size="xs"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
