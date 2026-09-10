import { expect, test } from "@playwright/test";

const CHAPTER_ANCHOR = "#chapter-sample-paper-blossoms";

test("Visitor starts at a closed scroll showing Wonder, By Hila, and the wax seal", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByText("Wonder · By Hila", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "תיק העבודות של הילה" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "חותם שעווה עם המונוגרמה W H O" }).first(),
  ).toBeVisible();
});

test("Native scrolling opens the paper and closes toward clearly labelled contact", async ({
  page,
}) => {
  await page.goto("/");

  const chapter = page.locator(CHAPTER_ANCHOR);
  await chapter.scrollIntoViewIfNeeded();
  await expect(chapter).toBeVisible();
  await expect(chapter).toHaveAttribute("data-chapter", "sample-paper-blossoms");
  await expect(page.getByText("פרויקט לדוגמה", { exact: true })).toBeVisible();

  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  await expect(contact).toBeVisible();
  await expect(
    page.getByText("הדגמה בלבד — פרטי הקשר של הילה עדיין לא הוגדרו."),
  ).toBeVisible();
});

test("Chapter direct link lands at its chapter without replaying the journey", async ({
  page,
}) => {
  await page.goto(`/${CHAPTER_ANCHOR}`);

  const chapter = page.locator(CHAPTER_ANCHOR);
  await expect(chapter).toBeVisible();
  await expect(page.getByRole("heading", { name: "פרויקט הדגמה שמור" })).toBeVisible();
});

test("Without JavaScript the same content stays readable and fragment links work", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(`/${CHAPTER_ANCHOR}`);

    await expect(page.getByRole("heading", { name: "תיק העבודות של הילה" })).toBeVisible();
    await expect(page.locator(CHAPTER_ANCHOR)).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await expect(
      page.getByText("הדגמה בלבד — פרטי הקשר של הילה עדיין לא הוגדרו."),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("Reduced motion keeps a readable static open scroll", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "תיק העבודות של הילה" })).toBeVisible();
  await expect(page.locator(CHAPTER_ANCHOR)).toBeVisible();
  await expect(page.locator("#contact")).toBeVisible();
  await expect(page.getByRole("button", { name: "הפעלת תנועה" })).toBeVisible();
});

test("Narrow mobile viewport keeps the scroll readable without sideways overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "תיק העבודות של הילה" })).toBeVisible();
  const chapter = page.locator(CHAPTER_ANCHOR);
  await chapter.scrollIntoViewIfNeeded();
  await expect(chapter).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - 1 <= window.innerWidth);
  expect(overflow).toBe(true);
});

test("Motion toggle switches between animated and static presentations", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "הפחתת תנועה" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.getByRole("button", { name: "הפעלת תנועה" })).toBeVisible();
  await expect(page.locator(CHAPTER_ANCHOR)).toBeVisible();
});
