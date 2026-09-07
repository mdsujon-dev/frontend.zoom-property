import Link from "next/link";
import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { SectionHeading } from "@/components/common/section-heading";
import { ImageFrame } from "@/components/media/image-frame";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services, servicesBackdrop } from "@/data/services";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
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
          tone="inverse"
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const copy = dict.content.services[index];
            return (
              <StaggerItem key={service.id}>
                <Link
                  href={localeHref(locale, `/services/${service.id}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-sky-400/50 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer block"
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

                    <span className="mt-3 flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 group-hover:text-sky-400">
                      {dict.services.cta}
                      <span className="flex size-7 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:border-sky-400 group-hover:bg-sky-400/20 group-hover:text-sky-400">
                        <Icon name="arrowRight" size="xs" />
                      </span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </AppContainer>
    </section>
  );
}
