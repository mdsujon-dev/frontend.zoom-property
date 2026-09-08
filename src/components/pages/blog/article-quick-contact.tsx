"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/dictionaries";

type Dict = Dictionary["blog"]["article"]["quickContact"];

/**
 * The sidebar enquiry form on an article.
 *
 * Same stand-in as `ContactForm` — no backend yet, so submit confirms and
 * clears. Field names already match the shape an enquiry endpoint would want,
 * so wiring a server action later is a one-function change.
 *
 * `articleTitle` rides along in a hidden field: an enquiry is far more useful
 * to the desk when it says which piece prompted it.
 */
export function ArticleQuickContact({
  dict,
  articleTitle,
}: {
  dict: Dict;
  articleTitle: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success(dict.successTitle, { description: dict.successBody });
    form.reset();
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <input type="hidden" name="article" value={articleTitle} />

      <div className="flex flex-col gap-1.5">
        <Heading as="h2" size="h6" className="flex items-center gap-2">
          <Icon name="phone" size="sm" className="text-primary" />
          {dict.title}
        </Heading>
        <Text size="xs" className="leading-relaxed">
          {dict.subtitle}
        </Text>
      </div>

      <Field id="qc-name" label={dict.name}>
        <Input
          id="qc-name"
          name="name"
          required
          autoComplete="name"
          placeholder={dict.namePlaceholder}
        />
      </Field>

      <Field id="qc-phone" label={dict.phone}>
        <Input
          id="qc-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+880 1XXX XXXXXX"
        />
      </Field>

      <Field id="qc-email" label={dict.email}>
        <Input
          id="qc-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@domain.com"
        />
      </Field>

      <Field id="qc-message" label={dict.message}>
        <Textarea
          id="qc-message"
          name="message"
          rows={4}
          placeholder={dict.messagePlaceholder}
        />
      </Field>

      <Button type="submit" size="lg" disabled={submitting} className="w-full">
        {submitting ? dict.submitting : dict.submit}
        {submitting ? null : <Icon name="arrowRight" size="xs" />}
      </Button>

      <Text size="xs" className="leading-relaxed">
        {dict.privacy}
      </Text>
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
