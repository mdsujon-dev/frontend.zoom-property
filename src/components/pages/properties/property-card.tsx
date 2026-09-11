import Link from "next/link";

import { Heading } from "@/components/common/heading";
import { Icon, type IconName } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Property } from "@/data/properties";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { formatArea, formatBdt, formatKatha, formatRent } from "@/lib/format";
import { FormatBdt } from "@/components/ui/format-bdt";
import { cn } from "@/lib/utils";

export interface PropertyCardProps {
  property: Property;
  /** Needed for the link. Defaults to English, the default locale. */
  locale?: Locale;
  className?: string;
  featured?: boolean;
}

/**
 * The card links to the listing as a whole: the title is the accessible name
 * of that link, and everything else on the card is inside it. One link per
 * card rather than three, because a keyboard walking a grid of twelve should
 * pass twelve stops, not thirty-six.
 */
export function PropertyCard({
  property,
  locale = "en",
  className,
  featured = false,
}: PropertyCardProps) {
  const {
    title: englishTitle,
    titleBn,
    area,
    areaBn,
    city,
    price,
    purpose,
    status = "available",
    beds,
    baths,
    size,
    katha,
    images,
    badge,
    rajukApproved,
    hasVirtualTour,
    furnishing,
    handover,
  } = property;
  const isSold = status === "sold";
  const title = locale === "bn" && titleBn ? titleBn : englishTitle;
  const displayArea = locale === "bn" && areaBn ? areaBn : area;

  const specs: { icon: IconName; label: string }[] = [
    ...(beds > 0 ? [{ icon: "bed" as const, label: `${beds} Beds` }] : []),
    { icon: "bath", label: `${baths} Baths` },
    { icon: "area", label: formatArea(size) },
    ...(katha
      ? [{ icon: "location" as const, label: formatKatha(katha) }]
      : []),
  ];

  return (
    <Link
      href={localeHref(locale, `/properties/${property.slug}`)}
      aria-label={`${title}, ${displayArea}`}
      className="block h-full"
    >
      <Card
        className={cn(
          "group h-full overflow-hidden p-0 border border-border transition-all duration-500 ease-out-expo hover:border-primary/60 hover:shadow-xl hover:-translate-y-1",
          isSold ? "bg-muted/70" : "bg-card",
          className,
        )}
      >
        <ImageFrame
          src={images[0]}
          alt={`${title}, ${displayArea}`}
          ratio={featured ? "3/2" : "4/3"}
          rounded="none"
          hover="zoom"
          sizes="card"
        >
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
            {badge ? (
              <Badge className="bg-primary text-primary-foreground font-semibold px-2.5 py-1 text-xs shadow-md border-0">
                {badge}
              </Badge>
            ) : null}

            {isSold ? (
              <Badge className="border-0 bg-foreground/85 px-2.5 py-1 text-xs font-semibold text-background shadow-md">
                Sold
              </Badge>
            ) : null}

            {hasVirtualTour ? (
              <span className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white border border-white/20 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                360° Tour
              </span>
            ) : null}
          </div>

          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/15">
            <Icon name="gallery" size="xs" />
            {images.length}
          </span>
        </ImageFrame>

        <CardContent className="flex flex-col gap-3 px-5 pt-5 pb-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-heading text-h4 font-bold text-primary tracking-tight">
              {isSold
                ? "Sold"
                : purpose === "rent"
                  ? <><FormatBdt value={price} />/mo</>
                  : <FormatBdt value={price} />}
            </span>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider border",
                isSold
                  ? "border-border bg-background/60 text-muted-foreground"
                  : "border-primary/25 bg-primary/15 text-primary",
              )}
            >
              For {purpose}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <Heading
              as="h3"
              size="h6"
              weight="medium"
              className="text-foreground group-hover:text-primary transition-colors"
            >
              {title}
            </Heading>
            <Text
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground"
            >
              <Icon name="location" size="xs" className="text-primary/70" />
              {displayArea}, {city}
            </Text>
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-primary/10">
            {specs.map((spec) => (
              <li
                key={spec.label}
                className="flex items-center gap-1.5 text-xs text-foreground/80 font-medium"
              >
                <Icon name={spec.icon} size="xs" className="text-primary" />
                {spec.label}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border px-5 py-3.5 bg-muted/40">
          {rajukApproved ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Icon name="approved" size="xs" />
              RAJUK Approved
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              Title in review
            </span>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="furnishing" size="xs" />
              {furnishing}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="handover" size="xs" />
              {handover}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
