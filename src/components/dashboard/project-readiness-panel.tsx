import { BadgeCheck, Code2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getProjectSignals, type ProjectSignalCategory } from "@/features/positioning/project-signals";

const signalIcons = {
  recruiter: BadgeCheck,
  developer: Code2,
  market: TrendingUp,
} satisfies Record<ProjectSignalCategory, typeof BadgeCheck>;

export function ProjectReadinessPanel() {
  const signals = getProjectSignals();

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-950">Project readiness signals</h2>
        <p className="mt-1 text-sm text-slate-500">
          Recruiter, developer, and market proof points for today&apos;s build.
        </p>
      </div>

      <div className="space-y-4">
        {signals.map((signal) => {
          const Icon = signalIcons[signal.category];

          return (
            <section key={signal.category} className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-slate-100 p-2 text-slate-700">
                  <Icon size={18} aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-teal-700">{signal.label}</p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-950">{signal.headline}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{signal.evidence}</p>
                  <p className="mt-2 text-sm font-medium text-slate-800">{signal.nextStep}</p>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </Card>
  );
}
