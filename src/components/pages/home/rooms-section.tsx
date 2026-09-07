import { AppContainer } from "@/components/common/app-container";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { RoomsAccordion } from "./rooms-accordion";
import { rooms } from "@/data/rooms";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function RoomsSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="border-t border-border bg-muted/30 py-16 sm:py-24">
      <AppContainer size="lg">
        <SectionHeading
          title={dict.rooms.title}
          description={dict.rooms.description}
          titleClassName="whitespace-nowrap"
          descriptionClassName="max-w-3xl"
          align="center"
        />

        <Reveal delay={0.1} className="mt-12">
          <RoomsAccordion
            rooms={rooms}
            copy={dict.content.rooms}
            dict={{ readMore: dict.rooms.readMore, expand: dict.rooms.expand }}
            contactHref={localeHref(locale, "/contact")}
          />
        </Reveal>
      </AppContainer>
    </section>
  );
}
