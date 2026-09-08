import Link from "next/link";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import type { Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * The per-card hue cycle from the reference design.
 *
 * Decorative only — it never carries meaning, so nothing is lost to a visitor
 * who cannot separate the hues. Everything that has to be read (the name, the
 * promise) stays on the type colours; the tint only paints the panel behind the
 * photograph, the pin, the corner wash and the arrow chip.
 *
 * Written as whole class strings rather than `bg-[${hue}]`: Tailwind scans
 * source text, so a class assembled at runtime is never generated.
 */
const TINTS = [
  {
    panel: "bg-[#2f7fd8]/10",
    wash: "bg-[#2f7fd8]/12",
    pin: "text-[#2f7fd8]",
    chip: "bg-[#2f7fd8]/12 text-[#2f7fd8] group-hover:bg-[#2f7fd8] group-hover:text-white",
    border: "hover:border-[#2f7fd8]/45",
  },
  {
    panel: "bg-[#2ea36c]/10",
    wash: "bg-[#2ea36c]/12",
    pin: "text-[#2ea36c]",
    chip: "bg-[#2ea36c]/12 text-[#2ea36c] group-hover:bg-[#2ea36c] group-hover:text-white",
    border: "hover:border-[#2ea36c]/45",
  },
  {
    panel: "bg-[#7c5cd6]/10",
    wash: "bg-[#7c5cd6]/12",
    pin: "text-[#7c5cd6]",
    chip: "bg-[#7c5cd6]/12 text-[#7c5cd6] group-hover:bg-[#7c5cd6] group-hover:text-white",
    border: "hover:border-[#7c5cd6]/45",
  },
  {
    panel: "bg-[#e08a2b]/10",
    wash: "bg-[#e08a2b]/12",
    pin: "text-[#e08a2b]",
    chip: "bg-[#e08a2b]/12 text-[#e08a2b] group-hover:bg-[#e08a2b] group-hover:text-white",
    border: "hover:border-[#e08a2b]/45",
  },
  {
    panel: "bg-[#dd5b8f]/10",
    wash: "bg-[#dd5b8f]/12",
    pin: "text-[#dd5b8f]",
    chip: "bg-[#dd5b8f]/12 text-[#dd5b8f] group-hover:bg-[#dd5b8f] group-hover:text-white",
    border: "hover:border-[#dd5b8f]/45",
  },
] as const;

/**
 * Which hue a card gets.
 *
 * Keyed off the id rather than the grid position, so an area keeps its colour
 * on page two of `/areas` and on the home page — a card that changed colour
 * when it moved would read as a state change rather than as decoration.
 */
function tintFor(id: string) {
  let sum = 0;
  for (let i = 0; i < id.length; i += 1) sum += id.charCodeAt(i);
  return TINTS[sum % TINTS.length];
}

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
  const tint = tintFor(area.id);

  return (
    <Link
      href={localeHref(locale, `/properties?area=${area.id}`)}
      className={cn(
        "group relative isolate flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4",
        "shadow-[0_10px_30px_-22px] shadow-foreground/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        tint.border,
        className,
      )}
    >
      {/* Corner wash — always there, the way the reference has it, and it
          deepens rather than appears on hover. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-14 -right-14 -z-10 size-36 rounded-full opacity-70 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
          tint.wash,
        )}
      />

      <div
        className={cn(
          "relative h-28 w-full overflow-hidden rounded-xl",
          tint.panel,
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
            tint.panel,
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name="location" size="sm" className={cn("shrink-0", tint.pin)} />
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
            tint.chip,
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
