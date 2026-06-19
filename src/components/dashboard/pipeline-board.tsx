import { Card } from "@/components/ui/card";
import { getPipelineStageSummaries } from "@/features/crm/pipeline";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import type { Deal } from "@/lib/kpis";

type PipelineBoardProps = {
  deals: Deal[];
};

export function PipelineBoard({ deals }: PipelineBoardProps) {
  const stageSummaries = getPipelineStageSummaries(deals);

  return (
    <Card className="min-h-[440px]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Pipeline</h2>
          <p className="text-sm text-slate-500">Service opportunities grouped by stage.</p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {stageSummaries.map(({ stage, deals: stageDeals, totalValue }) => (
          <section key={stage} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold capitalize text-slate-700">{stage}</h3>
              <span className="text-xs font-semibold text-slate-500">
                {formatCurrency(totalValue)}
              </span>
            </div>
            <div className="space-y-3">
              {stageDeals.length > 0 ? (
                stageDeals.map((deal) => (
                  <article
                    key={deal.id}
                    className="rounded-md border border-slate-200 bg-white p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-950">{deal.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{deal.clientName}</p>
                      </div>
                      <span className="rounded-full bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-700">
                        {formatPercent(deal.probability)}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      {formatCurrency(deal.value)}
                    </p>
                  </article>
                ))
              ) : (
                <p className="rounded-md border border-dashed border-slate-200 bg-white p-3 text-sm text-slate-500">
                  No opportunities yet.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>
    </Card>
  );
}
