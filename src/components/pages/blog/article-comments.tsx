"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Heading } from "@/components/common/heading";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/dictionaries";

type Dict = Dictionary["blog"]["article"]["comments"];

/**
 * Comment form.
 *
 * Deliberately posts nothing and lists nothing. There is no moderation backend,
 * and rendering fabricated comments under a real byline would be dishonest — so
 * the form confirms receipt and says a moderator reviews it, which is what a
 * real one would do.
 */
import { submitBlogComment } from "@/server/features/blog-comments/action";

export function ArticleComments({
  dict,
  articleTitle,
  postId,
}: {
  dict: Dict;
  articleTitle: string;
  postId: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Add postId
    formData.append("postId", postId);

    const res = await submitBlogComment(formData);

    if (res.success) {
      toast.success(dict.successTitle, { description: dict.successBody });
      form.reset();
    } else {
      toast.error(res.error || "Failed to submit comment");
    }

    setSubmitting(false);
  }

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <Heading as="h2" size="h5">
          {dict.title}
        </Heading>
        <Text size="sm" className="leading-relaxed">
          {dict.subtitle}
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="hidden" name="article" value={articleTitle} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="comment-name">{dict.name}</Label>
            <Input
              id="comment-name"
              name="name"
              required
              autoComplete="name"
              placeholder={dict.namePlaceholder}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="comment-email">{dict.email}</Label>
            <Input
              id="comment-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@domain.com"
              aria-describedby="comment-email-note"
            />
            <span id="comment-email-note" className="text-xs text-muted-foreground">
              {dict.emailNote}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="comment-body">{dict.comment}</Label>
          <Textarea
            id="comment-body"
            name="comment"
            required
            rows={5}
            placeholder={dict.commentPlaceholder}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-fit sm:px-8"
        >
          {submitting ? dict.submitting : dict.submit}
        </Button>
      </form>
    </section>
  );
}
