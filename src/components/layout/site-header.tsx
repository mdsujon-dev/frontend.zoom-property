"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { Icon } from "@/components/common/icon";
import { Container } from "@/components/common/container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { mainNav, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** Sticky header: hides on scroll down, returns on scroll up, blurs off-top. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { direction, atTop } = useScrollDirection();
  const { scrollTo } = useSmoothScroll();

  const goTo = (href: string) => {
    setOpen(false);
    scrollTo(href, -80);
  };

  return (
    <motion.header
      initial={false}
      animate={{ y: direction === "down" && !atTop ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        atTop
          ? "bg-transparent"
          : "border-b border-border/60 bg-background/80 backdrop-blur-xl",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            goTo("#top");
          }}
          className="flex items-center gap-2 font-heading text-h6 font-semibold"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon name="building" size="sm" />
          </span>
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="lg"
              onClick={() => goTo(item.href)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Button size="lg" className="hidden sm:inline-flex">
            Book a viewing
            <Icon name="arrowRight" size="xs" />
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Icon name="menu" size="sm" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {mainNav.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    size="lg"
                    className="justify-start"
                    onClick={() => goTo(item.href)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button size="lg" className="mt-3">
                  Book a viewing
                  <Icon name="arrowRight" size="xs" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </motion.header>
  );
}
