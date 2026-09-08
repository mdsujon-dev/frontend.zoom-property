import { headers } from "next/headers";

import { NotFoundView } from "@/components/pages/not-found/not-found-view";
import { getDictionaryFor } from "@/i18n/dictionaries";
import { PATHNAME_HEADER, resolveNotFound } from "@/lib/not-found";

/**
 * The 404 for `notFound()` thrown inside a matched route — an unknown service
 * id, a blog category that does not exist.
 *
 * It renders inside the locale layout, so the header, footer and fonts are
 * already there. URLs that match no route at all never reach a layout; those
 * are handled by `src/app/global-not-found.tsx`.
 *
 * The locale comes from the path the proxy stamped on `x-pathname`, not from
 * `getDictionary()`: that helper calls `notFound()` when the root param is
 * missing, which is the one thing a not-found boundary must never do.
 */
export default async function NotFound() {
  const headerList = await headers();
  const resolved = resolveNotFound(headerList.get(PATHNAME_HEADER) ?? "/");
  const dict = await getDictionaryFor(resolved.locale);

  return <NotFoundView {...resolved} t={dict.notFound} nav={dict.nav} />;
}
