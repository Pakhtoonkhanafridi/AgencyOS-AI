import type { Deal } from "@/lib/kpis";

export const sampleDeals: Deal[] = [
  {
    id: "deal-visa-001",
    name: "Canada visa package",
    clientName: "Pak Travels",
    stage: "lead",
    value: 2400,
    probability: 35,
  },
  {
    id: "deal-tax-002",
    name: "US tax filing bundle",
    clientName: "H&M Services",
    stage: "proposal",
    value: 5200,
    probability: 65,
  },
  {
    id: "deal-umrah-003",
    name: "Umrah group booking",
    clientName: "Noor Agency",
    stage: "proposal",
    value: 18000,
    probability: 55,
  },
  {
    id: "deal-property-004",
    name: "Real estate verification",
    clientName: "Zamzam Holdings",
    stage: "won",
    value: 7600,
    probability: 100,
  },
];
