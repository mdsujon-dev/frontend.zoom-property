import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { SmoothScrollProvider } from "./smooth-scroll-provider";
import { ThemeProvider } from "./theme-provider";

/** Single mount point for every app-wide provider. Used by the root layout. */
export function Providers({ children }: { children: ReactNode }) {
  // Light only. `forcedTheme` pins it regardless of the OS setting, so the
  // `.dark` palette is never applied and no toggle is offered.
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster position="top-center" richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}
