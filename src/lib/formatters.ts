const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(toSafeNumber(value));
}

export function formatCompactCurrency(value: number) {
  return compactCurrencyFormatter.format(toSafeNumber(value));
}

export function formatPercent(value: number) {
  return `${Math.round(clamp(toSafeNumber(value), 0, 100))}%`;
}

function toSafeNumber(value: number) {
  return Number.isFinite(value) ? value : 0;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}
