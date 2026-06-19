import { getHealthCheck } from "@/features/health/health-check";
import { okJson } from "@/lib/api/responses";

export function GET() {
  return okJson(getHealthCheck());
}
