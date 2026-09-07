import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { ImageFrame } from "@/components/media/image-frame";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services, servicesBackdrop } from "@/data/services";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Text } from "@/components/common/text";

export async function ServicesShowcase() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section
      className="relative isolate overflow-hidden bg-cover bg-center bg-fixed py-20 max-md:bg-scroll sm:py-28"
      style={{ backgroundImage: `url(${servicesBackdrop})` }}
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/75" />

      <AppContainer>
        <SectionHeading
          title={dict.services.title}
          description={dict.services.description}
          align="center"
          tone="inverse"
        />

        <div aria-hidden className="mx-auto mt-8 flex w-full max-w-4xl items-center gap-4">
          <span className="h-px flex-1 bg-linear-to-r from-transparent via-white/25 to-white/25" />
          <span className="size-2 rotate-45 border border-sky-300/80 bg-sky-300/20 shadow-[0_0_14px_rgba(125,211,252,0.45)]" />
          <span className="h-px flex-1 bg-linear-to-l from-transparent via-white/25 to-white/25" />
        </div>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const copy = dict.content.services[index];
            return (
              <StaggerItem key={service.id}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-sky-400/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-sky-500/10"
                >
                  <ImageFrame
                    src={service.image}
                    alt=""
                    ratio="4/3"
                    rounded="none"
                    hover="zoom"
                    sizes="quarter"
                  >
                    <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-lg border border-transparent bg-black/60 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-sky-400/40 group-hover:text-sky-400">
                      <Icon name={service.icon} size="sm" />
                    </span>
                  </ImageFrame>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <Heading as="h3" size="h6" className="text-white transition-colors duration-300 group-hover:text-sky-400">
                      {copy.title}
                    </Heading>
                    <Text size="sm" className="flex-1 text-white/70 transition-colors duration-300 group-hover:text-white/90">
                      {copy.description}
                    </Text>

                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </AppContainer>
    </section>
  );
}
