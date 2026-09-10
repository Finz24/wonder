import { expect, test } from "@playwright/test";

test("Visitor sees the persisted Published Project without private Draft content", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByText("פרויקט לדוגמה", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "פרויקט הדגמה שמור" })).toBeVisible();
  await expect(page.getByText("תוכן לדוגמה בלבד — לא עבודה אמיתית של הילה.")).toBeVisible();
  await expect(page.getByText("טיוטה פרטית שאסור לפרסם")).toHaveCount(0);
});
