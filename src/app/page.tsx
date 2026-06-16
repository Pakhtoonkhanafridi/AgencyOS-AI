import { Bot, ShieldCheck, Workflow, BarChart3 } from "lucide-react";
import { canAccess, roleLabels, type Permission, type Role } from "@/lib/access-control";

const permissions: Permission[] = [
  "workspace.manage",
  "crm.write",
  "billing.manage",
  "ai.generate",
  "proof.create",
];

const roles: Role[] = ["owner", "admin", "manager", "agent", "viewer"];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", padding: "32px" }}>
      <section style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "flex-start",
            borderBottom: "1px solid var(--line)",
            paddingBottom: "24px",
          }}
        >
          <div>
            <p style={{ color: "var(--teal)", fontWeight: 700, margin: 0 }}>Day 2 build update</p>
            <h1 style={{ fontSize: "44px", lineHeight: 1.05, margin: "10px 0" }}>AgencyOS AI</h1>
            <p style={{ color: "var(--muted)", maxWidth: "760px", lineHeight: 1.7 }}>
              AI-native CRM SaaS for service agencies. Today&apos;s update adds the tenant
              access foundation recruiters expect in a serious multi-tenant product.
            </p>
          </div>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: "8px",
              background: "#ffffff",
              padding: "16px",
              minWidth: "240px",
            }}
          >
            <strong>Current milestone</strong>
            <p style={{ color: "var(--muted)", marginBottom: 0 }}>Tenant access foundation</p>
          </div>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          <Signal icon={<ShieldCheck size={22} />} title="RBAC" body="Owner, admin, manager, agent, and viewer roles." />
          <Signal icon={<Workflow size={22} />} title="SaaS-ready" body="Permission matrix designed before feature expansion." />
          <Signal icon={<Bot size={22} />} title="AI boundary" body="AI generation is modeled as an explicit permission." />
          <Signal icon={<BarChart3 size={22} />} title="Portfolio proof" body="Docs, tests, and CI make progress easy to evaluate." />
        </div>

        <section
          style={{
            marginTop: "24px",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            background: "#ffffff",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
            <h2 style={{ margin: 0 }}>Role Permission Matrix</h2>
            <p style={{ color: "var(--muted)", marginBottom: 0 }}>
              A visible engineering artifact that shows authorization thinking from the start.
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "720px" }}>
              <thead>
                <tr>
                  <th style={cellHeader}>Role</th>
                  {permissions.map((permission) => (
                    <th key={permission} style={cellHeader}>
                      {permission}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role}>
                    <td style={cellBody}>{roleLabels[role]}</td>
                    {permissions.map((permission) => (
                      <td key={permission} style={cellBody}>
                        {canAccess(role, permission) ? "Allowed" : "Blocked"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function Signal({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article style={{ border: "1px solid var(--line)", borderRadius: "8px", background: "#fff", padding: "18px" }}>
      <div style={{ color: "var(--teal)" }}>{icon}</div>
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>{title}</h2>
      <p style={{ color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{body}</p>
    </article>
  );
}

const cellHeader = {
  padding: "14px",
  textAlign: "left" as const,
  borderBottom: "1px solid var(--line)",
  fontSize: "13px",
  background: "#f8fafc",
};

const cellBody = {
  padding: "14px",
  borderBottom: "1px solid var(--line)",
  fontSize: "14px",
};
