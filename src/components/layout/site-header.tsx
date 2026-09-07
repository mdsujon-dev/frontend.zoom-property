"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
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
  const { direction, atTop, scrolledPast } = useScrollDirection();
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const lenis = useLenis();

  /**
   * Hidden only while scrolling down *and* past the pin distance, so a small
   * flick near the top never pulls the navigation away.
   */
  const hidden = direction === "down" && scrolledPast;

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
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : hidden
            ? { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }
            : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
      }
      style={{ willChange: "transform" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        overHero
          ? "bg-transparent"
          : "border-b border-border/80 bg-background/90 backdrop-blur-xl shadow-xs",
      )}
    >

      <Container className="relative flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href={home} aria-label={siteConfig.name} className="shrink-0">
          <Logo
            priority
            variant={overHero ? "onDark" : "auto"}
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1.5 lg:flex">
          {mainNav.map((item) => {
            const href = localeHref(locale, item.href);
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.key}
                href={href}
                className={cn(
                  "relative flex items-center justify-center rounded-lg px-3.5 py-2 text-sm transition-all duration-200",
                  overHero
                    ? active
                      ? "bg-white/20 font-semibold text-white backdrop-blur-xs"
                      : "font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-primary/[0.08] font-semibold text-primary"
                      : "font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span>{dict[item.key]}</span>
                {active && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full",
                      overHero ? "bg-white shadow-xs" : "bg-primary shadow-xs",
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
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
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link
                      key={item.key}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-all",
                        active
                          ? "bg-primary/[0.08] font-semibold text-primary border-l-4 border-primary pl-3"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium",
                      )}
                    >
                      <span>{dict[item.key]}</span>
                      {active && (
                        <span className="size-1.5 rounded-full bg-primary" />
                      )}
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
                <Button size="lg" className="w-full" style={{ height: "42px" }} asChild>
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
