
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AreaCard } from "@/components/property/area-card";
import { areas } from "@/data/areas";
import { getDictionary } from "@/i18n/dictionaries";

export async function AreasSection() {
  const dict = await getDictionary();

  return (
    <Section id="areas" className="border-t border-border bg-background">
      <SectionHeading
        eyebrow={dict.areas.eyebrow}
        title={dict.areas.title}
        description={dict.areas.description}
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
