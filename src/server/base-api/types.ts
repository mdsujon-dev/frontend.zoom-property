import "server-only";

/** The envelope every endpoint answers with. */
export interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  meta?: ApiMeta;
  data: T;
}

/** Paging, as a list endpoint reports it. */
export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

/** Anything that can go in a query string. `undefined` is dropped. */
export type QueryParams = Record<string, string | number | boolean | undefined>;

/**
 * A populated media document.
 *
 * `url` is the absolute address; `key` is only the object's path inside the
 * storage bucket and means nothing to a browser on its own.
 */
export interface ApiMedia {
  _id?: string;
  key?: string;
  url?: string;
}
