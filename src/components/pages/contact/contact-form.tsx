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

/**
 * Budget bands, in the units people here quote — crore, not digits.
 *
 * Bands rather than a free number field: an advisor only needs to know which
 * shelf to pull from, and a typed figure invites a precision nobody has at the
 * enquiry stage. `any` is first and is the default, so the form never insists
 * on an answer someone has not worked out yet.
 */
const BUDGET_VALUES = [
  "any",
  "under1",
  "1to2",
  "2to5",
  "5to10",
  "over10",
] as const;

/** Value the area select carries when the visitor has no area in mind. */
const AREA_ANY = "any";

export interface AreaOption {
  value: string;
  label: string;
}

interface FormDict {
  name: string;
  namePlaceholder: string;
  phone: string;
  email: string;
  enquiry: string;
  area: string;
  areaAny: string;
  budget: string;
  budgetOptions: Record<(typeof BUDGET_VALUES)[number], string>;
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
 * Area and budget are asked as selects rather than left to the free-text box:
 * they are the two things an advisor needs before they can answer at all, and
 * a shortlist cannot be built from "somewhere in Dhaka, reasonable price".
 * Both default to "not decided", so neither blocks someone who only wants to
 * start a conversation.
 *
 * `areas` comes in as a prop rather than being imported here: this is a client
 * component, and the page already knows the locale, so only the id and the name
 * in the right language cross the boundary.
 *
 * No backend yet — submit shows a confirmation and clears. Wire `onSubmit` to
 * a server action when the API exists; the field names already match the shape
 * an enquiry endpoint would want.
 */
import { submitContactForm } from "@/server/features/inquiries/action";

export function ContactForm({
  dict,
  areas,
}: {
  dict: FormDict;
  areas: AreaOption[];
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await submitContactForm(formData);

    if (res.success) {
      toast.success(dict.successTitle, { description: dict.successBody });
      form.reset();
    } else {
      toast.error(res.error || "Failed to submit message");
    }

    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={dict.name} required>
          <Input id="name" name="name" required autoComplete="name" placeholder={dict.namePlaceholder} />
        </Field>

        <Field id="phone" label={dict.phone} required>
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
        {/* Not required: a phone number is what an advisor actually calls back
            on, and half the enquiries here come from people who do not use
            email. `type="email"` still checks the shape of whatever is typed. */}
        <Field id="email" label={dict.email}>
          <Input
            id="email"
            name="email"
            type="email"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="area" label={dict.area}>
          <Select name="area" defaultValue={AREA_ANY}>
            <SelectTrigger id="area" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={AREA_ANY}>{dict.areaAny}</SelectItem>
              {areas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="budget" label={dict.budget}>
          <Select name="budget" defaultValue="any">
            <SelectTrigger id="budget" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_VALUES.map((value) => (
                <SelectItem key={value} value={value}>
                  {dict.budgetOptions[value]}
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
  required,
  children,
}: {
  id: string;
  label: string;
  /** Draws the asterisk. The input still carries its own `required`. */
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          // Decorative: assistive tech reads `required` off the control itself,
          // so an announced "star" would only be noise.
          <span aria-hidden className="text-destructive">
            *
          </span>
        ) : null}
      </Label>
      {children}
    </div>
  );
}
