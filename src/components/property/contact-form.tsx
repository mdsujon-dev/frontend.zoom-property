"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ENQUIRY_VALUES = ["buy", "rent", "sell", "landowner", "nrb"] as const;

interface FormDict {
  name: string;
  namePlaceholder: string;
  phone: string;
  email: string;
  enquiry: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  privacy: string;
  successTitle: string;
  successBody: string;
  options: Record<(typeof ENQUIRY_VALUES)[number], string>;
}

/**
 * Enquiry form.
 *
 * No backend yet — submit shows a confirmation and clears. Wire `onSubmit` to
 * a server action when the API exists; the field names already match the shape
 * an enquiry endpoint would want.
 */
export function ContactForm({ dict }: { dict: FormDict }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    // Stand-in for the request. Replace with a server action.
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success(dict.successTitle, { description: dict.successBody });
    form.reset();
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={dict.name}>
          <Input id="name" name="name" required autoComplete="name" placeholder={dict.namePlaceholder} />
        </Field>

        <Field id="phone" label={dict.phone}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+880 1XXX XXXXXX"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label={dict.email}>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@domain.com"
          />
        </Field>

        <Field id="enquiry" label={dict.enquiry}>
          <Select name="enquiry" defaultValue="buy">
            <SelectTrigger id="enquiry" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENQUIRY_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {dict.options[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field id="message" label={dict.message}>
        <Textarea
          id="message"
          name="message"
          placeholder={dict.messagePlaceholder}
        />
      </Field>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-fit sm:px-8">
        {submitting ? dict.submitting : dict.submit}
        <Icon name="arrowRight" size="xs" />
      </Button>

      <p className="text-xs text-muted-foreground">
{dict.privacy}
      </p>
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
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
