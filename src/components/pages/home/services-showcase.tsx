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
            {t.titleLead ? `${t.titleLead.trimEnd()} ` : ""}
            <span className="text-primary">{t.titleAccent?.trim()}</span>
            {t.titleTail ? ` ${t.titleTail.trimStart()}` : ""}
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
        "group relative isolate flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card/95 backdrop-blur-sm",
        "shadow-[0_1px_2px_rgba(27,35,24,0.04),0_10px_30px_-18px_rgba(27,35,24,0.55)]",
        "transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(27,35,24,0.06),0_22px_46px_-20px_rgba(75,128,45,0.45)]",
      )}
    >
      <div className="flex items-stretch gap-3 px-4 pt-3.5 pb-3">
        {/* Thumbnail */}
        <div className="relative shrink-0">
          <div className="h-16 w-20 overflow-hidden rounded-md border border-border/70 bg-primary/5">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="120px"
              placeholder="blur"
              blurDataURL={shimmerDataUrl()}
              className="object-cover"
            />
          </div>

          <span className="absolute -top-2 -right-1 inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold shadow-[0_4px_10px_rgba(27,35,24,0.18)]">
            <Icon name={service.icon} size="xs" />
          </span>
        </div>

        {/* Copy */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="line-clamp-2 font-heading text-[15px] font-semibold leading-snug text-foreground">
            {title}
          </span>
          <span className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {description}
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 bg-muted/40 px-4 py-2.5 text-[11px] text-muted-foreground">
        <span>{locale === "bn" ? "জুম প্রোপার্টি ইন-হাউজ টিম" : "Zoom Property in‑house unit"}</span>

        <span
          aria-hidden
          className="flex shrink-0 items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          {locale === "bn" ? "বিস্তারিত দেখুন" : "Explore service"}
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
