import { Heading } from "@/components/common/heading";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export async function MilestonesSection() {
  const dict = await getDictionary();
  const { milestones } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading eyebrow={milestones.eyebrow} title={milestones.title} />

      <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {milestones.items.map((item) => (
          <StaggerItem key={item.year} className="flex flex-col gap-2">
            <span className="font-heading text-h3 text-primary">{item.year}</span>
            <span aria-hidden className="h-px w-full bg-border" />
            <Heading as="h3" size="h6" className="pt-1">
              {item.title}
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              {item.body}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
