import type { Metadata } from "next";
import { headers } from "next/headers";

import { NotFoundView } from "@/components/pages/not-found/not-found-view";
import { siteConfig } from "@/data/site";
import { LOCALE_TAGS } from "@/i18n/config";
import { getDictionaryFor } from "@/i18n/dictionaries";
import { PATHNAME_HEADER, resolveNotFound } from "@/lib/not-found";

import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * The 404 for URLs that match no route at all.
 *
 * The root layout lives under a dynamic segment (`app/[lang]/layout.tsx`), so
 * an unmatched path never resolves a layout to render inside — which is the
 * case `global-not-found` exists for. Enabled by `experimental.globalNotFound`
 * in `next.config.ts`.
 *
 * Because it bypasses every layout it must return a whole document and bring
 * its own stylesheet and fonts. There is deliberately no header or footer: the
 * navigation this page needs is the quick-link grid inside it.
 *
 * `notFound()` thrown *inside* a matched route is handled by
 * `app/[lang]/not-found.tsx`, which keeps the full chrome.
 */
export const metadata: Metadata = {
  title: `Page not found · ${siteConfig.name}`,
  // Set here as well as in the layout: this page renders outside it, and the
  // root `opengraph-image` still needs an origin to resolve against.
  metadataBase: new URL(siteConfig.url),
};

export default async function GlobalNotFound() {
  // No params reach this page — the URL matched nothing. The proxy stamps the
  // requested path on a header so the language and the guess can still be
  // worked out server-side, and land in the HTML rather than after hydration.
  const headerList = await headers();
  const resolved = resolveNotFound(headerList.get(PATHNAME_HEADER) ?? "/");
  const dict = await getDictionaryFor(resolved.locale);

  return (
    <html
      lang={LOCALE_TAGS[resolved.locale]}
      className={`${fontVariables} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <main className="flex flex-1 flex-col justify-center">
          <NotFoundView {...resolved} t={dict.notFound} nav={dict.nav} />
        </main>
      </body>
    </html>
  );
}
