import { describe, expect, it } from "vitest";
import {
  ClientSummaryProviderError,
  buildLocalClientSummary,
  generateClientSummary,
  type ClientSummaryRequest,
} from "./client-summary";

const request: ClientSummaryRequest = {
  clientName: "Pak Travels",
  businessType: "travel agency",
  recentActivity: ["Uploaded passport scans", "Asked for invoice extension"],
  openDeals: [
    {
      name: "Canada visa package",
      value: 2400,
      stage: "proposal",
    },
    {
      name: "Umrah group booking",
      value: 18000,
      stage: "negotiation",
    },
  ],
};

describe("client summary service", () => {
  it("builds a deterministic local summary when AI credentials are not configured", async () => {
    const summary = buildLocalClientSummary(request);

    expect(summary.summary).toContain("Pak Travels");
    expect(summary.summary).toContain("Umrah group booking");
    expect(summary.risks).toEqual(["AI provider is not configured"]);
    expect(summary.nextActions).toContain("Configure server-side OpenAI credentials");
  });

  it("sends structured output instructions to the provider and validates the response", async () => {
    let providerBody: unknown;

    const fetcher = async (_input: string | URL, init?: RequestInit) => {
      providerBody = JSON.parse(String(init?.body));

      return new Response(
        JSON.stringify({
          output_text: JSON.stringify({
            summary: "Client is ready for follow-up.",
            risks: ["Invoice delay"],
            nextActions: ["Send payment reminder"],
          }),
        }),
        { status: 200 },
      );
    };

    const summary = await generateClientSummary(request, {
      apiKey: "test-key",
      model: "test-model",
      fetcher,
    });

    expect(providerBody).toMatchObject({
      model: "test-model",
      text: {
        format: {
          type: "json_schema",
          strict: true,
        },
      },
    });
    expect(summary.nextActions).toEqual(["Send payment reminder"]);
  });

  it("throws a sanitized provider error when the provider response is not usable", async () => {
    const fetcher = async () =>
      new Response(
        JSON.stringify({
          output_text: JSON.stringify({ summary: "", risks: [], nextActions: [] }),
        }),
        { status: 200 },
      );

    await expect(
      generateClientSummary(request, {
        apiKey: "test-key",
        fetcher,
      }),
    ).rejects.toBeInstanceOf(ClientSummaryProviderError);
  });
});
