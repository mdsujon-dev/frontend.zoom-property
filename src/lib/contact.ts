/**
 * Contact link helpers.
 *
 * The displayed phone number keeps its spaces (`+880 1958 253301`) because that
 * is how it is read aloud; `tel:` needs them gone. Doing the strip in one place
 * stops the two drifting apart.
 */

import { toLatinDigits } from "@/lib/format";

export function telHref(phone: string) {
  return `tel:${toLatinDigits(phone).replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${toLatinDigits(phone).replace(/\D/g, "")}`;
}

export function mailHref(email: string) {
  return `mailto:${email.trim()}`;
}

/** One row of the panel's social list. Every field is optional at runtime. */
export interface SocialProfile {
  label: string;
  href: string;
  /** A Font Awesome class string, e.g. `fa-brands fa-facebook-f`. */
  icon: string;
}

/** A link with nothing to point at is not a link. */
const isUsable = (href: unknown): href is string =>
  typeof href === "string" && href.trim().length > 0;

/**
 * The social row's accessible name, when nobody typed one.
 *
 * The host is a better guess than the position in the list: "instagram.com"
 * tells a screen-reader user where the link goes, "Link 3" tells them nothing.
 * A malformed address falls back to the plain word.
 */
const nameFromHref = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return "Social link";
  }
};

/**
 * The social icons, read straight from the CMS list.
 *
 * `unknown` in, validated out. These rows are typed into a panel — a row can
 * be half-filled, and removing row 3 of 6 leaves the stored indices with a gap
 * in them, so the array arrives with holes. Everything downstream renders a
 * list of links and should not have to know that.
 *
 * Order is the order of the list in the panel. The icon is a Font Awesome
 * class string, which `Icon` recognises and draws; a row with a link but no
 * icon gets the generic chain link rather than disappearing.
 */
export function socialProfiles(rows: unknown): SocialProfile[] {
  if (!Array.isArray(rows)) return [];

  return rows.flatMap((row) => {
    if (!row || typeof row !== "object") return [];
    const { icon, label, href } = row as Record<string, unknown>;
    if (!isUsable(href)) return [];

    return [
      {
        href: href.trim(),
        icon:
          typeof icon === "string" && icon.trim()
            ? icon.trim()
            : "fa-solid fa-link",
        label:
          typeof label === "string" && label.trim()
            ? label.trim()
            : nameFromHref(href.trim()),
      },
    ];
  });
}
