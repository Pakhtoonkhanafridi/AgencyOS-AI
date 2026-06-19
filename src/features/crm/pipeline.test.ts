import { describe, expect, it } from "vitest";
import type { Deal } from "../../lib/kpis";
import { getPipelineStageSummaries } from "./pipeline";

const deals: Deal[] = [
  {
    id: "lead-1",
    name: "Visa package",
    clientName: "Pak Travels",
    stage: "lead",
    value: 1000,
    probability: 25,
  },
  {
    id: "proposal-1",
    name: "Tax bundle",
    clientName: "H&M Services",
    stage: "proposal",
    value: 2000,
    probability: 50,
  },
];

describe("pipeline summaries", () => {
  it("groups deals by stage and calculates totals once", () => {
    const summaries = getPipelineStageSummaries(deals);

    expect(summaries).toHaveLength(3);
    expect(summaries[0]).toMatchObject({
      stage: "lead",
      totalValue: 1000,
      weightedValue: 250,
    });
    expect(summaries[1]).toMatchObject({
      stage: "proposal",
      totalValue: 2000,
      weightedValue: 1000,
    });
    expect(summaries[2]).toMatchObject({
      stage: "won",
      totalValue: 0,
      weightedValue: 0,
    });
  });
});
