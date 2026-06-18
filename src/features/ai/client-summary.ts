import { z } from "zod";

export const clientSummaryRequestSchema = z.object({
  clientName: z.string().trim().min(2),
  businessType: z.string().trim().min(2),
  recentActivity: z.array(z.string().trim().min(2)).min(1).max(10),
  openDeals: z
    .array(
      z.object({
        name: z.string().trim().min(2),
        value: z.number().finite().nonnegative(),
        stage: z.string().trim().min(2),
      }),
    )
    .max(20),
});

export const clientSummaryResponseSchema = z.object({
  summary: z.string().trim().min(1),
  risks: z.array(z.string().trim().min(1)).max(8),
  nextActions: z.array(z.string().trim().min(1)).min(1).max(8),
});

export type ClientSummaryRequest = z.infer<typeof clientSummaryRequestSchema>;
export type ClientSummaryResponse = z.infer<typeof clientSummaryResponseSchema>;

type ClientSummaryFetcher = (input: string | URL, init?: RequestInit) => Promise<Response>;

type GenerateClientSummaryOptions = {
  apiKey?: string;
  model?: string;
  fetcher?: ClientSummaryFetcher;
};

const DEFAULT_MODEL = "gpt-4.1-mini";

const structuredOutputSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    risks: {
      type: "array",
      items: { type: "string" },
    },
    nextActions: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["summary", "risks", "nextActions"],
} as const;

export class ClientSummaryProviderError extends Error {
  constructor(message = "AI provider request failed") {
    super(message);
    this.name = "ClientSummaryProviderError";
  }
}

export async function generateClientSummary(
  input: ClientSummaryRequest,
  options: GenerateClientSummaryOptions = {},
): Promise<ClientSummaryResponse> {
  const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildLocalClientSummary(input);
  }

  const fetcher = options.fetcher ?? fetch;
  const response = await fetcher("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options.model ?? process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are a CRM assistant for a service agency. Return concise JSON with summary, risks, and nextActions.",
        },
        {
          role: "user",
          content: JSON.stringify(input),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "agency_client_summary",
          strict: true,
          schema: structuredOutputSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new ClientSummaryProviderError();
  }

  return parseClientSummaryResponse(await response.json());
}

export function buildLocalClientSummary(input: ClientSummaryRequest): ClientSummaryResponse {
  const largestDeal = input.openDeals.reduce<ClientSummaryRequest["openDeals"][number] | null>(
    (current, deal) => (!current || deal.value > current.value ? deal : current),
    null,
  );
  const dealContext = largestDeal
    ? ` The highest-value opportunity is ${largestDeal.name} in ${largestDeal.stage}.`
    : "";

  return {
    summary: `${input.clientName} has ${input.openDeals.length} active deal(s) for ${input.businessType}.${dealContext}`,
    risks: ["AI provider is not configured"],
    nextActions: [
      "Configure server-side OpenAI credentials",
      "Verify tenant authorization before enabling production summaries",
    ],
  };
}

function parseClientSummaryResponse(providerPayload: unknown): ClientSummaryResponse {
  const outputText = z
    .object({
      output_text: z.string().min(1),
    })
    .passthrough()
    .safeParse(providerPayload);

  if (!outputText.success) {
    throw new ClientSummaryProviderError("AI provider returned an unreadable response");
  }

  try {
    const parsed = clientSummaryResponseSchema.safeParse(JSON.parse(outputText.data.output_text));

    if (!parsed.success) {
      throw new ClientSummaryProviderError("AI provider returned an invalid summary shape");
    }

    return parsed.data;
  } catch (error) {
    if (error instanceof ClientSummaryProviderError) {
      throw error;
    }

    throw new ClientSummaryProviderError("AI provider returned invalid JSON");
  }
}
