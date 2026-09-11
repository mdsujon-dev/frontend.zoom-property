import Script from "next/script";

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
    <Script
      type="application/ld+json"
      id={`json-ld-${String(schema["@type"] || "schema")}`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
