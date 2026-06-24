import { describe, expect, it } from "vitest";
import { clientSummaryRequestSchema } from "../ai/client-summary";
import { proofPreviewSchema } from "../proofs/proof-preview";
import {
  demoClientSummaryRequest,
  demoProofPreviewRequest,
  formatDependencySummary,
} from "./demo-actions";

describe("dashboard demo actions", () => {
  it("keeps the AI summary demo payload valid", () => {
    expect(clientSummaryRequestSchema.safeParse(demoClientSummaryRequest).success).toBe(true);
  });

  it("keeps the proof preview demo payload valid", () => {
    expect(proofPreviewSchema.safeParse(demoProofPreviewRequest).success).toBe(true);
  });

  it("formats integration dependency status clearly", () => {
    const summary = formatDependencySummary([
      {
        name: "supabase",
        required: true,
        status: "missing",
      },
      {
        name: "openai",
        required: false,
        status: "configured",
      },
    ]);

    expect(summary).toBe("supabase: missing (required) | openai: configured (optional)");
  });
});
