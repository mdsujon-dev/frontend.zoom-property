import type { Metadata, Viewport } from "next";
import { Montserrat, Noto_Sans_Bengali, Quicksand } from "next/font/google";

import { JsonLd } from "@/components/common/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ScrollToTop } from "@/components/motion/scroll-to-top";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/data/site";
import { LOCALES, LOCALE_TAGS } from "@/i18n/config";
import { localeAlternates } from "@/i18n/alternates";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { organizationSchema, websiteSchema } from "@/lib/seo";

import "../globals.css";

/**
 * Brand typefaces, and why these files.
 *
 * The guideline specifies **Bryant Bold Alternate** (primary) and **Proxima
 * Nova Alt Bold** (secondary). Both are licensed commercial faces and are not
 * on Google Fonts, so they cannot be self-hosted from here. The closest free
 * stand-ins are used instead:
 *
 *   Bryant Bold Alternate  →  Quicksand   (rounded geometric, single-storey a)
 *   Proxima Nova Alt Bold  →  Montserrat  (the usual free substitute)
 *
 * To ship the real thing: drop the licensed .woff2 files in `src/fonts/`, swap
 * these for `next/font/local`, and keep the same CSS variable names — nothing
 * else in the app needs to change.
 *
 * Noto Sans Bengali covers the `bn` locale. Latin faces have no Bengali glyphs,
 * so without it the browser falls back to whatever the OS has and the Bangla
 * site looks unrelated to the English one.
 */
const display = Quicksand({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

/**
 * Per-locale metadata: title, description, canonical and the hreflang set all
 * follow the active language. `generateStaticParams` prerenders both locales,
 * so nothing here costs a request at runtime.
 */
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();

  return {
    title: {
      default: `${siteConfig.name} — ${dict.meta.tagline}`,
      template: `%s · ${siteConfig.name}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(siteConfig.url),
    alternates: localeAlternates(locale, "/"),
    openGraph: {
      title: `${siteConfig.name} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: siteConfig.name,
      locale: LOCALE_TAGS[locale].replace("-", "_"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${dict.meta.tagline}`,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

// `themeColor` belongs here, not in `metadata` — deprecated there since Next 14.
export const viewport: Viewport = {
  // Single value: the site is light-only, so there is no dark pair to declare.
  themeColor: "#ffffff",
};

/** Both locales are prerendered — no runtime locale work. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <html
      lang={LOCALE_TAGS[locale]}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${bengali.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        {/* Site-wide entities. Page-level schemas reference these by @id. */}
        <JsonLd schema={organizationSchema()} />
        <JsonLd schema={websiteSchema()} />
        <Providers>
          <ScrollProgress />
          <SiteHeader locale={locale} dict={dict.nav} />
          <main id="top" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
