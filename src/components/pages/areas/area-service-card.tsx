import Link from "next/link";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import type { Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * The service-area card.
 *
 * A photograph in a tinted panel, the area name behind a pin, a two-line
 * service promise, and an arrow that fills in on hover.
 *
 * Everything accents in `primary`. The reference design cycled a different hue
 * per card, which reads as decoration rather than as a system — and on a grid
 * of twenty it becomes noise. One accent, varied only by weight.
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
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
        className,
      )}
    >
      {/* Corner wash — the one flourish, and it only appears on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 -z-10 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative h-28 w-full overflow-hidden rounded-xl bg-primary/5">
        <Image
          src={area.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="location" size="sm" className="shrink-0 text-primary" />
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
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
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
