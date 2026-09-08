import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { AppContainer } from "@/components/common/app-container";
import { Logo } from "@/components/layout/logo";
import { Text } from "@/components/common/text";
import { projects } from "@/data/projects";
import { footerNav, siteConfig, socialLinks } from "@/data/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { mailHref, telHref } from "@/lib/contact";

/**
 * Footer.
 *
 * Sits on `--footer`, a deeper cut of the brand navy than `--primary` so the
 * page closes off rather than just repeating the button colour. Nothing here
 * uses the foreground / muted-foreground tokens — those resolve to near-black
 * in the light palette and would be unreadable — so text is
 * `footer-foreground` at varying opacity, and the logo uses the white lockup.
 *
 * Three columns rather than four, and no newsletter form — it was asking for an
 * email before the visitor had a reason to give one, and it squeezed the
 * contact details into a cramped column.
 */
export async function SiteFooter() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const labels: Record<string, string> = { ...dict.nav, ...dict.footer };

  return (
    <footer className="bg-footer text-footer-foreground">
      <AppContainer className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href={localeHref(locale, "/")} aria-label={siteConfig.name}>
              {/* White lockup — the navy one would vanish into the background. */}
              <Logo variant="onDark" className="h-9 w-auto" />
            </Link>

            <Text
              size="sm"
              className="max-w-sm leading-relaxed text-footer-foreground/70"
            >
              {dict.meta.description}
            </Text>

            <div className="flex flex-col gap-1.5 pt-1">
              <a
                href={telHref(siteConfig.phone)}
                className="flex w-fit items-center gap-2 whitespace-nowrap text-sm font-semibold text-footer-foreground transition-opacity hover:opacity-75"
              >
                <Icon name="phone" size="xs" />
                {siteConfig.phone}
              </a>
              <a
                href={mailHref(siteConfig.email)}
                className="flex w-fit items-center gap-2 text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground"
              >
                <Icon name="mail" size="xs" />
                {siteConfig.email}
              </a>
              <span className="flex items-start gap-2 text-sm text-footer-foreground/70">
                <Icon name="location" size="xs" className="mt-1 shrink-0" />
                {siteConfig.address}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-footer-foreground/25 text-footer-foreground/80 transition-colors hover:border-footer-foreground/60 hover:bg-footer-foreground/10 hover:text-footer-foreground"
                >
                  <Icon name={social.icon} size="xs" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.key} className="flex flex-col gap-3">
              <h3 className="font-heading text-h6 text-footer-foreground">
                {labels[group.key]}
              </h3>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={localeHref(locale, link.href)}
                  className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground"
                >
                  {labels[link.key]}
                </Link>
              ))}
            </nav>
          ))}

          {/* Projects get their own column rather than a link to the index:
              there are three of them, they are what the company is actually
              building, and the fourth column was empty without them. */}
          <nav className="flex flex-col gap-3">
            <h3 className="font-heading text-h6 text-footer-foreground">
              {dict.nav.projects}
            </h3>
            {projects.map((project) => (
              <Link
                key={project.id}
                href={localeHref(locale, `/projects#${project.id}`)}
                className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground"
              >
                {project.name}
              </Link>
            ))}
          </nav>
        </div>
      </AppContainer>

      {/* Slim bottom bar: one line of small print, so it gets a hairline rule
          and just enough padding to clear the text — not another section. */}
      <div className="border-t border-footer-foreground/15">
        <AppContainer className="flex flex-col items-center justify-between gap-1 py-3 text-footer-foreground/60 sm:flex-row">
          <Text size="xs" tone="inverse" className="text-footer-foreground/60">
            © {new Date().getFullYear()} {siteConfig.name} {dict.footer.rights}
          </Text>
          <Text size="xs" tone="inverse" className="text-footer-foreground/60">
            {dict.footer.demo}
          </Text>
        </AppContainer>
      </div>
    </footer>
  );
}
