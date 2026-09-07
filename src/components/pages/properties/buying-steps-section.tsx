import { Heading } from "@/components/common/heading";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export async function BuyingStepsSection() {
  const dict = await getDictionary();
  const { buying } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        title={buying.title}
      />

      <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {buying.steps.map((step, index) => (
          <StaggerItem key={step.title} className="relative flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              {index < buying.steps.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-border lg:block"
                />
              ) : null}
            </div>
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
