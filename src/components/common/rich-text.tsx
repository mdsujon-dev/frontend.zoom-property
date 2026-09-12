import { cn } from "@/lib/utils";

/**
 * A passage written in the panel's editor.
 *
 * This is the one place the site sets HTML directly, so the trust boundary is
 * worth stating: the markup comes from the admin panel, behind authentication
 * and a permission check — never from a visitor, a form, or a query string.
 * The day any of this becomes reader-supplied it has to be sanitised first.
 *
 * The typography is set here rather than by a prose plugin, so an editor
 * passage and a hand-written paragraph on the same page look like the same
 * site. Measure is capped: beyond roughly seventy characters the eye loses the
 * start of the next line, which is what makes a long passage feel like work.
 */
export function RichText({
  html,
  className,
}: {
  html?: string | null;
  className?: string;
}) {
  if (!html || !html.trim()) return null;

  return (
    <div
      className={cn(
        "text-editor max-w-[68ch] text-sm leading-relaxed text-muted-foreground",
        "[&_p]:mb-4 [&_p:last-child]:mb-0",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
        "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:mb-1.5",
        "[&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground",
        "[&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default RichText;
