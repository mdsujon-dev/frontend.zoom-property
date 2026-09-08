import Link from "next/link";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services, type ServiceCard } from "@/data/services";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * In-house service units on the home page.
 *
 * Deliberately the same card system as `AreasSection` — eyebrow pill, two-tone
 * title, then a grid of photo cards that accent only in `primary`. The two
 * bands sit on the same page, so anything else reads as a second design.
 */
export async function ServicesShowcase({ className }: { className?: string } = {}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const t = dict.services;

  return (
    <Section
      id="services"
      className={cn("bg-background", className)}
    >
      <Reveal>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">
            <Icon name="sparkles" size="xs" />
            {t.eyebrow}
          </span>

          <Heading as="h2" size="h2" align="center" className="max-w-4xl">
            {t.titleLead}
            <span className="text-primary">{t.titleAccent}</span>
            {t.titleTail}
          </Heading>

          <Text size="base" align="center" className="max-w-2xl leading-relaxed">
            {t.description}
          </Text>
        </div>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <StaggerItem key={service.id}>
            <ServiceShowcaseCard
              service={service}
              locale={locale}
              title={dict.content.services[index].title}
              description={dict.content.services[index].description}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/**
 * The service card — `AreaServiceCard` with the pin swapped for the unit's own
 * icon. Photo panel, name, promise, and an arrow that fills in on hover; one
 * accent throughout, varied only by weight.
 */
function ServiceShowcaseCard({
  service,
  locale,
  title,
  description,
}: {
  service: ServiceCard;
  locale: Locale;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={localeHref(locale, `/services/${service.id}`)}
      className={cn(
        "group relative isolate flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
      )}
    >
      {/* Corner wash — the one flourish, and it only appears on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 -z-10 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative h-36 w-full overflow-hidden rounded-xl bg-primary/5">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      <div className="flex items-center gap-2">
        <Icon name={service.icon} size="sm" className="shrink-0 text-primary" />
        <span className="truncate font-heading text-base font-bold text-foreground">
          {title}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3">
        <span className="line-clamp-2 min-w-0 text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>

        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <Icon
            name="arrowRight"
            size="xs"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
