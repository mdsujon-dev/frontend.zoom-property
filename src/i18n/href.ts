import type { Locale } from "./config";

/**
 * Prefix an app path with the active locale.
 *
 * Every internal link goes through this. Writing `/properties` directly would
 * drop the visitor back through the proxy redirect and lose their language on
 * the very next click.
 */
export function localeHref(locale: Locale, path: string) {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}
