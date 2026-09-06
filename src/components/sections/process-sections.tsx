import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * The step-by-step sections. Each one belongs to exactly one page — they are
 * what makes /properties, /projects, /agents and /about read differently
 * instead of being the same card grid with a new heading.
 */

/** /properties — what happens between an enquiry and the keys. */
export async function BuyingStepsSection() {
  const dict = await getDictionary();
  const { buying } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={buying.eyebrow}
        title={buying.title}
        description={buying.description}
      />

      {/* A numbered rail rather than cards: the order is the content. */}
      <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {buying.steps.map((step, index) => (
          <StaggerItem key={step.title} className="relative flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              {/* Connector, desktop only; the last step has nothing to join. */}
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

/** /projects — what each audited construction stage actually covers. */
export async function ConstructionStagesSection() {
  const dict = await getDictionary();
  const { construction } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={construction.eyebrow}
        title={construction.title}
        description={construction.description}
      />

      <Stagger className="mt-12 flex flex-col gap-0">
        {construction.stages.map((stage, index) => (
          <StaggerItem
            key={stage.title}
            className="grid gap-2 border-l-2 border-border py-5 pl-6 sm:grid-cols-[200px_1fr] sm:gap-6"
          >
            <div className="relative flex items-center gap-3">
              {/* Node sits on the rail, hence the negative offset. */}
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

/** /agents — how an enquiry reaches one named person. */
export async function AdvisorMatchSection() {
  const dict = await getDictionary();
  const { match } = dict.pages;

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={match.eyebrow}
        title={match.title}
        description={match.description}
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

/** /about — the seven checks, as a checklist rather than feature cards. */
export async function VettingSection() {
  const dict = await getDictionary();
  const { vetting } = dict.pages;

  return (
    <Section className="border-t border-border bg-background">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow={vetting.eyebrow}
          title={vetting.title}
          description={vetting.description}
          className="lg:flex-col lg:items-start"
        />

        <Reveal delay={0.1}>
          <ol className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
            {vetting.checks.map((check, index) => (
              <li key={check} className="flex items-start gap-4 p-5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon name="check" size="xs" />
                </span>
                <span className="flex-1 text-sm text-foreground">{check}</span>
                <span className="font-heading text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/** /about — company history, as a dated rail. */
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
