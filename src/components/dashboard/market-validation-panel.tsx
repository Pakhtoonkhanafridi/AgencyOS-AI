import { ClipboardCheck, MessageSquareText, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  getValidationExperiments,
  getValidationSummary,
  type ValidationExperimentStatus,
} from "@/features/growth/validation-experiments";

const statusLabels = {
  planned: "Planned",
  running: "Running",
  validated: "Validated",
  "needs-iteration": "Needs iteration",
} satisfies Record<ValidationExperimentStatus, string>;

const statusClasses = {
  planned: "bg-slate-100 text-slate-700",
  running: "bg-teal-50 text-teal-700",
  validated: "bg-emerald-50 text-emerald-700",
  "needs-iteration": "bg-amber-50 text-amber-800",
} satisfies Record<ValidationExperimentStatus, string>;

export function MarketValidationPanel() {
  const experiments = getValidationExperiments();
  const summary = getValidationSummary(experiments);

  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-teal-700">Market validation</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">Founder proof sprint</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Experiments that turn product assumptions into measurable customer evidence.
          </p>
        </div>
        <div className="rounded-md bg-slate-100 p-2 text-slate-700">
          <Target size={20} aria-hidden />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryTile icon={ClipboardCheck} label="Experiments" value={String(summary.total)} />
        <SummaryTile icon={MessageSquareText} label="Running" value={String(summary.running)} />
        <SummaryTile icon={Target} label="Validated" value={String(summary.validated)} />
      </div>

      <div className="mt-4 space-y-3">
        {experiments.map((experiment) => (
          <section key={experiment.id} className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-950">{experiment.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{experiment.persona}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClasses[experiment.status]}`}>
                {statusLabels[experiment.status]}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{experiment.hypothesis}</p>
            <p className="mt-2 text-sm font-medium text-slate-800">{experiment.nextAction}</p>
          </section>
        ))}
      </div>
    </Card>
  );
}

type SummaryTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function SummaryTile({ icon: Icon, label, value }: SummaryTileProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <Icon size={15} className="text-slate-500" aria-hidden />
      </div>
      <p className="mt-2 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}
