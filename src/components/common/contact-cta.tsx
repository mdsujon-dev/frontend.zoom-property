import Link from "next/link";

import { AppContainer } from "@/components/common/app-container";
import { Icon } from "@/components/common/icon";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";

export async function ContactCta() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const cta = dict.cta;

  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <AppContainer>
        <div className="flex flex-col gap-6 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-8 shadow-xl sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10">
          <div className="max-w-2xl">
            <p className="mb-3 font-heading text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/75">
              {cta.eyebrow}
            </p>
            <h2 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
              {cta.description}
            </p>
          </div>
          <Link
            href={localeHref(locale, "/contact")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 font-heading text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            <Icon name="phone" size="xs" />
            {cta.contact}
          </Link>
        </div>
      </AppContainer>
    </section>
  );
}
