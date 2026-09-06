import type bnMessages from "./bn.json";
import type enMessages from "./en.json";

/**
 * Compile-time guard: every locale file must have the same keys as English.
 *
 * Deleting a key from `bn.json`, or adding one to `en.json` without the
 * translation, fails `tsc` here rather than rendering `undefined` on the page.
 * Values are compared as `string` so the two files' literal text can differ.
 */
type Shape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly (infer U)[]
      ? readonly Shape<U>[]
      : Shape<T[K]>;
};

const _bnMatchesEn: Shape<typeof enMessages> = null as unknown as typeof bnMessages;
const _enMatchesBn: Shape<typeof bnMessages> = null as unknown as typeof enMessages;

void _bnMatchesEn;
void _enMatchesBn;
