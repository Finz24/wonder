import { expect, test } from "@playwright/test";

import {
  FIXTURE_OWNER_EMAIL,
  FIXTURE_OWNER_PASSWORD,
  FIXTURE_SESSION_SECRET,
  OWNER_SESSION_COOKIE_NAME,
} from "../../src/auth/config";
import { createOwnerSessionToken } from "../../src/auth/session";

const SIGN_IN_PATH = "/owner/sign-in";
const OWNER_PATH = "/owner";
const SESSION_API = "/api/owner/session";
const SIGN_IN_API = "/api/owner/sign-in";
const SIGN_OUT_API = "/api/owner/sign-out";

test("Unauthenticated Visitor is kept out of the Owner Workspace and its APIs", async ({
  page,
  request,
}) => {
  await page.goto(OWNER_PATH);
  await expect(page).toHaveURL(SIGN_IN_PATH);
  await expect(page.getByText("כניסת הילה")).toBeVisible();

  const sessionResponse = await request.get(SESSION_API);
  expect(sessionResponse.status()).toBe(401);
});

test("Wrong credentials are rejected without revealing which field failed", async ({ request }) => {
  const wrongPassword = await request.post(SIGN_IN_API, {
    data: { email: FIXTURE_OWNER_EMAIL, password: "definitely-the-wrong-password" },
  });
  expect(wrongPassword.status()).toBe(401);

  const otherIdentity = await request.post(SIGN_IN_API, {
    data: { email: "someone-else@example.com", password: FIXTURE_OWNER_PASSWORD },
  });
  expect(otherIdentity.status()).toBe(401);

  const sessionResponse = await request.get(SESSION_API);
  expect(sessionResponse.status()).toBe(401);
});

test("Tampered, other-identity, and expired sessions are rejected", async ({
  page,
  context,
}) => {
  const addSessionCookie = async (value: string) => {
    await context.addCookies([
      {
        name: OWNER_SESSION_COOKIE_NAME,
        value,
        domain: "127.0.0.1",
        path: "/",
      },
    ]);
  };

  await addSessionCookie("tampered-not-a-real-token");
  await page.goto(OWNER_PATH);
  await expect(page).toHaveURL(SIGN_IN_PATH);
  await context.clearCookies();

  const otherIdentityToken = createOwnerSessionToken(
    "someone-else@example.com",
    FIXTURE_SESSION_SECRET,
    12 * 60 * 60,
  );
  await addSessionCookie(otherIdentityToken);
  await page.goto(OWNER_PATH);
  await expect(page).toHaveURL(SIGN_IN_PATH);
  await context.clearCookies();

  const expiredToken = createOwnerSessionToken(
    FIXTURE_OWNER_EMAIL,
    FIXTURE_SESSION_SECRET,
    -10,
  );
  await addSessionCookie(expiredToken);
  await page.goto(OWNER_PATH);
  await expect(page).toHaveURL(SIGN_IN_PATH);
  await context.clearCookies();
});

test("Direct API requests with forged, other-identity, and expired sessions are rejected", async ({
  request,
}) => {
  const forgedTokens = [
    "tampered-not-a-real-token",
    createOwnerSessionToken("someone-else@example.com", FIXTURE_SESSION_SECRET, 12 * 60 * 60),
    createOwnerSessionToken(FIXTURE_OWNER_EMAIL, FIXTURE_SESSION_SECRET, -10),
    createOwnerSessionToken(
      FIXTURE_OWNER_EMAIL,
      "entirely-the-wrong-secret-0123456789abcdef",
      12 * 60 * 60,
    ),
  ];

  for (const token of forgedTokens) {
    const response = await request.get(SESSION_API, {
      headers: { cookie: `${OWNER_SESSION_COOKIE_NAME}=${token}` },
    });
    expect(response.status()).toBe(401);
  }
});

test("Hila signs in, enters the workspace, and signs out again", async ({ page }) => {
  await page.goto(SIGN_IN_PATH);
  await page.getByLabel("כתובת דוא״ל").fill(FIXTURE_OWNER_EMAIL);
  await page.getByLabel("סיסמה").fill("definitely-the-wrong-password");
  await page.getByRole("button", { name: "כניסה לסטודיו" }).click();
  await expect(page.getByText("פרטי הכניסה אינם נכונים.")).toBeVisible();
  await expect(page).toHaveURL(SIGN_IN_PATH);

  await page.getByLabel("כתובת דוא״ל").fill(FIXTURE_OWNER_EMAIL);
  await page.getByLabel("סיסמה").fill(FIXTURE_OWNER_PASSWORD);
  await page.getByRole("button", { name: "כניסה לסטודיו" }).click();
  await expect(page).toHaveURL(OWNER_PATH);
  await expect(page.getByRole("heading", { name: "הסטודיו של הילה" })).toBeVisible();
  await expect(page.getByText(FIXTURE_OWNER_EMAIL)).toBeVisible();

  const sessionResponse = await page.request.get(SESSION_API);
  expect(sessionResponse.status()).toBe(200);
  const sessionBody = (await sessionResponse.json()) as { ownerId?: unknown };
  expect(sessionBody.ownerId).toBe(FIXTURE_OWNER_EMAIL);

  await page.getByRole("button", { name: "יציאה מהסטודיו" }).click();
  await expect(page).toHaveURL(SIGN_IN_PATH);

  await page.goto(OWNER_PATH);
  await expect(page).toHaveURL(SIGN_IN_PATH);
  const afterSignOut = await page.request.get(SESSION_API);
  expect(afterSignOut.status()).toBe(401);
});

test("Direct sign-in and sign-out requests manage the session cookie", async ({ request }) => {
  const signInResponse = await request.post(SIGN_IN_API, {
    data: { email: FIXTURE_OWNER_EMAIL, password: FIXTURE_OWNER_PASSWORD },
  });
  expect(signInResponse.status()).toBe(200);

  const sessionResponse = await request.get(SESSION_API);
  expect(sessionResponse.status()).toBe(200);

  const signOutResponse = await request.post(SIGN_OUT_API);
  expect(signOutResponse.status()).toBe(200);

  const afterSignOut = await request.get(SESSION_API);
  expect(afterSignOut.status()).toBe(401);
});
