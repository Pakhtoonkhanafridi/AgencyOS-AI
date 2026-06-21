export type ProjectSignalCategory = "recruiter" | "developer" | "market";

export type ProjectSignal = {
  category: ProjectSignalCategory;
  label: string;
  headline: string;
  evidence: string;
  nextStep: string;
};

export const projectSignals: ProjectSignal[] = [
  {
    category: "recruiter",
    label: "Recruiter signal",
    headline: "Production SaaS habits are visible in the repo.",
    evidence: "The project includes CI, typed feature services, tests, security docs, PRD, architecture, and roadmap artifacts.",
    nextStep: "Add deployed demo screenshots and a short product walkthrough video.",
  },
  {
    category: "developer",
    label: "Developer signal",
    headline: "Business logic is separated from route handlers.",
    evidence: "AI summaries, proof previews, health checks, KPI math, rate limits, and pipeline summaries live in testable modules.",
    nextStep: "Implement Supabase auth, tenant authorization helpers, and RLS-backed CRUD flows.",
  },
  {
    category: "market",
    label: "Market signal",
    headline: "The wedge is small service agencies that outgrow spreadsheets.",
    evidence: "The roadmap focuses on CRM, tasks, billing, AI assistance, and audit proofs for travel, tax, real estate, and consulting teams.",
    nextStep: "Interview five agencies and convert findings into one vertical MVP workflow.",
  },
];

export function getProjectSignals() {
  return projectSignals;
}

export function getProjectSignal(category: ProjectSignalCategory) {
  return projectSignals.find((signal) => signal.category === category);
}
