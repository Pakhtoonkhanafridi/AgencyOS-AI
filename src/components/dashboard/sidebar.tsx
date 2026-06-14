import { Bot, Building2, FileText, LayoutDashboard, ReceiptText, ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Clients", icon: Building2 },
  { label: "AI Assistant", icon: Bot },
  { label: "Invoices", icon: ReceiptText },
  { label: "Proofs", icon: ShieldCheck },
  { label: "Docs", icon: FileText },
];

export function Sidebar() {
  return (
    <aside className="hidden border-r border-slate-200 bg-white px-4 py-5 md:block">
      <div className="mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
          AO
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-950">AgencyOS AI</p>
        <p className="text-xs text-slate-500">Senior portfolio build</p>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ label, icon: Icon }, index) => (
          <a
            key={label}
            href="#"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              index === 0
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            <Icon size={16} aria-hidden />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
