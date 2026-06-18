import { createHash } from "node:crypto";
import { z } from "zod";

export const proofPreviewSchema = z.object({
  recordType: z.enum(["client", "invoice", "document", "activity"]),
  organizationId: z.string().uuid(),
  recordId: z.string().trim().min(6),
  contentDigest: z.string().trim().min(12),
});

export type ProofPreviewRequest = z.infer<typeof proofPreviewSchema>;

export type ProofPreview = {
  proofHash: string;
  canonicalPayload: string;
  networkStatus: "preview-only";
  message: string;
};

export function createProofPreview(input: ProofPreviewRequest): ProofPreview {
  const canonicalPayload = stableStringify(input);
  const proofHash = createHash("sha256").update(canonicalPayload).digest("hex");

  return {
    proofHash,
    canonicalPayload,
    networkStatus: "preview-only",
    message: "This hash is ready for a future on-chain proof registry transaction.",
  };
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const sortedEntries = Object.entries(value as Record<string, unknown>).sort(([left], [right]) =>
      left.localeCompare(right),
    );

    return `{${sortedEntries
      .map(([key, entryValue]) => `${JSON.stringify(key)}:${stableStringify(entryValue)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}
