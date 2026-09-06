"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";

import { Container } from "@/components/common/container";
import { Icon } from "@/components/common/icon";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/data/site";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

type NavDict = Record<string, string>;

/**
 * Sticky header.
 *
 * Two visual states. Over the home page's photographic hero it is transparent
 * and its contents are forced to the white treatment; everywhere else — and as
 * soon as you scroll — it sits on the background token and uses normal
 * foreground colours. Without that split the light theme puts near-black text
 * on a dark photograph.
 *
 * Strings arrive as a prop because this is a Client Component and cannot call
 * `getDictionary()` itself.
 */
export function SiteHeader({ locale, dict }: { locale: Locale; dict: NavDict }) {
  const [open, setOpen] = useState(false);
  const { direction, atTop } = useScrollDirection();
  const pathname = usePathname();
  const lenis = useLenis();

  /**
   * Pause smooth scrolling while the mobile sheet is open.
   *
   * Radix locks the page with `overflow: hidden`, but Lenis drives the scroll
   * position itself via `window.scrollTo`, so that lock does nothing to it —
   * the page kept scrolling behind an open menu. Lenis has to be told
   * separately.
   */
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    // Leave scrolling enabled if the header unmounts while the sheet is open.
    return () => lenis.start();
  }, [open, lenis]);

  const home = localeHref(locale, "/");
  // Only the home page opens with a full-bleed image behind the header.
  const overHero = pathname === home && atTop;

  return (
    <motion.header
      initial={false}
      animate={{ y: direction === "down" && !atTop ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        overHero
          ? "bg-linear-to-b from-black/60 to-transparent"
          : "border-b border-border bg-background/90 backdrop-blur-xl",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href={home} aria-label={siteConfig.name} className="shrink-0">
          <Logo
            priority
            variant={overHero ? "onDark" : "auto"}
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const href = localeHref(locale, item.href);
            const active = pathname === href;
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  overHero
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  active && !overHero && "bg-muted text-foreground",
                  active && overHero && "text-white",
                )}
              >
                {dict[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* whitespace-nowrap keeps the number on one line at every width. */}
          <a
            href={telHref(siteConfig.phone)}
            className={cn(
              "hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors xl:flex",
              overHero
                ? "text-white/85 hover:bg-white/10 hover:text-white"
                : "text-foreground hover:bg-muted",
            )}
          >
            <Icon name="phone" size="xs" />
            {siteConfig.phone}
          </a>

          <LanguageSwitcher
            locale={locale}
            label={dict.language}
            onDark={overHero}
          />

          <Button size="lg" className="ml-1 hidden font-medium sm:inline-flex" asChild>
            <Link href={localeHref(locale, "/contact")}>{dict.bookViewing}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label={dict.openMenu}
                className={cn(
                  "lg:hidden",
                  overHero && "text-white hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon name="menu" size="sm" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-6">
              <SheetHeader className="border-b border-border pb-4 text-left">
                <SheetTitle>
                  <Logo className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 py-4">
                {mainNav.map((item) => {
                  const href = localeHref(locale, item.href);
                  return (
                    <Link
                      key={item.key}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        pathname === href
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {dict[item.key]}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-3 border-t border-border pt-4">
                <a
                  href={telHref(siteConfig.phone)}
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border py-2.5 text-sm font-medium text-foreground"
                >
                  <Icon name="phone" size="xs" />
                  {siteConfig.phone}
                </a>
                <Button size="lg" className="w-full" asChild>
                  <Link href={localeHref(locale, "/contact")} onClick={() => setOpen(false)}>
                    {dict.bookViewing}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
}
