"use client";

import { useState } from "react";
import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";

interface BlogNewsletterProps {
  newsletter: {
    badge: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
    note: string;
  };
}

export function BlogNewsletter({ newsletter }: BlogNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-border/80 bg-muted/40 p-8 sm:p-12 text-center lg:text-left">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="flex flex-col gap-2.5 lg:col-span-7">
          <span className="inline-flex items-center justify-center lg:justify-start gap-2 font-heading text-xs font-bold uppercase tracking-widest text-primary">
            <Icon name="mail" size="xs" />
            {newsletter.badge}
          </span>

          <h3 className="font-heading text-2xl sm:text-3xl font-black text-foreground">
            {newsletter.title}
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            {newsletter.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:col-span-5">
          {status === "success" ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary dark:text-brand-green-light">
              <p className="text-sm font-semibold">✓ {newsletter.note}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletter.placeholder}
                className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" size="lg" className="shrink-0 font-semibold">
                {newsletter.button}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground/80">
            {newsletter.note}
          </p>
        </div>
      </div>
    </div>
  );
}
