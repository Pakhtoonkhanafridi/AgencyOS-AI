import { describe, expect, it } from "vitest";
import { consumeRateLimit, getClientRateLimitKey } from "./rate-limit";

describe("rate limit helpers", () => {
  it("blocks requests after the fixed-window limit is reached", () => {
    const store = new Map();
    const options = {
      key: "ai:test-client",
      limit: 2,
      windowMs: 60_000,
      now: 1_000,
      store,
    };

    expect(consumeRateLimit(options).allowed).toBe(true);
    expect(consumeRateLimit(options).allowed).toBe(true);

    const blocked = consumeRateLimit(options);

    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("opens a new window after the previous window expires", () => {
    const store = new Map();

    consumeRateLimit({
      key: "ai:test-client",
      limit: 1,
      windowMs: 60_000,
      now: 1_000,
      store,
    });

    const result = consumeRateLimit({
      key: "ai:test-client",
      limit: 1,
      windowMs: 60_000,
      now: 61_001,
      store,
    });

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it("builds a scoped key from forwarded client headers", () => {
    const request = new Request("https://agencyos.test/api", {
      headers: {
        "x-forwarded-for": "203.0.113.10, 10.0.0.1",
      },
    });

    expect(getClientRateLimitKey(request, "ai-summary")).toBe("ai-summary:203.0.113.10");
  });
});
