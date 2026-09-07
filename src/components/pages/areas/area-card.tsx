import Link from "next/link";
import { localeHref } from "@/i18n/href";
import type { Locale } from "@/i18n/config";
import type { Area } from "@/data/areas";
import { cn } from "@/lib/utils";
import Image from "@/components/common/image";
import { shimmerDataUrl } from "@/lib/image";

export function AreaCard({
  area,
  locale = "en",
  className,
}: {
  area: Area;
  locale?: Locale;
  className?: string;
}) {
  return (
    <Link
      href={localeHref(locale, `/properties?area=${area.id}`)}
      className={cn(
        "group relative block overflow-hidden rounded-2xl cursor-pointer",
        className,
      )}
    >
      {/* Fixed height container */}
      <div className="relative h-[180px] sm:h-[200px] w-full overflow-hidden rounded-2xl">
        {/* Image: blurred by default, unblurs on hover */}
        <Image
          src={area.image}
          alt={area.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover transition-all duration-500 ease-out scale-110 blur-[4px] brightness-60 group-hover:blur-0 group-hover:scale-105 group-hover:brightness-80"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500 group-hover:from-black/70 group-hover:via-black/20 group-hover:to-transparent" />

        {/* Location Name — centered, big */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <span
            className={cn(
              "text-center font-bold tracking-wide text-white drop-shadow-lg transition-all duration-500",
              "text-2xl sm:text-3xl",
              "group-hover:text-sky-400 group-hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.9)]",
            )}
          >
            {area.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
