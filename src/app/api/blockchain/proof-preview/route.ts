import { createHash } from "node:crypto";
import { z } from "zod";

const proofSchema = z.object({
  recordType: z.enum(["client", "invoice", "document", "activity"]),
  organizationId: z.string().uuid(),
  recordId: z.string().min(6),
  contentDigest: z.string().min(12),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = proofSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid proof payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const canonicalPayload = JSON.stringify(parsed.data);
  const proofHash = createHash("sha256").update(canonicalPayload).digest("hex");

  return Response.json({
    proofHash,
    networkStatus: "preview-only",
    message: "This hash is ready for a future on-chain proof registry transaction.",
  });
}
