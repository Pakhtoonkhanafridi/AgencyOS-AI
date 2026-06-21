import { describe, expect, it } from "vitest";
import { getProjectSignal, getProjectSignals } from "./project-signals";

describe("project positioning signals", () => {
  it("covers recruiter, developer, and market positioning", () => {
    const categories = getProjectSignals().map((signal) => signal.category);

    expect(categories).toEqual(["recruiter", "developer", "market"]);
  });

  it("keeps each positioning signal actionable", () => {
    for (const signal of getProjectSignals()) {
      expect(signal.headline.length).toBeGreaterThan(20);
      expect(signal.evidence.length).toBeGreaterThan(30);
      expect(signal.nextStep.length).toBeGreaterThan(20);
    }
  });

  it("defines a focused market wedge", () => {
    expect(getProjectSignal("market")?.headline).toContain("service agencies");
  });
});
