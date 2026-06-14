import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type MetricCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
};

export function MetricCard({ icon: Icon, label, value, trend }: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
          <p className="mt-2 text-sm text-teal-700">{trend}</p>
        </div>
        <div className="rounded-md bg-slate-100 p-2 text-slate-700">
          <Icon size={20} aria-hidden />
        </div>
      </div>
    </Card>
  );
}
