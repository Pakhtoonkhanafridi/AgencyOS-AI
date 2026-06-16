import { expect, test } from "@playwright/test";

test("renders the AgencyOS AI command center", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "AgencyOS AI" })).toBeVisible();
  await expect(page.getByText("Weighted pipeline")).toBeVisible();
  await expect(page.getByText("AI client brief")).toBeVisible();
});
