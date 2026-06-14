export function GET() {
  return Response.json({
    service: "agencyos-ai",
    status: "ok",
    version: "0.1.0",
    checkedAt: new Date().toISOString(),
    capabilities: ["crm", "ai-summary", "proof-preview", "billing-roadmap"],
  });
}
