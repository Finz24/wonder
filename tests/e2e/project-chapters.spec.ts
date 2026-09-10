import { expect, test } from "@playwright/test";
import Database from "better-sqlite3";
import { resolve } from "node:path";

import { E2E_DATABASE_URL } from "../test-environment";

const SAMPLE_TITLE = "פרויקט הדגמה שמור";
const ALBUM_TITLE = "פרויקט אלבום לבדיקה";
const ALBUM_SLUG = "fixture-album-second";
const SINGLE_TITLE = "פרויקט יחיד לבדיקה";
const SINGLE_SLUG = "fixture-single-third";
const DRAFT_ONLY_TITLE = "טיוטה פרטית נוספת שאסור לפרסם";

const databasePath = resolve(E2E_DATABASE_URL.slice("file:".length));

type FixtureMedia = {
  id: string;
  url: string;
  alternativeText: string;
  caption: string | null;
};

function mediaItem(id: string, alternativeText: string, caption: string | null = null): FixtureMedia {
  return { id, url: "/fixtures/sample-paper-blossoms.svg", alternativeText, caption };
}

function withDatabase(work: (sqlite: Database.Database) => void) {
  const sqlite = new Database(databasePath);
  try {
    work(sqlite);
  } finally {
    sqlite.close();
  }
}

function resetProjectFixture(id: string) {
  withDatabase((sqlite) => {
    sqlite.prepare("DELETE FROM published_projects WHERE project_id = ?").run(id);
    sqlite.prepare("DELETE FROM project_drafts WHERE project_id = ?").run(id);
    sqlite.prepare("DELETE FROM projects WHERE id = ?").run(id);
  });
}

function insertPublishedProject(values: {
  id: string;
  slug: string;
  title: string;
  description: string;
  media: FixtureMedia[];
  coverMediaId: string;
  portfolioPosition: number;
}) {
  resetProjectFixture(values.id);
  withDatabase((sqlite) => {
    sqlite.prepare("INSERT INTO projects (id, slug) VALUES (?, ?)").run(values.id, values.slug);
    sqlite
      .prepare(
        "INSERT INTO published_projects (project_id, title, description, media, cover_media_id, published_at, portfolio_position) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .run(
        values.id,
        values.title,
        values.description,
        JSON.stringify(values.media),
        values.coverMediaId,
        Date.now(),
        values.portfolioPosition,
      );
  });
}

test.beforeAll(() => {
  insertPublishedProject({
    id: "project_fixture_album_second",
    slug: ALBUM_SLUG,
    title: ALBUM_TITLE,
    description: "יצרתי אלבום לבדיקה בשתי תמונות, בקול נשי בגוף ראשון.",
    media: [
      mediaItem("media_fixture_album_cover", "תמונת שער לאלבום הבדיקה", "כיתוב השער של אלבום הבדיקה"),
      mediaItem("media_fixture_album_detail", "תמונת פרט מתוך אלבום הבדיקה"),
    ],
    coverMediaId: "media_fixture_album_cover",
    portfolioPosition: 1,
  });
  insertPublishedProject({
    id: "project_fixture_single_third",
    slug: SINGLE_SLUG,
    title: SINGLE_TITLE,
    description: "יצרתי פרויקט יחיד לבדיקה, בקול נשי בגוף ראשון.",
    media: [mediaItem("media_fixture_single_cover", "תמונת שער לפרויקט היחיד")],
    coverMediaId: "media_fixture_single_cover",
    portfolioPosition: 2,
  });
  withDatabase((sqlite) => {
    resetProjectFixture("project_fixture_draft_only");
    sqlite
      .prepare("INSERT INTO projects (id, slug) VALUES (?, ?)")
      .run("project_fixture_draft_only", "fixture-draft-only");
    sqlite
      .prepare(
        "INSERT INTO project_drafts (project_id, title, description, media, cover_media_id, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      )
      .run(
        "project_fixture_draft_only",
        DRAFT_ONLY_TITLE,
        "טיוטה פרטית שאינה מפורסמת.",
        JSON.stringify([mediaItem("media_fixture_draft_only", "טיוטה פרטית")]),
        "media_fixture_draft_only",
        Date.now(),
      );
  });
});

test("renders every Published Project as a chapter in curated order", async ({ page }) => {
  await page.goto("/");

  const headings = await page.getByRole("heading", { level: 2 }).allTextContents();
  expect(headings.map((text) => text.trim())).toEqual([SAMPLE_TITLE, ALBUM_TITLE, SINGLE_TITLE]);

  await expect(page.locator("[data-portfolio-chapters] article[data-chapter='project']")).toHaveCount(3);
});

test("each chapter carries a stable slug anchor for direct links", async ({ page }) => {
  await page.goto("/");

  for (const slug of ["sample-paper-blossoms", ALBUM_SLUG, SINGLE_SLUG]) {
    const chapter = page.locator(`article#${slug}[data-chapter='project']`);
    await expect(chapter).toBeVisible();
    const labelledBy = await chapter.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    await expect(chapter.locator(`#${labelledBy}`)).toHaveRole("heading");
  }

  await page.goto(`/#${ALBUM_SLUG}`);
  await expect(page.locator(`article#${ALBUM_SLUG}`)).toBeVisible();
  await expect(page.getByRole("heading", { name: ALBUM_TITLE })).toBeVisible();
});

test("a single-photo chapter is complete without gallery controls", async ({ page }) => {
  await page.goto("/");

  const chapter = page.locator(`article#${SINGLE_SLUG}`);
  await expect(chapter.getByRole("img", { name: "תמונת שער לפרויקט היחיד" })).toBeVisible();
  await expect(chapter.locator("button, [role='tablist'], [role='listbox'], input")).toHaveCount(0);
});

test("an album chapter shows its cover and exposes its photo count for selection", async ({
  page,
}) => {
  await page.goto("/");

  const chapter = page.locator(`article#${ALBUM_SLUG}`);
  // Selectable thumbnails arrive with issue #6; this chapter owns the cover,
  // caption, alternative text, and the media-count hook that work plugs into.
  await expect(chapter).toHaveAttribute("data-media-count", "2");
  await expect(
    chapter.getByRole("img", { name: "תמונת שער לאלבום הבדיקה" }),
  ).toBeVisible();
  await expect(chapter.getByText("כיתוב השער של אלבום הבדיקה")).toBeVisible();
  await expect(chapter.locator("figure img")).toHaveCount(1);
  await expect(chapter.locator("[role='tablist'], [role='listbox']")).toHaveCount(0);
});

test("never renders private Draft-only Projects", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(DRAFT_ONLY_TITLE)).toHaveCount(0);
});

test("marks only sample content with the sample badge", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.locator("article#sample-paper-blossoms").getByText("פרויקט לדוגמה", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(`article#${ALBUM_SLUG}`).getByText("פרויקט לדוגמה")).toHaveCount(0);
  await expect(page.locator(`article#${SINGLE_SLUG}`).getByText("פרויקט לדוגמה")).toHaveCount(0);
});

test("chapters stay readable with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: SAMPLE_TITLE })).toBeVisible();
  await expect(page.getByRole("heading", { name: ALBUM_TITLE })).toBeVisible();
  await expect(page.getByRole("heading", { name: SINGLE_TITLE })).toBeVisible();
});

test("keyboard and assistive reading order follows the curated chapter sequence", async ({
  page,
}) => {
  await page.goto("/");

  const headingNames = await page.locator("main h1, main h2").allTextContents();
  expect(headingNames.map((text) => text.trim())).toEqual([
    "תיק העבודות של הילה",
    SAMPLE_TITLE,
    ALBUM_TITLE,
    SINGLE_TITLE,
  ]);

  for (const slug of ["sample-paper-blossoms", ALBUM_SLUG, SINGLE_SLUG]) {
    const chapter = page.locator(`article#${slug}`);
    const labelledBy = await chapter.getAttribute("aria-labelledby");
    const headingText = await chapter.locator(`#${labelledBy}`).textContent();
    const chapterHeading = await chapter.getByRole("heading", { level: 2 }).textContent();
    expect(headingText?.trim()).toEqual(chapterHeading?.trim());
  }
});

test("chapters stay usable on a narrow mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  for (const title of [SAMPLE_TITLE, ALBUM_TITLE, SINGLE_TITLE]) {
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }

  const imageBox = await page
    .locator(`article#${SINGLE_SLUG}`)
    .getByRole("img", { name: "תמונת שער לפרויקט היחיד" })
    .boundingBox();
  expect(imageBox).not.toBeNull();
  expect(imageBox!.height).toBeLessThan(844 * 0.65);
});
