"use client";

import { Activity, FileCheck2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  demoClientSummaryRequest,
  demoProofPreviewRequest,
  formatDependencySummary,
  type HealthDependency,
} from "@/features/integrations/demo-actions";

type ActionStatus = "idle" | "loading" | "success" | "error";
type ActionName = "ai" | "proof" | "health";

type ActionResult = {
  status: ActionStatus;
  title: string;
  message: string;
};

type ClientSummaryResponse = {
  summary?: string;
  risks?: string[];
  nextActions?: string[];
};

type ProofPreviewResponse = {
  proofHash?: string;
  networkStatus?: string;
  message?: string;
};

type HealthResponse = {
  status?: string;
  dependencies?: HealthDependency[];
};

export function DashboardActions() {
  const [loadingAction, setLoadingAction] = useState<ActionName | null>(null);
  const [result, setResult] = useState<ActionResult>({
    status: "idle",
    title: "API actions ready",
    message: "Run a summary, create a proof preview, or check integration status.",
  });

  async function runAction(action: ActionName) {
    setLoadingAction(action);

    try {
      if (action === "ai") {
        const payload = await requestJson<ClientSummaryResponse>("/api/ai/client-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(demoClientSummaryRequest),
        });

        setResult({
          status: "success",
          title: "AI summary route responded",
          message: payload.summary ?? "Summary generated successfully.",
        });
      }

      if (action === "proof") {
        const payload = await requestJson<ProofPreviewResponse>("/api/blockchain/proof-preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(demoProofPreviewRequest),
        });
        const proofHash = payload.proofHash ? `${payload.proofHash.slice(0, 16)}...` : "hash generated";

        setResult({
          status: "success",
          title: "Proof preview route responded",
          message: `${proofHash} (${payload.networkStatus ?? "preview-only"})`,
        });
      }

      if (action === "health") {
        const payload = await requestJson<HealthResponse>("/api/health", {
          method: "GET",
          cache: "no-store",
        });

        setResult({
          status: payload.status === "ok" ? "success" : "error",
          title: `Integration health: ${payload.status ?? "unknown"}`,
          message: formatDependencySummary(payload.dependencies ?? []),
        });
      }
    } catch (error) {
      setResult({
        status: "error",
        title: "Action failed",
        message: error instanceof Error ? error.message : "Unexpected API error.",
      });
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-end">
      <div className="flex flex-wrap gap-2">
        <Button disabled={loadingAction !== null} onClick={() => runAction("ai")}>
          <Sparkles size={16} aria-hidden />
          {loadingAction === "ai" ? "Running..." : "Run AI summary"}
        </Button>
        <Button disabled={loadingAction !== null} onClick={() => runAction("proof")} variant="secondary">
          <FileCheck2 size={16} aria-hidden />
          {loadingAction === "proof" ? "Creating..." : "Create proof"}
        </Button>
        <Button disabled={loadingAction !== null} onClick={() => runAction("health")} variant="secondary">
          <Activity size={16} aria-hidden />
          {loadingAction === "health" ? "Checking..." : "Check APIs"}
        </Button>
      </div>

      <div
        className={`max-w-xl rounded-md border px-3 py-2 text-sm ${
          result.status === "error"
            ? "border-amber-200 bg-amber-50 text-amber-900"
            : "border-slate-200 bg-white text-slate-700"
        }`}
        role="status"
      >
        <p className="font-semibold text-slate-950">{result.title}</p>
        <p className="mt-1 leading-5">{result.message}</p>
      </div>
    </div>
  );
}

async function requestJson<TResponse>(input: RequestInfo | URL, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(input, init);
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getApiErrorMessage(payload, response.status));
  }

  return payload as TResponse;
}

function getApiErrorMessage(payload: unknown, status: number) {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    payload.error &&
    typeof payload.error === "object" &&
    "message" in payload.error &&
    typeof payload.error.message === "string"
  ) {
    return payload.error.message;
  }

  return `Request failed with status ${status}.`;
}
