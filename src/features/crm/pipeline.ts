import type { Deal, DealStage } from "../../lib/kpis";

export const pipelineStages = ["lead", "proposal", "won"] as const satisfies DealStage[];

export type PipelineStageSummary = {
  stage: DealStage;
  deals: Deal[];
  totalValue: number;
  weightedValue: number;
};

export function getPipelineStageSummaries(deals: Deal[]): PipelineStageSummary[] {
  const groupedDeals: Record<DealStage, Deal[]> = {
    lead: [],
    proposal: [],
    won: [],
  };

  for (const deal of deals) {
    groupedDeals[deal.stage].push(deal);
  }

  return pipelineStages.map((stage) => {
    const stageDeals = groupedDeals[stage];

    return {
      stage,
      deals: stageDeals,
      totalValue: stageDeals.reduce((total, deal) => total + safeDealValue(deal.value), 0),
      weightedValue: Math.round(
        stageDeals.reduce(
          (total, deal) => total + safeDealValue(deal.value) * (safeProbability(deal.probability) / 100),
          0,
        ),
      ),
    };
  });
}

function safeDealValue(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function safeProbability(probability: number) {
  return Number.isFinite(probability) ? Math.min(100, Math.max(0, probability)) : 0;
}
