/**
 * Bengali digits, folded to the ASCII the rest of this file expects.
 *
 * Numbers are typed into the CMS, and the Bangla side of a bilingual panel
 * invites Bangla numerals. `parseInt` and `\d` are both ASCII-only, so without
 * this a stat entered as ৮ reads as NaN and quietly falls back to its default
 * — an edit that appears to save and then does nothing.
 */
export const toLatinDigits = (value: string) =>
  value.replace(/[\u09e6-\u09ef]/g, (d) => String(d.charCodeAt(0) - 0x09e6));

const numberFormatter = new Intl.NumberFormat("en-US");

export function formatNumber(value: number, fractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

const LAKH = 100_000;
const CRORE = 10_000_000;

/**
 * Prices the way people here actually say them.
 *
 * `৳2,75,00,000` is technically correct and unreadable at a glance; nobody
 * scanning a listing grid counts digits. Lakh/crore is how the number is spoken,
 * so that is how it is shown. Pass `exact` for a detail page where the full
 * figure matters.
 */
export function formatBdtValue(value: number, options?: { exact?: boolean }) {
  if (options?.exact) {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  }

  if (value >= CRORE) {
    return `${trimZeros(value / CRORE)} Cr`;
  }

  if (value >= LAKH) {
    return `${trimZeros(value / LAKH)} Lakh`;
  }

  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatBdt(value: number, options?: { exact?: boolean }) {
  return `৳${formatBdtValue(value, options)}`;
}

/** Monthly rent reads differently from a sale price — keep the unit attached. */
export function formatRent(value: number) {
  return `${formatBdt(value)}/mo`;
}

/** 2.50 → "2.5", 3.00 → "3" — trailing zeros are noise in a price. */
function trimZeros(value: number) {
  return Number(value.toFixed(2)).toString();
}

/** "1,840 sq ft" — area is always sq ft here, land is always katha. */
export function formatArea(sqft: number) {
  return `${numberFormatter.format(sqft)} sq ft`;
}

export function formatKatha(katha: number) {
  return `${katha} katha`;
}

export { numberFormatter };
