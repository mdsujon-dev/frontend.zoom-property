import Link from "next/link";
import Image from "@/components/common/image";

import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";

interface BlogPromoBannerProps {
  locale: Locale;
  promo: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
}

export function BlogPromoBanner({ locale, promo }: BlogPromoBannerProps) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-r from-brand-charcoal via-brand-green-dark to-brand-charcoal px-6 py-10 shadow-lg sm:px-12 sm:py-14">
      {/* Background architectural image on right side with gradient overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-35 mix-blend-overlay">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
          alt=""
          fill
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex max-w-2xl flex-col gap-2.5">
          <span className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-brand-green-light">
            <span className="size-2 rounded-full bg-brand-green-light animate-pulse" />
            {promo.badge}
          </span>

          <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
            {promo.title}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-white/80">
            {promo.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-brand-green-dark text-white shadow-md font-semibold"
            asChild
          >
            <Link href={localeHref(locale, "/properties")}>
              {promo.cta1}
              <Icon name="arrowRight" size="xs" className="ml-1.5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-semibold"
            asChild
          >
            <Link href={localeHref(locale, "/contact")}>
              {promo.cta2}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
