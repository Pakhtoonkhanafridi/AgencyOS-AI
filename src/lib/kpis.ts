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
    deals.reduce((total, deal) => total + deal.value * (deal.probability / 100), 0),
  );
}

export function calculateAgencyHealth({
  overdueTasks,
  activeClients,
  monthlyRevenue,
  churnRiskClients,
}: AgencyHealthInput) {
  const revenueScore = Math.min(monthlyRevenue / 250, 35);
  const clientScore = Math.min(activeClients * 1.2, 30);
  const taskPenalty = Math.min(overdueTasks * 3, 20);
  const churnPenalty = Math.min(churnRiskClients * 5, 25);

  return Math.max(0, Math.min(100, Math.round(45 + revenueScore + clientScore - taskPenalty - churnPenalty)));
}
