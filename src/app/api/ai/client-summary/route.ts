import {
  ClientSummaryProviderError,
  clientSummaryRequestSchema,
  generateClientSummary,
} from "@/features/ai/client-summary";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = clientSummaryRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid client summary request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    return Response.json(await generateClientSummary(parsed.data));
  } catch (error) {
    if (error instanceof ClientSummaryProviderError) {
      return Response.json(
        {
          error: "AI provider request failed",
          message: "The summary service could not complete this request.",
        },
        { status: 502 },
      );
    }

    return Response.json(
      { error: "Unexpected summary service error" },
      { status: 500 },
    );
  }
}
