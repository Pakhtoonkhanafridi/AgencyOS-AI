import {
  ClientSummaryProviderError,
  clientSummaryRequestSchema,
  generateClientSummary,
} from "@/features/ai/client-summary";
import { errorJson, okJson, readJsonBody, validationErrorJson } from "@/lib/api/responses";
import { consumeRateLimit, getClientRateLimitKey } from "@/lib/rate-limit";

const aiSummaryRateLimit = {
  limit: 20,
  windowMs: 60_000,
};

export async function POST(request: Request) {
  const rateLimit = consumeRateLimit({
    key: getClientRateLimitKey(request, "ai:client-summary"),
    ...aiSummaryRateLimit,
  });

  if (!rateLimit.allowed) {
    return errorJson({
      code: "RATE_LIMITED",
      message: "Too many AI summary requests. Try again shortly.",
      status: 429,
      details: {
        retryAfterSeconds: rateLimit.retryAfterSeconds,
        resetAt: rateLimit.resetAt.toISOString(),
      },
      headers: {
        "Retry-After": String(rateLimit.retryAfterSeconds),
      },
    });
  }

  const payload = await readJsonBody(request);
  const parsed = clientSummaryRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return validationErrorJson(
      "Invalid client summary request",
      parsed.error.flatten(),
    );
  }

  try {
    return okJson(await generateClientSummary(parsed.data));
  } catch (error) {
    if (error instanceof ClientSummaryProviderError) {
      return errorJson({
        code: "AI_PROVIDER_ERROR",
        message: "The summary service could not complete this request.",
        status: 502,
      });
    }

    return errorJson({
      code: "INTERNAL_ERROR",
      message: "Unexpected summary service error.",
      status: 500,
    });
  }
}
