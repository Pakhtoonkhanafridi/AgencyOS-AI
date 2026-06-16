import { describe, expect, it } from "vitest";
import { canAccess, getAllowedPermissions } from "./access-control";

describe("access control", () => {
  it("allows owners to manage billing and workspace settings", () => {
    expect(canAccess("owner", "workspace.manage")).toBe(true);
    expect(canAccess("owner", "billing.manage")).toBe(true);
  });

  it("prevents agents from managing billing", () => {
    expect(canAccess("agent", "billing.manage")).toBe(false);
  });

  it("allows agents to work with CRM and AI actions", () => {
    expect(canAccess("agent", "crm.write")).toBe(true);
    expect(canAccess("agent", "ai.generate")).toBe(true);
  });

  it("keeps viewers read-only", () => {
    expect(getAllowedPermissions("viewer")).toEqual(["workspace.read", "crm.read"]);
  });
});
