import { z } from "zod";

const requestSchema = z.object({
  clientName: z.string().min(2),
  businessType: z.string().min(2),
  recentActivity: z.array(z.string().min(2)).min(1).max(10),
  openDeals: z.array(
    z.object({
      name: z.string().min(2),
      value: z.number().nonnegative(),
      stage: z.string().min(2),
    }),
  ),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid client summary request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        summary: `${parsed.data.clientName} has ${parsed.data.openDeals.length} active deal(s). Add OPENAI_API_KEY to enable live AI summaries.`,
        risks: ["AI provider is not configured"],
        nextActions: ["Configure server-side OpenAI credentials", "Add tenant authorization before production"],
      },
      { status: 200 },
    );
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-5.5-mini",
      input: [
        {
          role: "system",
          content:
            "You are a CRM assistant for a service agency. Return concise JSON with summary, risks, and nextActions.",
        },
        {
          role: "user",
          content: JSON.stringify(parsed.data),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "agency_client_summary",
          strict: true,
          schema: {
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
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "AI provider request failed" }, { status: 502 });
  }

  const result = await response.json();
  const text = result.output_text ?? "{}";

  return Response.json(JSON.parse(text));
}
