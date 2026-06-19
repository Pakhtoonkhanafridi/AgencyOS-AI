import { createProofPreview, proofPreviewSchema } from "@/features/proofs/proof-preview";
import { okJson, readJsonBody, validationErrorJson } from "@/lib/api/responses";

export async function POST(request: Request) {
  const payload = await readJsonBody(request);
  const parsed = proofPreviewSchema.safeParse(payload);

  if (!parsed.success) {
    return validationErrorJson("Invalid proof payload", parsed.error.flatten());
  }

  const proofPreview = createProofPreview(parsed.data);

  return okJson({
    proofHash: proofPreview.proofHash,
    networkStatus: proofPreview.networkStatus,
    message: proofPreview.message,
  });
}
