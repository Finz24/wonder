import "server-only";

import { cookies } from "next/headers";

import type { OwnerAuthorization } from "@/projects/contracts";

import { getOwnerConfig, OWNER_SESSION_COOKIE_NAME } from "./config";
import { verifyOwnerSessionToken, type OwnerSessionPayload } from "./session";

export class OwnerAuthorizationError extends Error {
  readonly status = 401;

  constructor(message = "Owner authorization is required.") {
    super(message);
    this.name = "OwnerAuthorizationError";
  }
}

export type OwnerSession = OwnerSessionPayload;

/**
 * Read and verify the current request's owner session. Returns null for
 * missing, tampered, expired, or other-identity sessions — never throws —
 * so pages can choose between redirecting and rendering.
 */
export async function getOwnerSession(): Promise<OwnerSession | null> {
  const config = await getOwnerConfig();
  const cookieStore = await cookies();
  const token = cookieStore.get(OWNER_SESSION_COOKIE_NAME)?.value;
  const payload = verifyOwnerSessionToken(token, {
    expectedOwnerId: config.ownerEmail,
    secret: config.sessionSecret,
  });
  if (!payload) return null;
  return { ownerId: payload.ownerId, expiresAt: payload.expiresAt };
}

/**
 * Reusable owner guard for every server/request boundary: Server Components,
 * Server Actions, and Route Handlers. Throws OwnerAuthorizationError (401)
 * unless the request carries Hila's valid session.
 */
export async function requireOwner(): Promise<OwnerAuthorization> {
  const session = await getOwnerSession();
  if (!session) throw new OwnerAuthorizationError();
  return { ownerId: session.ownerId } as OwnerAuthorization;
}

/**
 * Route Handler helper: run the guarded callback, translating authorization
 * failures into a 401 JSON response instead of an exception page.
 */
export async function withOwnerAuthorization<T>(
  callback: (authorization: OwnerAuthorization) => Promise<T>,
): Promise<T | Response> {
  try {
    const authorization = await requireOwner();
    return await callback(authorization);
  } catch (error) {
    if (error instanceof OwnerAuthorizationError) {
      return Response.json({ error: "Owner authorization is required." }, { status: 401 });
    }
    throw error;
  }
}
