import { describe, expect, it } from "vitest";
import { createProofPreview, proofPreviewSchema } from "./proof-preview";

const proofInput = {
  recordType: "document",
  organizationId: "7f7e6157-cae6-42d6-9e0a-c656e7a3c6bb",
  recordId: "doc-001",
  contentDigest: "sha256:client-document-digest",
} as const;

describe("proof preview service", () => {
  it("generates deterministic proof hashes from canonical payloads", () => {
    const reorderedProofInput = {
      contentDigest: proofInput.contentDigest,
      recordId: proofInput.recordId,
      organizationId: proofInput.organizationId,
      recordType: proofInput.recordType,
    };

    const firstPreview = createProofPreview(proofInput);
    const secondPreview = createProofPreview(reorderedProofInput);

    expect(firstPreview.proofHash).toHaveLength(64);
    expect(firstPreview.proofHash).toBe(secondPreview.proofHash);
    expect(firstPreview.canonicalPayload).toBe(secondPreview.canonicalPayload);
  });

  it("rejects proof payloads that are unsafe for public audit metadata", () => {
    const parsed = proofPreviewSchema.safeParse({
      ...proofInput,
      organizationId: "not-a-uuid",
    });

    expect(parsed.success).toBe(false);
  });
});
