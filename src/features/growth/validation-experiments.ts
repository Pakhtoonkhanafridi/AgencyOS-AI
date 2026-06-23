export type ValidationExperimentStatus = "planned" | "running" | "validated" | "needs-iteration";

export type ValidationExperiment = {
  id: string;
  title: string;
  persona: string;
  hypothesis: string;
  channel: string;
  status: ValidationExperimentStatus;
  successMetric: string;
  evidence: string;
  nextAction: string;
};

export type ValidationSummary = {
  total: number;
  planned: number;
  running: number;
  validated: number;
  needsIteration: number;
  nextFocus: ValidationExperiment;
};

export const validationExperiments: ValidationExperiment[] = [
  {
    id: "agency-owner-interviews",
    title: "Interview service agency owners",
    persona: "Agency owner",
    hypothesis:
      "Owners will prioritize one command center for pipeline, overdue tasks, invoices, and AI summaries over another generic CRM.",
    channel: "Warm outreach and LinkedIn DMs",
    status: "running",
    successMetric: "5 interviews completed with 3 repeated pain points",
    evidence: "PRD and roadmap already target travel, tax, real estate, and consulting agencies.",
    nextAction: "Book two owner interviews and convert the notes into CRM workflow requirements.",
  },
  {
    id: "ai-summary-usefulness",
    title: "Validate AI summary usefulness",
    persona: "Agent / case worker",
    hypothesis:
      "Agents will trust AI summaries when they are short, structured, and grounded in recent client activity.",
    channel: "Clickable prototype and demo calls",
    status: "planned",
    successMetric: "70 percent of testers rate summaries as useful",
    evidence: "The app already has a validated server-side AI summary service and fallback behavior.",
    nextAction: "Add thumbs-up/down feedback capture for generated summaries.",
  },
  {
    id: "proof-record-demand",
    title: "Test audit proof demand",
    persona: "Compliance-minded agency owner",
    hypothesis:
      "Agencies handling sensitive documents will value proof hashes if the UX explains privacy and verification clearly.",
    channel: "Demo script and proof verification page",
    status: "planned",
    successMetric: "3 beta users can explain when they would create a proof record",
    evidence: "Proof previews are deterministic and store privacy-safe hashes only.",
    nextAction: "Build a public-safe proof verification page before adding testnet transactions.",
  },
];

export function getValidationExperiments() {
  return validationExperiments;
}

export function getValidationSummary(experiments: ValidationExperiment[] = validationExperiments): ValidationSummary {
  const summary = experiments.reduce(
    (accumulator, experiment) => {
      accumulator.total += 1;

      if (experiment.status === "needs-iteration") {
        accumulator.needsIteration += 1;
      } else {
        accumulator[experiment.status] += 1;
      }

      return accumulator;
    },
    {
      total: 0,
      planned: 0,
      running: 0,
      validated: 0,
      needsIteration: 0,
    },
  );
  const nextFocus =
    experiments.find((experiment) => experiment.status === "running") ??
    experiments.find((experiment) => experiment.status === "needs-iteration") ??
    experiments[0];

  if (!nextFocus) {
    throw new Error("At least one validation experiment is required.");
  }

  return {
    ...summary,
    nextFocus,
  };
}
