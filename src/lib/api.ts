import "server-only";

/**
 * The panel's API, read from the server.
 *
 * Every call here runs in a server component or a route handler, never in the
 * browser: the site is rendered on the server, so the data should be fetched
 * there too rather than shipped as a loading spinner.
 *
 * The important rule is the one at the bottom — `apiGet` returns `null` on any
 * failure instead of throwing. A property site whose API is briefly down should
 * fall back to what it already knows, not serve a 500 to a buyer. Callers pair
 * that null with their own static fallback.
 */

const BASE =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5008/api";

/** How long a page may serve cached API data before refetching, in seconds. */
export const REVALIDATE = Number(process.env.API_REVALIDATE ?? 300);

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  meta?: ApiMeta;
  data: T;
}

const qs = (params?: Record<string, string | number | boolean | undefined>) => {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    search.append(k, String(v));
  }
  const s = search.toString();
  return s ? `?${s}` : "";
};

/**
 * GET one of the public endpoints.
 *
 * Returns the envelope, or `null` when the API is unreachable, slow, or
 * answers with anything other than a success. Nothing here throws, so a
 * failing API degrades the page rather than breaking the request.
 */
export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  init?: { revalidate?: number },
): Promise<ApiEnvelope<T> | null> {
  const url = `${BASE.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}${qs(params)}`;

  try {
    const res = await fetch(url, {
      // A slow API must not hold a page open indefinitely; better to fall back.
      signal: AbortSignal.timeout(8000),
      next: { revalidate: init?.revalidate ?? REVALIDATE },
    });

    if (!res.ok) {
      console.warn(`[api] ${res.status} ${url}`);
      return null;
    }

    const json = (await res.json()) as ApiEnvelope<T>;
    return json?.success ? json : null;
  } catch (err) {
    console.warn(`[api] failed ${url}:`, (err as Error).message);
    return null;
  }
}

/** The rows of a list endpoint, or `null` if the call did not succeed. */
export async function apiList<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
  init?: { revalidate?: number },
): Promise<{ rows: T[]; meta?: ApiMeta } | null> {
  const res = await apiGet<T[]>(path, params, init);
  if (!res || !Array.isArray(res.data)) return null;
  return { rows: res.data, meta: res.meta };
}
