import { createProofPreview, proofPreviewSchema } from "@/features/proofs/proof-preview";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = proofPreviewSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid proof payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const proofPreview = createProofPreview(parsed.data);

  return Response.json({
    proofHash: proofPreview.proofHash,
    networkStatus: proofPreview.networkStatus,
    message: proofPreview.message,
  });
}
