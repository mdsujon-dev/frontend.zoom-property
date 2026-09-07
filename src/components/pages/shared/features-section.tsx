import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card, CardContent } from "@/components/ui/card";
import { featureIcons } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

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
