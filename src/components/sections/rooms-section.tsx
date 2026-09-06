import { Container } from "@/components/common/container";
import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { RoomsAccordion } from "@/components/property/rooms-accordion";
import { rooms } from "@/data/rooms";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function RoomsSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <Container size="lg">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {dict.rooms.pill}
            </span>
            <Heading as="h2" size="h2" align="center" className="max-w-2xl">
              {dict.rooms.title}
            </Heading>
            <Text size="lead" align="center" className="max-w-2xl text-muted-foreground">
              {dict.rooms.description}
            </Text>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <RoomsAccordion
            rooms={rooms}
            copy={dict.content.rooms}
            dict={{ readMore: dict.rooms.readMore, expand: dict.rooms.expand }}
            contactHref={localeHref(locale, "/contact")}
          />
        </Reveal>
      </Container>
    </section>
  );
}
