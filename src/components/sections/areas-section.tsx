import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AreaCard } from "@/components/property/area-card";
import { Button } from "@/components/ui/button";
import { areas } from "@/data/areas";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function AreasSection({ showAction = true }: { showAction?: boolean }) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <Section id="areas" className="border-t border-border bg-background">
      <SectionHeading
        eyebrow={dict.areas.eyebrow}
        title={dict.areas.title}
        description={dict.areas.description}
        action={
          showAction ? (
            <Button variant="outline" size="lg" asChild>
              <Link href={localeHref(locale, "/areas")}>
                {dict.areas.action}
                <Icon name="arrowUpRight" size="xs" />
              </Link>
            </Button>
          ) : undefined
        }
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <StaggerItem key={area.id}>
            <AreaCard area={area} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
