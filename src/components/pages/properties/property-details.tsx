import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import type { Property } from "@/data/properties";

import { AreaFacts } from "./area-facts";

export interface PropertyDetailsDict {
  about: string;
  neighbourhood: string;
  papers: string;
  pricePerSqft: string;
  rentalYield: string;
  security: string;
  metro: string;
  listingsHere: string;
  rajukYes: string;
  rajukNo: string;
  handover: string;
  furnishing: string;
}

/**
 * The written half of a listing: the description, the area it sits in, and the
 * state of its papers.
 *
 * Everything above this on the page is a number in a box. This is where the
 * things that decide a purchase but do not fit in a spec grid go — how the plan
 * is arranged, what the block is actually like, what is signed and what is not.
 *
 * The neighbourhood block comes from `AreaFacts`, which the project pages use
 * too — one description of Gulshan, not one per page that mentions it.
 */
export function PropertyDetails({
  property,
  dict,
  locale = "en",
}: {
  property: Property;
  dict: PropertyDetailsDict;
  locale?: "en" | "bn";
}) {
  const description =
    locale === "bn" && property.descriptionBn?.length
      ? property.descriptionBn
      : property.description;
  return (
    <div className="flex flex-col gap-10">
      {description && description.length > 0 ? (
        <section className="flex flex-col gap-4">
          <Heading as="h2" size="h4">
            {dict.about}
          </Heading>

          {/* One paragraph per entry, at a measure that stays readable in the
              left column — long-form copy set to the full grid width is the
              fastest way to make people stop reading it. */}
          <div className="flex max-w-2xl flex-col gap-4">
            {description.map((paragraph) => (
              <Text key={paragraph.slice(0, 40)} className="leading-relaxed">
                {paragraph}
              </Text>
            ))}
          </div>
        </section>
      ) : null}

      <AreaFacts
        areaName={property.area}
        showYield={property.purpose !== "rent"}
        dict={{
          heading: dict.neighbourhood,
          pricePerSqft: dict.pricePerSqft,
          rentalYield: dict.rentalYield,
          security: dict.security,
          metro: dict.metro,
          listingsHere: dict.listingsHere,
        }}
      />

      <section className="flex flex-col gap-4">
        <Heading as="h2" size="h4">
          {dict.papers}
        </Heading>

        <ul className="flex max-w-2xl flex-col gap-2">
          <Line
            ok={property.rajukApproved}
            text={property.rajukApproved ? dict.rajukYes : dict.rajukNo}
          />
          <Line ok text={`${dict.handover}: ${property.handover}`} />
          <Line ok text={`${dict.furnishing}: ${property.furnishing}`} />
        </ul>
      </section>
    </div>
  );
}

function Line({ ok, text }: { ok: boolean; text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground">
      <Icon
        name={ok ? "check" : "clock"}
        size="xs"
        className={ok ? "mt-1 text-primary" : "mt-1 text-muted-foreground"}
      />
      {text}
    </li>
  );
}

