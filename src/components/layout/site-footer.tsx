import Link from "next/link";

import { Icon } from "@/components/common/icon";
import { AppContainer } from "@/components/common/app-container";
import { Logo } from "@/components/layout/logo";
import { Text } from "@/components/common/text";
import { getProjects } from "@/server/features/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { footerLinks } from "@/lib/footer-links";
import { mailHref, socialProfiles, telHref } from "@/lib/contact";

/**
 * Footer.
 *
 * Sits on `--footer`, the guideline's charcoal secondary rather than the
 * primary green, so the page closes off rather than just repeating the button
 * colour. It is also the ground the guideline shows its reversed logo on. Nothing here
 * uses the foreground / muted-foreground tokens — those resolve to near-black
 * in the light palette and would be unreadable — so text is `footer-foreground`
 * at full strength (8.3:1 on the charcoal; the 60% it used to be measured
 * 4.21:1 and failed AA), and the logo uses the white lockup. Links hover to the
 * guideline's light green, since white-on-white would leave them with no hover
 * state at all.
 *
 * Three columns rather than four, and no newsletter form — it was asking for an
 * email before the visitor had a reason to give one, and it squeezed the
 * contact details into a cramped column.
 */
export async function SiteFooter() {
  // The project column is whatever is published, not a list typed in here:
  // a footer that still advertises a delivered project is worse than one with
  // a shorter column. Four, because that is what the column has room for.
  const [dict, locale, projects] = await Promise.all([
    getDictionary(),
    getLocale(),
    getProjects({ isFooter: true, limit: 6, sort: "order" }),
  ]);
  const footerProjects = projects
    .filter((project) => project.isFooter !== false)
    .slice(0, 6);
  const t = dict.footer;
  /**
   * The two link columns.
   *
   * The list lives in the database rather than in the site's dictionary, and
   * that is deliberate: an empty box in the panel means "unchanged", so a
   * built-in default can be renamed but never removed. Owning the list makes
   * the remove button in the panel do what it says.
   *
   * `footerLinks` drops half-filled rows and the gap a removed row leaves, so
   * a column is whatever survives. A column with nothing in it is not drawn.
   */
  const columns = [
    { heading: t.explore, links: footerLinks(t.exploreLinks) },
    { heading: t.services, links: footerLinks(t.serviceLinks) },
  ].filter((column) => column.links.length);
  // Same source as the contact page: one edit in the panel moves the
  // number in both places, which is the only way a phone number on two
  // pages stays the same phone number.
  const d = dict.contact.details;
  const socials = socialProfiles(dict.contact.social);

  return (
    <footer className="bg-footer text-footer-foreground">
      <AppContainer className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href={localeHref(locale, "/")} aria-label={t.companyName}>
              {/* White lockup — the navy one would vanish into the background. */}
              <Logo variant="onDark" className="h-9 w-auto" />
            </Link>

            <Text
              size="sm"
              className="max-w-sm leading-relaxed text-footer-foreground/75"
            >
              {dict.meta.description}
            </Text>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={telHref(d.phone)}
                className="flex w-fit items-center gap-2 whitespace-nowrap text-sm text-footer-foreground/85 transition-colors hover:text-brand-green-light"
              >
                <Icon name={t.phoneIcon} size="xs" className="text-footer-foreground/60" />
                {d.phone}
              </a>
              <a
                href={mailHref(d.email)}
                className="flex w-fit items-center gap-2 text-sm text-footer-foreground/85 transition-colors hover:text-brand-green-light"
              >
                <Icon name={t.emailIcon} size="xs" className="text-footer-foreground/60" />
                {d.email}
              </a>
              <span className="flex items-start gap-2 text-sm text-footer-foreground/75">
                <Icon name={t.addressIcon} size="xs" className="mt-1 shrink-0 text-footer-foreground/60" />
                {d.dhakaAddress}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-footer-foreground/20 text-footer-foreground/75 transition-colors hover:border-brand-green-light hover:bg-footer-foreground/10 hover:text-brand-green-light"
                >
                  <Icon name={social.icon} size="xs" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} className="flex flex-col gap-3">
              <h3 className="font-heading text-h6 text-footer-foreground font-semibold">
                {column.heading}
              </h3>
              {column.links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={localeHref(locale, link.href)}
                  className="text-sm text-footer-foreground/75 transition-colors hover:text-brand-green-light"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          {/* Projects get their own column rather than a link to the index:
              there are three of them, they are what the company is actually
              building, and the fourth column was empty without them. */}
          <nav className="flex flex-col gap-3">
            <h3 className="font-heading text-h6 text-footer-foreground font-semibold">
              {dict.nav.projects}
            </h3>
            {footerProjects.map((project) => (
              <Link
                key={project.id}
                href={localeHref(locale, `/projects#${project.id}`)}
                className="text-sm text-footer-foreground/75 transition-colors hover:text-brand-green-light"
              >
                {project.name}
              </Link>
            ))}
          </nav>
        </div>
      </AppContainer>

      {/* Slim bottom bar: one line of small print, so it gets a hairline rule
          and just enough padding to clear the text — not another section. */}
      <div className="border-t border-footer-foreground/10">
        <AppContainer className="flex flex-col items-center justify-between gap-1 py-3 text-footer-foreground/60 sm:flex-row">
          <Text size="xs" tone="inverse" className="text-footer-foreground/60">
            © {new Date().getFullYear()} {t.companyName} {t.rights}
          </Text>
          {/* The legal pages sit in the bottom bar rather than a nav column:
              they are read once, on purpose, by someone looking for them. */}
          <div className="flex items-center gap-4">
            <Link
              href={localeHref(locale, "/terms")}
              className="text-xs text-footer-foreground/60 transition-colors hover:text-brand-green-light"
            >
              {t.terms}
            </Link>
            <Link
              href={localeHref(locale, "/privacy")}
              className="text-xs text-footer-foreground/60 transition-colors hover:text-brand-green-light"
            >
              {t.privacy}
            </Link>
          </div>
        </AppContainer>
      </div>
    </footer>
  );
}
