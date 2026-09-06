import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES, isLocale } from "@/i18n/config";

/**
 * Locale routing.
 *
 * `/properties` → redirect to `/en/properties` (or `/bn/…`), picked from a
 * previously chosen locale cookie first, then the browser's Accept-Language.
 * Once a path already carries a locale it is left alone, so the redirect only
 * ever costs one hop on the first visit.
 *
 * Hand-rolled rather than pulling in `negotiator` + `intl-localematcher`: two
 * locales do not need a full RFC 4647 matcher, and the dependency would run on
 * every request.
 */
const LOCALE_COOKIE = "locale";

function pickLocale(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;

  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  // "bn-BD,bn;q=0.9,en;q=0.8" → [{tag:'bn-bd', q:1}, …], best first.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.split("=")[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = pickLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  // Remember the choice so the next visit skips negotiation entirely.
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Skip Next internals and anything with a file extension (images, icons,
  // robots.txt, sitemap.xml) — those must not be pushed under a locale.
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
