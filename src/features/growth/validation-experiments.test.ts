import { describe, expect, it } from "vitest";
import {
  getValidationExperiments,
  getValidationSummary,
  type ValidationExperiment,
} from "./validation-experiments";

describe("validation experiments", () => {
  it("defines market experiments with clear hypotheses and next actions", () => {
    for (const experiment of getValidationExperiments()) {
      expect(experiment.hypothesis.length).toBeGreaterThan(40);
      expect(experiment.successMetric.length).toBeGreaterThan(20);
      expect(experiment.nextAction.length).toBeGreaterThan(20);
    }
  });

  it("summarizes validation status for dashboard reporting", () => {
    const experiments: ValidationExperiment[] = [
      {
        id: "one",
        title: "One",
        persona: "Owner",
        hypothesis: "A focused workflow solves repeated owner pain.",
        channel: "Interview",
        status: "running",
        successMetric: "One measurable signal",
        evidence: "Early evidence",
        nextAction: "Continue the running experiment",
      },
      {
        id: "two",
        title: "Two",
        persona: "Agent",
        hypothesis: "Agents need faster client context before calls.",
        channel: "Prototype",
        status: "needs-iteration",
        successMetric: "One measurable signal",
        evidence: "Mixed evidence",
        nextAction: "Revise the workflow",
      },
    ];

    const summary = getValidationSummary(experiments);

    expect(summary).toMatchObject({
      total: 2,
      running: 1,
      needsIteration: 1,
      nextFocus: experiments[0],
    });
  });

  it("prioritizes an active experiment as the next market focus", () => {
    expect(getValidationSummary().nextFocus.status).toBe("running");
    expect(getValidationSummary().nextFocus.persona).toBe("Agency owner");
  });
});
