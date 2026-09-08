import { Icon, type IconName } from "@/components/common/icon";
import { siteConfig } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { mailHref, telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * The three ways to reach a person, parked on the right edge of every page.
 *
 * A property site is read the whole way down and the decision to call happens
 * anywhere in it — usually two screens away from the header and four from the
 * footer. This keeps the phone, WhatsApp and email one click from wherever that
 * happens, without a chat bubble that opens over the page uninvited.
 *
 * Icons only, with the channel name on `aria-label` and `title`: the strip is
 * three of the most recognisable glyphs there are, and a printed word next to
 * each turned a quiet edge tab into a panel. Screen readers still hear the full
 * name, and a mouse held still gets it as a tooltip.
 *
 * Each one carries its own colour standing still rather than waiting for a
 * hover — WhatsApp's green is half of what makes that glyph readable at 20px,
 * and three grey icons on a white strip look disabled. Hover then fills the
 * whole cell and the icon goes white, so the colour is the resting state and
 * the fill is the response.
 *
 * Plain `<a href>` — `tel:`, `https://wa.me/…`, `mailto:` — so the phone dials,
 * WhatsApp opens, and the mail client gets the address. No state, no client
 * bundle: it is a server component.
 *
 * It is vertically centred rather than bottom-anchored: `ScrollToTop` already
 * owns the bottom-right corner, and two floating controls fighting for the same
 * 60 pixels is how a page ends up with a button nobody can press.
 */
export async function ContactDock() {
  const dict = await getDictionary();
  const channels = dict.contact.channels;

  const links: {
    icon: IconName;
    /** The channel name — read out, and shown as the browser's own tooltip. */
    title: string;
    href: string;
    /** Resting colour. WhatsApp's is its own; the other two are the brand's. */
    tone: string;
    external?: boolean;
  }[] = [
    {
      icon: "phone",
      title: channels.call,
      href: telHref(siteConfig.phone),
      tone: "text-primary",
    },
    {
      icon: "whatsapp",
      title: channels.whatsapp,
      href: whatsappHref(siteConfig.phone),
      tone: "text-[#25d366]",
      external: true,
    },
    {
      icon: "mail",
      title: channels.email,
      href: mailHref(siteConfig.email),
      tone: "text-brand",
    },
  ];

  return (
    <nav
      aria-label={dict.nav.contact}
      // Flush to the edge, so the border runs top, left and bottom — there is
      // no right edge to draw, it is off the screen. `--input` rather than
      // `--border`: a white panel on a photograph needs the darker hairline to
      // register at all.
      className="fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col divide-y divide-border rounded-l-lg border border-r-0 border-input bg-card shadow-[-8px_0_28px_-14px] shadow-foreground/40 [&>a:first-child]:rounded-tl-lg [&>a:last-child]:rounded-bl-lg"
    >
      {links.map((link) => (
        <a
          key={link.icon}
          href={link.href}
          aria-label={link.title}
          title={link.title}
          {...(link.external
            ? { target: "_blank", rel: "noreferrer" }
            : undefined)}
          className={cn(
            "flex size-12 items-center justify-center transition-colors",
            link.tone,
            "hover:bg-primary hover:text-primary-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary",
          )}
        >
          <Icon name={link.icon} size="md" />
        </a>
      ))}
    </nav>
  );
}
