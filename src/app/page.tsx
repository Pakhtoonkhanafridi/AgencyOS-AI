import {
  Activity,
  BadgeCheck,
  Bot,
  ChartNoAxesCombined,
  CircleDollarSign,
  FileCheck2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PipelineBoard } from "@/components/dashboard/pipeline-board";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleDeals } from "@/features/crm/sample-data";
import { calculateAgencyHealth, calculateWeightedPipeline } from "@/lib/kpis";

export default function Home() {
  const weightedPipeline = calculateWeightedPipeline(sampleDeals);
  const health = calculateAgencyHealth({
    overdueTasks: 3,
    activeClients: 42,
    monthlyRevenue: 18400,
    churnRiskClients: 2,
  });

  return (
    <main className="dashboard-grid">
      <Sidebar />
      <section className="min-w-0 px-5 py-5 md:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              Agency command center
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 md:text-4xl">
              AgencyOS AI
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              A production SaaS workspace for agencies to manage clients, revenue,
              tasks, AI summaries, and blockchain-backed audit proofs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>
              <Sparkles size={16} aria-hidden />
              Run AI summary
            </Button>
            <Button variant="secondary">
              <FileCheck2 size={16} aria-hidden />
              Create proof
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={ChartNoAxesCombined}
            label="Weighted pipeline"
            value={`$${weightedPipeline.toLocaleString()}`}
            trend="+18% this month"
          />
          <MetricCard
            icon={CircleDollarSign}
            label="Monthly revenue"
            value="$18.4k"
            trend="3 invoices pending"
          />
          <MetricCard icon={Activity} label="Agency health" value={`${health}/100`} trend="Good" />
          <MetricCard icon={ShieldCheck} label="Proof records" value="24" trend="Preview mode" />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
          <PipelineBoard deals={sampleDeals} />

          <div className="space-y-5">
            <Card>
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-teal-100 p-2 text-teal-800">
                  <Bot size={20} aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">AI client brief</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Pak Travels has two active visa cases, one delayed invoice, and
                    one high-value Umrah package opportunity. Recommended next action:
                    send a concise payment reminder and schedule document review.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-amber-100 p-2 text-amber-800">
                  <BadgeCheck size={20} aria-hidden />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Senior proof signals</h2>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>Multi-tenant SaaS architecture documented from day one.</li>
                    <li>AI routes are server-side, validated, and testable.</li>
                    <li>Blockchain stores only privacy-safe proof hashes.</li>
                    <li>CI, tests, docs, and security files are part of the first commit.</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
