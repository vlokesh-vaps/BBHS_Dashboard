'use strict';

/**
 * Deterministic number formatter with commas to prevent React SSR hydration mismatch.
 * Server and client will always produce identical output regardless of system locale.
 */
export function formatNumber(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '0';
  const str = typeof num === 'number' ? num.toString() : num;
  const parts = str.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

