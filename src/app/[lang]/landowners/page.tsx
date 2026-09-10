import type { Metadata } from "next";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { PageHeader } from "@/components/layout/page-header";
import { LandownerCaseStudies } from "@/components/pages/landowners/landowner-case-studies";
import { LandownerStory } from "@/components/pages/landowners/landowner-story";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { landownerBenefits } from "@/data/landowner";
import { pageBanners } from "@/data/page-banners";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.landowners.metaTitle,
    description: dict.landowners.metaDescription,
    alternates: localeAlternates(locale, "/landowners"),
  };
}

export default async function LandownersPage() {
  const dict = await getDictionary();
  const t = dict.landowners;

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        image={dict.landowner.backgroundImage || pageBanners.landowners}
      />

      <LandownerStory />

      {/* The four contract terms, as cards. */}
      <Section className="border-t border-border bg-muted/30">
        <SectionHeading
          title={t.benefitsTitle}
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {landownerBenefits.map((benefit) => (
            <StaggerItem
              key={benefit.title}
              className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon name={benefit.icon} size="md" />
              </span>
              <Heading as="h3" size="h6">
                {benefit.title}
              </Heading>
              <Text size="sm" className="text-muted-foreground">
                {benefit.description}
              </Text>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* How the process runs — a numbered rail, same language as /properties. */}
      <LandownerCaseStudies />

      <Section className="border-t border-border bg-background">
        <SectionHeading eyebrow={t.eyebrow} title={t.stepsTitle} />

        <Stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <StaggerItem key={step.title} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                {index < t.steps.length - 1 ? (
                  <span aria-hidden className="hidden h-px flex-1 bg-border lg:block" />
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
    </>
  );
}

