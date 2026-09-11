import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getDictionary } from "@/i18n/dictionaries";

export async function FaqSection() {
  const dict = await getDictionary();

  return (
    <Section id="faq" className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <SectionHeading
          title={dict.faq.title}
          description={dict.faq.description}
          className="text-center"
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
