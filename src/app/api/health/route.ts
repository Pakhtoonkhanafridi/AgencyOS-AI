export function GET() {
  return Response.json({
    service: "agencyos-ai",
    status: "ok",
    buildDate: "2026-06-16",
    currentMilestone: "tenant-access-foundation",
  });
}
