type DependencyStatus = "configured" | "missing";

type DependencyCheck = {
  name: string;
  required: boolean;
  status: DependencyStatus;
};

type RuntimeEnvironment = Record<string, string | undefined>;

export type HealthCheck = {
  service: "agencyos-ai";
  status: "ok" | "degraded";
  version: string;
  checkedAt: string;
  uptimeSeconds: number;
  capabilities: string[];
  dependencies: DependencyCheck[];
};

const serviceStartedAt = Date.now();
const version = "0.1.0";

export function getHealthCheck(
  environment: RuntimeEnvironment = process.env,
  now: Date = new Date(),
): HealthCheck {
  const dependencies: DependencyCheck[] = [
    {
      name: "supabase",
      required: true,
      status:
        environment.NEXT_PUBLIC_SUPABASE_URL && environment.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? "configured"
          : "missing",
    },
    {
      name: "openai",
      required: false,
      status: environment.OPENAI_API_KEY ? "configured" : "missing",
    },
    {
      name: "proof-preview",
      required: false,
      status: "configured",
    },
  ];

  return {
    service: "agencyos-ai",
    status: dependencies.some((dependency) => dependency.required && dependency.status === "missing")
      ? "degraded"
      : "ok",
    version,
    checkedAt: now.toISOString(),
    uptimeSeconds: Math.max(0, Math.floor((now.getTime() - serviceStartedAt) / 1000)),
    capabilities: ["crm", "ai-summary", "proof-preview", "billing-roadmap"],
    dependencies,
  };
}
