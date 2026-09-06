import { Container } from "@/components/common/container";
import { Eyebrow, Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { services, servicesBackdrop } from "@/data/services";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * The in-house units, on a fixed backdrop.
 *
 * The photograph is attached to the viewport (`bg-fixed`), so the cards slide
 * over a still image as you scroll. Two caveats that shape the markup:
 *
 * - iOS Safari ignores `background-attachment: fixed` and, worse, repaints the
 *   whole layer on every scroll frame. `max-md:bg-scroll` drops back to a
 *   normal background below the md breakpoint, where the effect would not read
 *   at that size anyway.
 * - A photograph alone is not a reliable ground for white text, so a fixed
 *   scrim sits between it and the content. It is `black`, not a theme token:
 *   the text on top is white in every theme, so the scrim must be too.
 */
export async function ServicesShowcase() {
  const dict = await getDictionary();

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center bg-fixed py-20 max-md:bg-scroll sm:py-28"
      style={{ backgroundImage: `url(${servicesBackdrop})` }}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/75" />

      <Container>
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow className="text-white/70">{dict.services.eyebrow}</Eyebrow>
            <Heading as="h2" size="h2" className="text-white">
              {dict.services.title}
            </Heading>
            <Text size="lead" className="text-white/75">
              {dict.services.description}
            </Text>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const copy = dict.content.services[index];
            return (
              <StaggerItem key={service.id}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition-colors duration-500 hover:border-white/35">
                  <ImageFrame
                    src={service.image}
                    alt=""
                    ratio="4/3"
                    rounded="none"
                    hover="zoom"
                    sizes="quarter"
                  >
                    <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm">
                      <Icon name={service.icon} size="sm" />
                    </span>
                  </ImageFrame>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <Heading as="h3" size="h6" className="text-white">
                      {copy.title}
                    </Heading>
                    <Text size="sm" className="flex-1 text-white/70">
                      {copy.description}
                    </Text>

                    <span className="mt-3 flex items-center gap-2 text-sm font-medium text-white">
                      {dict.services.cta}
                      <span className="flex size-7 items-center justify-center rounded-full border border-white/30 transition-transform duration-300 group-hover:translate-x-1">
                        <Icon name="arrowRight" size="xs" />
                      </span>
                    </span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
