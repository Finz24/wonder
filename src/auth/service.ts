import "server-only";

import { cookies } from "next/headers";

import { getOwnerConfig, OWNER_SESSION_COOKIE_NAME } from "./config";
import { verifyOwnerPassword } from "./password";
import { createOwnerSessionToken } from "./session";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Authenticate Hila's single configured identity. Deliberately returns a
 * boolean (no reason distinction) so failures do not reveal whether the
 * email or the password was wrong.
 */
export async function authenticateOwner(email: string, password: string): Promise<boolean> {
  const config = await getOwnerConfig();
  if (normalizeEmail(email) !== config.ownerEmail) return false;
  return verifyOwnerPassword(password, config.ownerPasswordHash);
}

export async function setOwnerSessionCookie(ownerId: string): Promise<void> {
  const config = await getOwnerConfig();
  const token = createOwnerSessionToken(
    ownerId,
    config.sessionSecret,
    config.sessionMaxAgeSeconds,
  );
  const cookieStore = await cookies();
  cookieStore.set(OWNER_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + config.sessionMaxAgeSeconds * 1000),
    sameSite: "lax",
    path: "/",
  });
}

export async function clearOwnerSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  // Expire with the same path used when setting so removal always matches.
  cookieStore.set(OWNER_SESSION_COOKIE_NAME, "", { expires: new Date(0), path: "/" });
}
