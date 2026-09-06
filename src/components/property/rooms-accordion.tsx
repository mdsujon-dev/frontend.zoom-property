"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import type { Room } from "@/data/rooms";
import { cn } from "@/lib/utils";

export interface RoomCopy {
  name: string;
  lead: string;
  description: string;
}

export interface RoomsDict {
  readMore: string;
  expand: string;
}

/**
 * Room walkthrough as an accordion.
 *
 * One row open at a time. A grid of six equal cards would show every room at
 * once and give none of them room to breathe; this keeps the whole list of
 * rooms visible — so you can see what a home contains at a glance — while
 * giving the one you picked a real photograph and the numbers.
 *
 * Rows are `<button>`s inside a list, with `aria-expanded`, so the whole thing
 * is operable from the keyboard and announced correctly. The panel is
 * height-animated, which `AnimatePresence` handles; reduced motion skips it.
 */
export function RoomsAccordion({
  rooms,
  copy,
  dict,
  contactHref,
}: {
  rooms: Room[];
  copy: RoomCopy[];
  dict: RoomsDict;
  contactHref: string;
}) {
  const [open, setOpen] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="flex flex-col gap-3">
      {rooms.map((room, index) => {
        const text = copy[index];
        const isOpen = index === open;
        const number = String(index + 1).padStart(2, "0");

        return (
          <li
            key={room.id}
            className={cn(
              "overflow-hidden rounded-xl border transition-colors duration-300",
              isOpen ? "border-primary/30 bg-card" : "border-border bg-card",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-label={`${dict.expand} ${text.name}`}
              className="flex w-full cursor-pointer items-center gap-5 p-4 text-left transition-colors hover:bg-muted/50 sm:gap-8 sm:px-6"
            >
              <span className="w-10 shrink-0 font-heading text-sm text-muted-foreground">
                ({number})
              </span>

              {/* Thumbnail strip — only on the closed rows, where it is the
                  only hint of what the room looks like. */}
              {!isOpen ? (
                <span className="relative hidden h-14 w-36 shrink-0 overflow-hidden rounded-lg sm:block">
                  <Image
                    src={room.image}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </span>
              ) : null}

              <span className="flex-1">
                <Heading as="h3" size="h5" className={cn(isOpen && "text-primary")}>
                  {text.name}
                </Heading>
              </span>

              <Icon
                name="chevronDown"
                size="sm"
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_1.2fr_minmax(0,1fr)] lg:gap-8">
                    <div className="flex flex-col justify-between gap-4 lg:pl-[3.75rem]">
                      <Text size="sm" weight="semibold" tone="default">
                        {text.lead}
                      </Text>
                      <Text as="span" size="xs" className="text-muted-foreground">
                        ({text.name})
                      </Text>
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={room.image}
                        alt={text.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <Text size="sm" className="text-muted-foreground">
                        {text.description}
                      </Text>

                      <ul className="flex flex-wrap gap-x-5 gap-y-2">
                        {room.specs.map((spec) => (
                          <li
                            key={spec.value}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <Icon name={spec.icon} size="xs" />
                            {spec.value}
                          </li>
                        ))}
                      </ul>

                      <Button size="lg" className="mt-auto w-fit" asChild>
                        <Link href={contactHref}>
                          {dict.readMore}
                          <Icon name="arrowRight" size="xs" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
