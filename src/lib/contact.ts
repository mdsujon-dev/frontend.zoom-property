import type { IconName } from "@/components/common/icon";

/**
 * Contact link helpers.
 *
 * The displayed phone number keeps its spaces (`+880 1958 253301`) because that
 * is how it is read aloud; `tel:` needs them gone. Doing the strip in one place
 * stops the two drifting apart.
 */

/**
 * Bengali digits, folded to the ASCII a dialler understands.
 *
 * The number is typed in the CMS now, and the Bangla side of a bilingual panel
 * invites Bangla numerals. `\d` in JavaScript is ASCII-only, so without this a
 * number entered as ০১৯৫৮… strips down to nothing and the `tel:` link dials
 * an empty string — a broken button that still looks fine on the page.
 */
const toLatinDigits = (value: string) =>
  value.replace(/[\u09e6-\u09ef]/g, (d) =>
    String(d.charCodeAt(0) - 0x09e6),
  );

export function telHref(phone: string) {
  return `tel:${toLatinDigits(phone).replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${toLatinDigits(phone).replace(/\D/g, "")}`;
}

export function mailHref(email: string) {
  return `mailto:${email.trim()}`;
}

/** The profile addresses the CMS holds, one per network. */
export interface SocialUrls {
  facebook: string;
  instagram: string;
  x: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
}

export interface SocialProfile {
  label: string;
  href: string;
  icon: IconName;
}

/**
 * The order the icons appear in, with the artwork and the network's own name.
 *
 * Only the address is content — an icon and a brand name are not things a desk
 * translates or edits, so they stay in code and the CMS offers one URL box per
 * row. Clearing a box is how a network is removed from the site: an empty
 * address drops the icon rather than linking somewhere that does not exist.
 */
const NETWORKS: { key: keyof SocialUrls; label: string; icon: IconName }[] = [
  { key: "facebook", label: "Facebook", icon: "facebook" },
  { key: "instagram", label: "Instagram", icon: "instagram" },
  { key: "x", label: "X", icon: "x" },
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "youtube", label: "YouTube", icon: "youtube" },
  { key: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
];

export function socialProfiles(urls: SocialUrls): SocialProfile[] {
  return NETWORKS.filter((n) => urls?.[n.key]?.trim()).map((n) => ({
    label: n.label,
    href: urls[n.key].trim(),
    icon: n.icon,
  }));
}
