import { Icon, type IconName } from "@/components/common/icon";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  /** Floor area in sq ft. */
  area: number;
  image: string;
  tag?: string;
  className?: string;
}

const specIcon: Record<"beds" | "baths" | "area", IconName> = {
  beds: "bed",
  baths: "bath",
  area: "area",
};

export function PropertyCard({
  title,
  location,
  price,
  beds,
  baths,
  area,
  image,
  tag,
  className,
}: PropertyCardProps) {
  const specs = [
    { key: "beds" as const, value: `${beds} beds` },
    { key: "baths" as const, value: `${baths} baths` },
    { key: "area" as const, value: `${formatNumber(area)} sq ft` },
  ];

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden p-0 transition-shadow duration-500 ease-out-expo hover:shadow-xl",
        className,
      )}
    >
      <ImageFrame
        src={image}
        alt={`${title} in ${location}`}
        ratio="4/3"
        rounded="none"
        hover="zoom"
        sizes="card"
      >
        {tag ? (
          <Badge className="absolute left-4 top-4 shadow-sm">{tag}</Badge>
        ) : null}
      </ImageFrame>

      <CardContent className="flex flex-col gap-3 px-5">
        <div className="flex items-start justify-between gap-3">
          <Heading as="h3" size="h5">
            {title}
          </Heading>
          <span className="shrink-0 font-heading text-h5 text-primary">
            {formatCurrency(price)}
          </span>
        </div>

        <Text size="sm" className="flex items-center gap-1.5">
          <Icon name="location" size="xs" />
          {location}
        </Text>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          {specs.map((spec) => (
            <li
              key={spec.key}
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <Icon name={specIcon[spec.key]} size="xs" />
              {spec.value}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        <Button variant="outline" size="lg" className="w-full">
          View details
          <Icon name="arrowUpRight" size="xs" />
        </Button>
      </CardFooter>
    </Card>
  );
}
