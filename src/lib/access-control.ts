export type Role = "owner" | "admin" | "manager" | "agent" | "viewer";

export type Permission =
  | "workspace.read"
  | "workspace.manage"
  | "crm.read"
  | "crm.write"
  | "billing.read"
  | "billing.manage"
  | "ai.generate"
  | "proof.read"
  | "proof.create";

export const roleLabels: Record<Role, string> = {
  owner: "Owner",
  admin: "Admin",
  manager: "Manager",
  agent: "Agent",
  viewer: "Viewer",
};

const rolePermissions: Record<Role, Permission[]> = {
  owner: [
    "workspace.read",
    "workspace.manage",
    "crm.read",
    "crm.write",
    "billing.read",
    "billing.manage",
    "ai.generate",
    "proof.read",
    "proof.create",
  ],
  admin: [
    "workspace.read",
    "workspace.manage",
    "crm.read",
    "crm.write",
    "billing.read",
    "ai.generate",
    "proof.read",
    "proof.create",
  ],
  manager: ["workspace.read", "crm.read", "crm.write", "billing.read", "ai.generate", "proof.read"],
  agent: ["workspace.read", "crm.read", "crm.write", "ai.generate"],
  viewer: ["workspace.read", "crm.read"],
};

export function canAccess(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function getAllowedPermissions(role: Role) {
  return [...rolePermissions[role]];
}
