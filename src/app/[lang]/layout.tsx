import type { Metadata, Viewport } from "next";

import { fontVariables } from "../fonts";
import { JsonLd } from "@/components/common/json-ld";
import { ContactDock } from "@/components/layout/contact-dock";
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
      className={`${fontVariables} antialiased`}
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
          <ContactDock />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
