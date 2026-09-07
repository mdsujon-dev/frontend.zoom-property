import Image from "@/components/common/image";
import Link from "next/link";

import { AppContainer } from "@/components/common/app-container";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Marquee } from "@/components/motion/marquee";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AreaCard } from "./area-card";
import { areas } from "@/data/areas";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

interface AreasSectionProps {
  variant?: "marquee" | "grid";
  className?: string;
}

export async function AreasSection({
  variant = "marquee",
  className,
}: AreasSectionProps = {}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  if (variant === "grid") {
    return (
      <Section id="areas" className={cn("border-t border-border bg-background", className)}>
        <SectionHeading
          title={locale === "bn" ? "সার্ভিস এরিয়া" : "Service Areas"}
          size="h1"
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <StaggerItem key={area.id}>
              <AreaCard area={area} locale={locale} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    );
  }

  return (
    <section
      id="areas"
      style={{ backgroundColor: "#071524" }}
      className={cn(
        "relative w-full overflow-hidden border-y border-white/10 bg-[#071524] py-[44px] sm:py-[68px]",
        className,
      )}
    >
      {/* High-Resolution Luxury City Skyline Background */}
      <Image
        src="https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=2400&q=80"
        alt="Prime city enclaves background"
        fill
        className="pointer-events-none object-cover object-center brightness-90"
        sizes="100vw"
      />

      {/* Deep Luxury Gradient & Dark Overlays for Optimal Legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050e18]/85 via-[#071524]/75 to-[#050e18]/90" />
      <div className="pointer-events-none absolute inset-0 bg-[#050e18]/30 backdrop-blur-[1px]" />

      {/* Ambient Lighting Orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[500px] rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 size-[500px] rounded-full bg-sky-500/15 blur-[140px]" />

      {/* Subtle Architectural Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Section Header */}
      <AppContainer size="xl" className="relative z-10">
        <SectionHeading
          title={locale === "bn" ? "সার্ভিস এরিয়া" : "Service Areas"}
          size="h1"
          tone="inverse"
          action={
            <Link
              href={localeHref(locale, "/properties")}
              className="inline-flex items-center gap-2 self-start sm:self-auto shrink-0 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-sky-400 hover:bg-sky-500 hover:text-white shadow-sm"
            >
              <span>{locale === "bn" ? "সবগুলো দেখুন" : "Explore All"}</span>
              <Icon name="arrowRight" size="xs" />
            </Link>
          }
        />
      </AppContainer>

      {/* Marquee Track with Edge Fades */}
      <div className="relative z-10 mt-8 sm:mt-10 w-full overflow-hidden">
        {/* Left and Right Edge Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#050e18] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#050e18] to-transparent" />

        <Marquee speed={38} gap="1.5rem" pauseOnHover fade={false}>
          {areas.map((area) => (
            <AreaCard
              key={area.id}
              area={area}
              locale={locale}
              className="w-[290px] sm:w-[350px] lg:w-[390px] shrink-0 border-white/15 bg-card/15 shadow-2xl transition-all duration-300 hover:border-sky-400/60 hover:scale-[1.02]"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
