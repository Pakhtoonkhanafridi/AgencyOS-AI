export type DealStage = "lead" | "proposal" | "won";

export type Deal = {
  id: string;
  name: string;
  clientName: string;
  stage: DealStage;
  value: number;
  probability: number;
};

type AgencyHealthInput = {
  overdueTasks: number;
  activeClients: number;
  monthlyRevenue: number;
  churnRiskClients: number;
};

export function calculateWeightedPipeline(deals: Deal[]) {
  return Math.round(
    deals.reduce(
      (total, deal) => total + safePositiveNumber(deal.value) * (clamp(deal.probability, 0, 100) / 100),
      0,
    ),
  );
}

export function calculateAgencyHealth({
  overdueTasks,
  activeClients,
  monthlyRevenue,
  churnRiskClients,
}: AgencyHealthInput) {
  const revenueScore = Math.min(safePositiveNumber(monthlyRevenue) / 250, 35);
  const clientScore = Math.min(safePositiveNumber(activeClients) * 1.2, 30);
  const taskPenalty = Math.min(safePositiveNumber(overdueTasks) * 3, 20);
  const churnPenalty = Math.min(safePositiveNumber(churnRiskClients) * 5, 25);

  return clamp(Math.round(45 + revenueScore + clientScore - taskPenalty - churnPenalty), 0, 100);
}

function safePositiveNumber(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}
