import { Heading } from "@/components/common/heading";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export async function AdvisorMatchSection() {
  const dict = await getDictionary();
  const { match } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        title={match.title}
      />

      <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
        {match.steps.map((step) => (
          <StaggerItem
            key={step.title}
            className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
          >
            <Heading as="h3" size="h6">
              {step.title}
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              {step.body}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
