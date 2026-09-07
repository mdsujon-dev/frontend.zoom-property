import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Gallery } from "@/components/media/gallery";
import { Counter } from "@/components/motion/counter";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AgentCard } from "@/components/property/agent-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { agents } from "@/data/people";
import { featureIcons, galleryImages, stats } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Sections reused across more than one page.
 *
 * Each is an async Server Component that pulls its own copy from the
 * dictionary, so a page never has to thread `dict` down as a prop. The locale
 * comes from `next/root-params` inside `getDictionary()`.
 */



export async function StatsSection() {
  const dict = await getDictionary();

  return (
    <Section spacing="md" className="border-b border-border bg-background">
      <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StaggerItem
            key={dict.content.stats[index]}
            className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
              <Counter
                to={stat.value}
                compact={"compact" in stat ? stat.compact : false}
                suffix={"suffix" in stat ? stat.suffix : ""}
              />
            </span>
            <Text size="sm" className="font-medium text-muted-foreground">
              {dict.content.stats[index]}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export async function FeaturesSection() {
  const dict = await getDictionary();

  return (
    <Section className="border-t border-border bg-background">
      <SectionHeading
        title={dict.features.title}
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.content.features.map((feature, index) => (
          <StaggerItem key={feature.title}>
            <Card className="h-full border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40">
              <CardContent className="flex flex-col gap-3 p-0">
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={featureIcons[index]} size="md" />
                </span>
                <Heading as="h3" size="h6" className="text-foreground">
                  {feature.title}
                </Heading>
                <Text size="sm" className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </Text>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export async function AgentsSection() {
  const dict = await getDictionary();

  return (
    <Section id="agents" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.agentsSection.title}
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <StaggerItem key={agent.id}>
            <AgentCard agent={agent} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export async function GallerySection() {
  const dict = await getDictionary();

  return (
    <Section id="gallery" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.gallery.title}
        align="center"
      />
      <div className="mt-12">
        <Gallery images={galleryImages} columns={3} ratio="4/3" />
      </div>
    </Section>
  );
}

export async function FaqSection() {
  const dict = await getDictionary();

  return (
    <Section id="faq" className="border-t border-border bg-background">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          title={dict.faq.title}
          className="lg:flex-col lg:items-start"
        />

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {dict.content.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <Text size="sm" className="leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </Text>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
