import { Heading } from "@/components/common/heading";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export async function ConstructionStagesSection() {
  const dict = await getDictionary();
  const { construction } = dict.pages;
  const stages = (construction?.stages || []).filter(
    (s): s is { title: string; body: string } => Boolean(s && (s.title || s.body)),
  );

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={construction.eyebrow}
        title={construction.title}
        description={construction.description}
      />

      <Stagger className="mt-12 flex flex-col gap-0">
        {stages.map((stage, index) => (
          <StaggerItem
            key={`${stage.title}-${index}`}
            className="grid gap-2 border-l-2 border-border py-5 pl-6 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <div className="relative flex items-center gap-3">
              <span
                aria-hidden
                className="absolute -left-[31px] size-3 rounded-full border-2 border-background bg-primary"
              />
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Heading as="h3" size="h6">
                {stage.title}
              </Heading>
            </div>
            <Text size="sm" className="text-muted-foreground">
              {stage.body}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
