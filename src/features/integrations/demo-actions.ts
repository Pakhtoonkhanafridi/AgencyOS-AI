export type HealthDependency = {
  name: string;
  required: boolean;
  status: "configured" | "missing";
};

export const demoClientSummaryRequest = {
  clientName: "Pak Travels",
  businessType: "travel agency",
  recentActivity: [
    "Uploaded passport scans",
    "Asked for an invoice extension",
    "Requested an Umrah package follow-up",
  ],
  openDeals: [
    {
      name: "Canada visa package",
      value: 2400,
      stage: "lead",
    },
    {
      name: "Umrah group booking",
      value: 18000,
      stage: "proposal",
    },
  ],
};

export const demoProofPreviewRequest = {
  recordType: "document",
  organizationId: "7f7e6157-cae6-42d6-9e0a-c656e7a3c6bb",
  recordId: "doc-visa-001",
  contentDigest: "sha256:pak-travels-passport-review",
};

export function formatDependencySummary(dependencies: HealthDependency[]) {
  if (dependencies.length === 0) {
    return "No dependency checks returned.";
  }

  return dependencies
    .map((dependency) => {
      const requirement = dependency.required ? "required" : "optional";

      return `${dependency.name}: ${dependency.status} (${requirement})`;
    })
    .join(" | ");
}
