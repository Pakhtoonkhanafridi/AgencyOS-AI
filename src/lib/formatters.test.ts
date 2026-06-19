import { describe, expect, it } from "vitest";
import { formatCompactCurrency, formatCurrency, formatPercent } from "./formatters";

describe("formatters", () => {
  it("formats currency values consistently", () => {
    expect(formatCurrency(12345)).toBe("$12,345");
    expect(formatCompactCurrency(18400)).toBe("$18.4K");
  });

  it("guards percent display against invalid or out-of-range values", () => {
    expect(formatPercent(64.6)).toBe("65%");
    expect(formatPercent(150)).toBe("100%");
    expect(formatPercent(Number.NaN)).toBe("0%");
  });
});
