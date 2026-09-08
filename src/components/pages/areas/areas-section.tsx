import { Heading } from "@/components/common/heading";
import { OrnamentDivider } from "@/components/common/ornament-divider";
import { Section } from "@/components/common/section";
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
 * Two-tone title, then the ornament rule. Shared with `/areas` so the two pages
 * open the same way.
 *
 * No eyebrow and no lead paragraph: the title says where we work, and the
 * divider closes it off — which is what that mark is for, standing in for a
 * sentence rather than adding one.
 *
 * The title is three dictionary strings rather than one with markup in it:
 * translators need to move the accent to a different position in the sentence,
 * and Bangla does exactly that.
 */
export function AreasHeading({
  t,
}: {
  t: {
    titleLead: string;
    titleAccent: string;
    titleTail: string;
  };
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 text-center">
        <Heading as="h2" size="h2" align="center" className="max-w-4xl">
          {t.titleLead}
          <span className="text-brand-blue">{t.titleAccent}</span>
          {t.titleTail}
        </Heading>

        <OrnamentDivider className="mt-3" />
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
