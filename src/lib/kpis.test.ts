import { describe, expect, it } from "vitest";
import { calculateAgencyHealth, calculateWeightedPipeline } from "./kpis";

describe("agency KPI helpers", () => {
  it("calculates weighted pipeline from deal probability", () => {
    const total = calculateWeightedPipeline([
      {
        id: "one",
        name: "Website package",
        clientName: "Acme",
        stage: "proposal",
        value: 10000,
        probability: 50,
      },
      {
        id: "two",
        name: "Tax bundle",
        clientName: "Beta",
        stage: "won",
        value: 5000,
        probability: 100,
      },
    ]);

    expect(total).toBe(10000);
  });

  it("guards weighted pipeline against invalid deal values and probabilities", () => {
    const total = calculateWeightedPipeline([
      {
        id: "one",
        name: "Oversized probability",
        clientName: "Acme",
        stage: "proposal",
        value: 10000,
        probability: 150,
      },
      {
        id: "two",
        name: "Invalid value",
        clientName: "Beta",
        stage: "lead",
        value: Number.NaN,
        probability: 50,
      },
    ]);

    expect(total).toBe(10000);
  });

  it("penalizes overdue work and churn risk", () => {
    const health = calculateAgencyHealth({
      overdueTasks: 5,
      activeClients: 20,
      monthlyRevenue: 5000,
      churnRiskClients: 4,
    });

    expect(health).toBeLessThan(85);
    expect(health).toBeGreaterThanOrEqual(0);
  });

  it("keeps health score bounded for invalid input", () => {
    const health = calculateAgencyHealth({
      overdueTasks: Number.NaN,
      activeClients: -20,
      monthlyRevenue: Number.POSITIVE_INFINITY,
      churnRiskClients: 50,
    });

    expect(health).toBe(20);
  });
});
