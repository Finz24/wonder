import { expect, test } from "@playwright/test";

test.describe("Themed Project editor demo", () => {
  test("presents the temporary demo with clearly labelled fixture content", async ({ page }) => {
    await page.goto("/studio/demo");

    await expect(page.locator("html")).toHaveAttribute("lang", "he");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "שולחן העריכה" })).toBeVisible();
    await expect(page.getByText("הדגמת עריכה זמנית", { exact: false })).toBeVisible();
    await expect(page.getByText("הנתונים אינם נשמרים ומתאפסים ברענון העמוד.")).toBeVisible();
    await expect(page.getByText("ללא התחברות", { exact: false }).first()).toBeVisible();

    await expect(page.getByRole("heading", { name: "הפרויקטים שלי" })).toBeVisible();
    await expect(page.getByRole("button", { name: "+ פרויקט חדש" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "פרויקט הדגמה שמור" }).first()).toBeVisible();
    await expect(page.getByText("תוכן לדוגמה", { exact: true }).first()).toBeVisible();

    await expect(page.getByLabel("שם הפרויקט")).toBeVisible();
    await expect(page.getByLabel("הסיפור שלך")).toBeVisible();
    await expect(page.getByText("שיוך להעלאת תמונות יתחבר כאן")).toBeVisible();
    await expect(page.getByRole("heading", { name: "תצוגה מקדימה זמנית" })).toBeVisible();
    await expect(page.getByText("אינה פרסום", { exact: true })).toBeVisible();
  });

  test("edits title and description with unsaved handling and explicit save feedback", async ({ page }) => {
    await page.goto("/studio/demo");

    const title = page.getByLabel("שם הפרויקט");
    const description = page.getByLabel("הסיפור שלך");
    const status = page.locator("#demo-save-status");

    await expect(status).toHaveText("הכול מוכן לעריכה");

    await title.fill("כותרת בדיקה זמנית");
    await expect(status).toHaveText("יש שינויים שטרם נשמרו");
    await expect(page.getByText("לא נשמר", { exact: true })).toBeVisible();

    await description.fill("תיאור בדיקה זמני שנכתב בהדגמה.");
    await page.getByRole("button", { name: "שמירת טיוטה (הדגמה)" }).click();
    await expect(status).toContainText("נשמר בהדגמה");
    await expect(status).toContainText("האתר הציבורי לא השתנה");
    await expect(page.getByText("לא נשמר", { exact: true })).toHaveCount(0);

    // The demo is not durable: reload restores the labelled fixture.
    await page.reload();
    await expect(page.getByRole("heading", { name: "פרויקט הדגמה שמור" }).first()).toBeVisible();
    await expect(page.locator("#demo-save-status")).toHaveText("הכול מוכן לעריכה");

    // The public Portfolio never saw the demo edits.
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "פרויקט הדגמה שמור" })).toBeVisible();
    await expect(page.getByText("כותרת בדיקה זמנית")).toHaveCount(0);
  });

  test("creates a project, saves an incomplete draft, and keeps unsaved edits across selection", async ({ page }) => {
    await page.goto("/studio/demo");

    await page.getByRole("button", { name: "+ פרויקט חדש" }).click();
    await expect(page.getByLabel("שם הפרויקט")).toBeFocused();

    // An incomplete demo Draft can be saved; nothing requires publication
    // completeness here and nothing durable happens.
    await page.getByRole("button", { name: "שמירת טיוטה (הדגמה)" }).click();
    await expect(page.locator("#demo-save-status")).toContainText("נשמר בהדגמה");

    const title = page.getByLabel("שם הפרויקט");
    await title.fill("טיוטת בדיקה חדשה");
    await page.getByLabel("הסיפור שלך").fill("כמה מילים זמניות על פרויקט חדש.");

    // Switch away and back: unsaved demo edits are preserved in memory.
    await page.getByRole("button", { name: "עריכת פרויקט הדגמה שמור" }).click();
    await expect(page.getByLabel("שם הפרויקט")).toHaveValue("פרויקט הדגמה שמור");
    await page.getByRole("button", { name: "עריכת פרויקט חדש (לא נשמר)" }).click();
    await expect(title).toHaveValue("טיוטת בדיקה חדשה");
    await expect(page.locator("#demo-save-status")).toHaveText("יש שינויים שטרם נשמרו");
  });

  test("supports a keyboard-only edit and save journey", async ({ page }) => {
    await page.goto("/studio/demo");

    const title = page.getByLabel("שם הפרויקט");
    await title.focus();
    await page.keyboard.type("כותרת מקלדת");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("הסיפור שלך")).toBeFocused();
    await page.keyboard.type("תיאור מקלדת זמני.");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "שמירת טיוטה (הדגמה)" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("#demo-save-status")).toContainText("נשמר בהדגמה");
  });

  test.describe("narrow mobile layout", () => {
    test.use({ viewport: { width: 375, height: 800 } });

    test("keeps the list and editor usable without a pointer", async ({ page }) => {
      await page.goto("/studio/demo");

      await expect(page.getByRole("button", { name: "+ פרויקט חדש" })).toBeVisible();
      await expect(page.getByLabel("שם הפרויקט")).toBeVisible();
      await page.getByLabel("שם הפרויקט").fill("כותרת ניידת");
      await page.getByRole("button", { name: "שמירת טיוטה (הדגמה)" }).click();
      await expect(page.locator("#demo-save-status")).toContainText("נשמר בהדגמה");
      await expect(page.getByRole("heading", { name: "תצוגה מקדימה זמנית" })).toBeVisible();
    });
  });
});
