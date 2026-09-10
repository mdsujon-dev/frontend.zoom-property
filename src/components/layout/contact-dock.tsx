import { CallChime } from "@/components/layout/call-chime";
import { Icon, type IconName } from "@/components/common/icon";
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
 * The call cell rings. Three cells that all sit still make the most valuable
 * one no easier to find than the other two, so the handset rocks and a halo
 * pushes out of the button — for about a second in every four, on one shared
 * cycle, and never while a pointer is on it. Continuous movement would read as
 * an advert; a beat of it every few seconds reads as a phone.
 *
 * `CallChime` gives that first minute a sound as well, once per tab. It is the
 * only client code in here.
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
  const d = dict.contact.details;

  const links: {
    icon: IconName;
    /** The channel name — read out, and shown as the browser's own tooltip. */
    title: string;
    href: string;
    /** Resting colour. WhatsApp's is its own; the other two are the brand's. */
    tone: string;
    /** Only the call cell rings; two ringing icons would be noise. */
    ring?: boolean;
    external?: boolean;
  }[] = [
    {
      icon: "phone",
      title: channels.call,
      href: telHref(d.phone),
      tone: "text-primary",
      ring: true,
    },
    {
      icon: "whatsapp",
      title: channels.whatsapp,
      href: whatsappHref(d.whatsapp),
      tone: "text-[#25d366]",
      external: true,
    },
    {
      icon: "mail",
      title: channels.email,
      href: mailHref(d.email),
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
      <CallChime />

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
            "group relative flex size-12 items-center justify-center transition-colors",
            link.tone,
            "hover:bg-primary hover:text-primary-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary",
          )}
        >
          {link.ring ? (
            // The halo. Behind the icon, clipped to nothing on hover so the
            // cell is a plain button the moment someone reaches for it.
            <span
              aria-hidden
              className="pointer-events-none absolute inset-2 animate-(--animate-call-halo) rounded-full bg-primary/35 group-hover:hidden motion-reduce:hidden"
            />
          ) : null}

          <span
            className={cn(
              "relative",
              link.ring &&
                "animate-(--animate-phone-ring) group-hover:animate-none motion-reduce:animate-none",
            )}
          >
            <Icon name={link.icon} size="md" />
          </span>
        </a>
      ))}
    </nav>
  );
}
