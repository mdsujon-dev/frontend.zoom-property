import { Heading } from "@/components/common/heading";
import { Icon, type IconName } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { areas } from "@/data/areas";
import { formatBdt } from "@/lib/format";

export interface AreaFactsDict {
  heading: string;
  pricePerSqft: string;
  rentalYield: string;
  security: string;
  metro: string;
  listingsHere: string;
}

/**
 * A listing's `area` is the address as written ("Gulshan 2", "Mirpur DOHS");
 * an area's `id` is the neighbourhood ("gulshan", "mirpur-dohs"). Match on the
 * id as words, longest first, so "Baridhara DOHS" cannot be claimed by a
 * shorter id that happens to be a prefix of it.
 */
export function matchArea(listingArea: string) {
  const haystack = listingArea.toLowerCase();

  return [...areas]
    .sort((a, b) => b.id.length - a.id.length)
    .find((area) => haystack.includes(area.id.replace(/-/g, " ")));
}

/**
 * What the neighbourhood is like, under a listing or a project.
 *
 * Nothing here is written per listing: it is read out of `src/data/areas.ts` by
 * matching the address against the areas we already publish. One source for
 * what Gulshan costs per square foot, rather than a number retyped into nine
 * listings and stale in three of them. Renders nothing when the address does
 * not match an area we cover — a half-filled block is worse than none.
 */
export function AreaFacts({
  areaName,
  dict,
  showYield = true,
}: {
  /** The listing's own address string. */
  areaName: string;
  dict: AreaFactsDict;
  /** Rentals are priced on the rent, so the sale yield is noise there. */
  showYield?: boolean;
}) {
  const area = matchArea(areaName);
  if (!area) return null;

  const facts: { icon: IconName; label: string; value: string }[] = [
    {
      icon: "trend",
      label: dict.pricePerSqft,
      value: `${formatBdt(area.pricePerSqft, { exact: true })} / sq ft`,
    },
    {
      icon: "building",
      label: dict.listingsHere,
      value: String(area.listings),
    },
    { icon: "shield", label: dict.security, value: area.securityTier },
    ...(area.metroConnectivity
      ? [
          {
            icon: "clock" as const,
            label: dict.metro,
            value: area.metroConnectivity,
          },
        ]
      : []),
    ...(showYield
      ? [
          {
            icon: "approved" as const,
            label: dict.rentalYield,
            value: area.rentalYield,
          },
        ]
      : []),
  ];

  return (
    <section className="flex flex-col gap-4">
      <Heading as="h2" size="h4">
        {dict.heading}
      </Heading>

      <Text className="max-w-2xl leading-relaxed">{area.note}</Text>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4"
          >
            <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Icon name={fact.icon} size="xs" className="text-primary" />
              {fact.label}
            </dt>
            <dd className="font-heading text-sm font-bold text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
