import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import type { Area } from "@/data/areas";
import { formatBdt, numberFormatter } from "@/lib/format";
import { cn } from "@/lib/utils";

export function AreaCard({ area, className }: { area: Area; className?: string }) {
  return (
    <a
      href="#listings"
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary",
        className,
      )}
    >
      <ImageFrame
        src={area.image}
        alt={`${area.name}, ${area.city}`}
        ratio="4/3"
        rounded="2xl"
        hover="zoom"
        overlay
        sizes="third"
      >
        {/* Top Badges */}
        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5 z-10">
          <span className="rounded-full bg-black/70 border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            ৳{numberFormatter.format(area.pricePerSqft)} / sft
          </span>
          <span className="rounded-full bg-emerald-950/80 border border-emerald-500/30 px-2 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-md">
            Yield {area.rentalYield}
          </span>
        </div>

        {/* Arrow hover indicator */}
        <span className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 z-10 shadow-lg">
          <Icon name="arrowUpRight" size="xs" />
        </span>

        {/* Bottom Details Overlay */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 bg-linear-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <Heading as="h3" size="h5" className="text-white group-hover:text-primary transition-colors">
              {area.name}
            </Heading>
            <span className="text-xs text-white/70">
              {numberFormatter.format(area.listings)} units
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-primary/90 font-medium">
            <span>Median: {formatBdt(area.medianPrice)}</span>
            <span aria-hidden className="text-muted-foreground">·</span>
            <span className="text-white/70">{area.securityTier}</span>
          </div>

          <Text
            size="xs"
            className="text-white/80 line-clamp-2 text-[12px] pt-1 border-t border-white/10 mt-1"
          >
            {area.note}
          </Text>
        </div>
      </ImageFrame>
    </a>
  );
}
