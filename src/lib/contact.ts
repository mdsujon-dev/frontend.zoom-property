/**
 * Contact link helpers.
 *
 * The displayed phone number keeps its spaces (`+880 1958 253301`) because that
 * is how it is read aloud; `tel:` needs them gone. Doing the strip in one place
 * stops the two drifting apart.
 */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function mailHref(email: string) {
  return `mailto:${email}`;
}
