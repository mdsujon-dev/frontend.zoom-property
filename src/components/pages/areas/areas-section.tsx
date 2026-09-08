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
      className={cn("overflow-hidden bg-background", className)}
    >
      <AreasOrnaments />

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
        {/* The pill sits between two rules, as the reference has it. They are
            drawn rather than bordered so they can fade out at the far end. */}
        <div className="flex items-center justify-center gap-4">
          <span
            aria-hidden
            className="hidden h-px w-16 bg-linear-to-r from-transparent to-border sm:block"
          />

          <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-card px-4 py-1.5 text-sm font-semibold text-brand-blue shadow-[0_6px_18px_-12px] shadow-brand-blue/60">
            <Icon name="location" size="xs" />
            {t.eyebrow}
          </span>

          <span
            aria-hidden
            className="hidden h-px w-16 bg-linear-to-l from-transparent to-border sm:block"
          />
        </div>

        <Heading as="h2" size="h2" align="center" className="max-w-4xl">
          {t.titleLead}
          <span className="text-brand-blue">{t.titleAccent}</span>
          {t.titleTail}
        </Heading>

        <Text size="base" align="center" className="max-w-2xl leading-relaxed">
          {t.description}
        </Text>
      </div>
    </Reveal>
  );
}

/**
 * The background of the reference design: a dot grid in the top-left, another
 * in the bottom-right, and a soft blue disc bleeding in from the top-right
 * corner.
 *
 * All three are drawn in CSS rather than shipped as artwork, and none of them
 * is content — the section reads identically with them switched off. They are
 * dropped below `lg`, where there is no margin for them to sit in.
 */
function AreasOrnaments() {
  const dots =
    "absolute hidden h-16 w-28 bg-[radial-gradient(circle,var(--color-brand-blue)_1.5px,transparent_1.5px)] [background-size:14px_14px] opacity-25 lg:block";

  return (
    <div aria-hidden className="pointer-events-none">
      <span className={cn(dots, "top-10 left-0")} />
      <span className={cn(dots, "right-0 bottom-10")} />

      <span className="absolute -top-24 -right-24 size-80 rounded-full bg-brand-blue/8 blur-3xl" />
    </div>
  );
}
