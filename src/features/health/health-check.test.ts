import { describe, expect, it } from "vitest";
import { getHealthCheck } from "./health-check";

describe("health check service", () => {
  it("reports degraded status when required dependencies are missing", () => {
    const health = getHealthCheck({}, new Date("2026-06-19T12:00:00.000Z"));

    expect(health.status).toBe("degraded");
    expect(health.dependencies).toContainEqual({
      name: "supabase",
      required: true,
      status: "missing",
    });
  });

  it("reports ok status when required dependencies are configured", () => {
    const health = getHealthCheck(
      {
        NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      },
      new Date("2026-06-19T12:00:00.000Z"),
    );

    expect(health.status).toBe("ok");
    expect(health.checkedAt).toBe("2026-06-19T12:00:00.000Z");
    expect(health.dependencies).toContainEqual({
      name: "openai",
      required: false,
      status: "missing",
    });
  });
});
