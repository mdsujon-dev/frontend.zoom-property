import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { areas } from "@/data/areas";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

import { AreaServiceCard } from "./area-service-card";

/** How many the home page shows. `/areas` paginates the rest. */
const HOME_COUNT = 10;

/**
 * Service areas on the home page.
 *
 * Ten cards in a five-up grid, then a link through to the full list. The order
 * in `src/data/areas.ts` is the editorial order, so the strongest addresses
 * lead — no sorting here.
 */
export async function AreasSection({ className }: { className?: string } = {}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.areas.service;

  const shown = areas.slice(0, HOME_COUNT);

  return (
    <Section
      id="areas"
      className={cn(" bg-background", className)}
    >
      <AreasHeading t={t} />

      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((area) => (
          <StaggerItem key={area.id}>
            <AreaServiceCard
              area={area}
              locale={locale}
              inAreaLabel={t.inArea.replace(
                "{name}",
                locale === "bn" && area.nameBn ? area.nameBn : area.name,
              )}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/**
 * Eyebrow pill, two-tone title, lead. Shared with `/areas` so the two pages
 * open the same way.
 *
 * The title is three dictionary strings rather than one with markup in it:
 * translators need to move the accent to a different position in the sentence,
 * and Bangla does exactly that.
 */
export function AreasHeading({
  t,
}: {
  t: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleTail: string;
    description: string;
  };
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
          <Icon name="location" size="xs" />
          {t.eyebrow}
        </span>

        <Heading as="h2" size="h2" align="center" className="max-w-4xl">
          {t.titleLead}
          <span className="text-primary">{t.titleAccent}</span>
          {t.titleTail}
        </Heading>

        <Text size="base" align="center" className="max-w-2xl leading-relaxed">
          {t.description}
        </Text>
      </div>
    </Reveal>
  );
}
