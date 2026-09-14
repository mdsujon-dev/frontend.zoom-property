"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@/components/common/icon";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: "grid", en: "Home", bn: "হোম" },
  { href: "/properties", icon: "building", en: "Properties", bn: "প্রপার্টি" },
  { href: "/projects", icon: "construction", en: "Projects", bn: "প্রজেক্ট" },
  { href: "/areas", icon: "location", en: "Areas", bn: "এলাকা" },
  { href: "/contact", icon: "mail", en: "Contact", bn: "যোগাযোগ" },
] as const;

export function MobileBottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={locale === "bn" ? "মোবাইল নেভিগেশন" : "Mobile navigation"}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-lg lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between">
        {navItems.map((item) => {
          const href = localeHref(locale, item.href);
          const active = item.href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={item.href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className={cn("flex size-8 items-center justify-center rounded-lg transition-colors", active && "bg-primary/10")}>
                <Icon name={item.icon} size="sm" />
              </span>
              <span className="truncate">{locale === "bn" ? item.bn : item.en}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
