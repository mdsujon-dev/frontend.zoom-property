/**
 * Renders a structured-data block.
 *
 * A native `<script>` on purpose — JSON-LD is data, not executable code, so
 * `next/script` is the wrong tool. `JSON.stringify` does not escape markup, so
 * `<` is replaced with its unicode escape: without it, a listing description
 * containing `</script>` would break out of the tag and inject HTML.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
