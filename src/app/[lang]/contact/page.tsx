import type { Metadata } from "next";

import { Heading } from "@/components/common/heading";
import { Icon, type IconName } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { PageHeader } from "@/components/layout/page-header";
import { pageBanners } from "@/data/page-banners";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/pages/contact/contact-form";
import { areas } from "@/data/areas";
import { siteConfig, socialLinks } from "@/data/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeAlternates } from "@/i18n/alternates";
import { mailHref, telHref, whatsappHref } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const c = dict.contact.channels;

  // The enquiry form asks which area, and the answer has to be one of the areas
  // we actually cover — so the options are the same list the areas section and
  // `/areas` render, not a second copy that can drift.
  const areaOptions = areas.map((area) => ({
    value: area.id,
    label: locale === "bn" && area.nameBn ? area.nameBn : area.name,
  }));

  const channels: {
    icon: IconName;
    label: string;
    value: string;
    href: string;
    note: string;
  }[] = [
    {
      icon: "phone",
      label: c.call,
      value: siteConfig.phone,
      href: telHref(siteConfig.phone),
      note: c.callNote,
    },
    {
      icon: "whatsapp",
      label: c.whatsapp,
      value: siteConfig.phone,
      href: whatsappHref(siteConfig.phone),
      note: c.whatsappNote,
    },
    {
      icon: "mail",
      label: c.email,
      value: siteConfig.email,
      href: mailHref(siteConfig.email),
      note: c.emailNote,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        description={dict.contact.description}
        image={pageBanners.contact}
      />

      <Section className="bg-background">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                {channels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon name={channel.icon} size="md" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {channel.label}
                      </span>
                      {/* One line, always — a wrapped phone number is unreadable. */}
                      <span className="whitespace-nowrap text-base font-semibold text-foreground group-hover:text-primary">
                        {channel.value}
                      </span>
                      <span className="text-xs text-muted-foreground">{channel.note}</span>
                    </span>
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-5">
                <Heading as="h2" size="h6">
                  {dict.contact.offices}
                </Heading>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{dict.contact.dhaka}</span>
                    <span>{siteConfig.address}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {dict.contact.chattogram}
                    </span>
                    <span>CDA Avenue, GEC Circle &amp; Khulshi</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex size-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon name={social.icon} size="xs" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <Heading as="h2" size="h4">
                {dict.contact.formTitle}
              </Heading>
              <Text size="sm">{dict.contact.formLead}</Text>
              <ContactForm dict={dict.contact.form} areas={areaOptions} />
            </div>
          </Reveal>
        </div>
      </Section>

    </>
  );
}
