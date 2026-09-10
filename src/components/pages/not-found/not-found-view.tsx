"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon, type IconName } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { DURATION, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import type { ResolvedNotFound } from "@/lib/not-found";
import { cn } from "@/lib/utils";

type QuickLinkKey = keyof Dictionary["notFound"]["links"];

/** The six worth offering as a fresh start, with an icon each. */
const QUICK_LINKS: { key: QuickLinkKey; icon: IconName }[] = [
  { key: "properties", icon: "building" },
  { key: "projects", icon: "construction" },
  { key: "areas", icon: "location" },
  { key: "landowners", icon: "handover" },
  { key: "blog", icon: "quote" },
  { key: "contact", icon: "phone" },
];

export interface NotFoundViewProps extends ResolvedNotFound {
  t: Dictionary["notFound"];
  nav: Dictionary["nav"];
}

/**
 * The 404 body. Presentation only — the locale, the attempted path and the
 * suggestion are all worked out on the server (see `src/lib/not-found.ts`), so
 * every word here is in the HTML before any JavaScript runs.
 */
export function NotFoundView({
  locale,
  attempted,
  suggestion,
  t,
  nav,
}: NotFoundViewProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : STAGGER.base },
    },
  };

  const item = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
        },
      };

  return (
    <section className="relative isolate flex min-h-[70dvh] items-center overflow-hidden py-20 sm:py-28">
      <Backdrop animated={!prefersReducedMotion} />

      <AppContainer size="md">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* The numerals are decoration — the page's real h1 is the sentence below. */}
          <motion.div variants={item} aria-hidden className="relative">
            <span className="error-gradient-text font-heading text-[clamp(5rem,22vw,11rem)] leading-none font-bold tracking-tight">
              {t.code}
            </span>
            <span className="error-gradient-text absolute inset-0 -z-10 font-heading text-[clamp(5rem,22vw,11rem)] leading-none font-bold tracking-tight opacity-30 blur-3xl">
              {t.code}
            </span>
          </motion.div>

          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase backdrop-blur-sm"
          >
            <Icon name="search" size="xs" />
            {t.eyebrow}
          </motion.span>

          <motion.div variants={item}>
            <Heading as="h1" size="h2" align="center">
              {t.title}
            </Heading>
          </motion.div>

          <motion.div variants={item} className="max-w-xl">
            <Text size="base" align="center" className="leading-relaxed">
              {t.description}
            </Text>
          </motion.div>

          {/* What was actually requested — the one detail a stock 404 hides. */}
          <motion.p
            variants={item}
            className="flex max-w-full flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
          >
            <span>{t.attempted}</span>
            <code className="max-w-full truncate rounded-md border border-border bg-muted px-2 py-1 font-mono text-[0.7rem] text-foreground">
              {attempted}
            </code>
          </motion.p>

          {suggestion ? (
            <motion.div variants={item}>
              <Link
                href={localeHref(locale, `/${suggestion}`)}
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Icon name="sparkles" size="xs" />
                <span>
                  {t.suggestion} <span className="font-semibold">/{suggestion}</span>?
                </span>
                <Icon
                  name="arrowRight"
                  size="xs"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          ) : null}

          <motion.div
            variants={item}
            className="mt-2 flex flex-wrap items-center justify-center gap-3"
          >
            <Button size="lg" asChild>
              <Link href={localeHref(locale, "/")}>{t.home}</Link>
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.back()}>
              <Icon name="chevronLeft" size="xs" />
              {t.back}
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-10 w-full">
            <Text size="xs" align="center" className="tracking-widest uppercase">
              {t.linksTitle}
            </Text>

           
          </motion.div>
        </motion.div>
      </AppContainer>
    </section>
  );
}

/**
 * Two slow-drifting brand blobs behind the content. Decorative only, and held
 * still when the visitor has asked for reduced motion.
 */
function Backdrop({ animated }: { animated: boolean }) {
  const blob = "absolute rounded-full blur-3xl";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.span
        className={cn(blob, "top-0 left-1/2 size-[28rem] -translate-x-1/2 bg-primary/10")}
        animate={animated ? { y: [0, 30, 0], scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={cn(blob, "right-[10%] bottom-0 size-[22rem] bg-secondary/40")}
        animate={animated ? { y: [0, -26, 0], scale: [1, 1.12, 1] } : undefined}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}
