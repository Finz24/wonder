import { createHmac, timingSafeEqual } from "node:crypto";

export type OwnerSessionPayload = Readonly<{
  ownerId: string;
  expiresAt: number;
}>;

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(canonicalPayload: string, secret: string): string {
  return createHmac("sha256", secret).update(canonicalPayload).digest("base64url");
}

/**
 * Create a stateless, HMAC-signed owner session token. The token carries the
 * owner identity and an absolute expiry; the secret never leaves the server.
 */
export function createOwnerSessionToken(
  ownerId: string,
  secret: string,
  maxAgeSeconds: number,
  nowMilliseconds = Date.now(),
): string {
  if (!ownerId) throw new Error("Owner identity cannot be empty.");
  if (!secret) throw new Error("Session secret cannot be empty.");
  const payload = toBase64Url(
    JSON.stringify({ ownerId, expiresAt: nowMilliseconds + maxAgeSeconds * 1000 }),
  );
  return `${payload}.${sign(payload, secret)}`;
}

/**
 * Verify a session token and return its payload, or null when the token is
 * missing, malformed, tampered, issued for another identity, or expired.
 */
export function verifyOwnerSessionToken(
  token: string | undefined | null,
  options: Readonly<{
    expectedOwnerId: string;
    secret: string;
    nowMilliseconds?: number;
  }>,
): OwnerSessionPayload | null {
  try {
    if (!token) return null;
    const separatorIndex = token.indexOf(".");
    if (separatorIndex <= 0) return null;
    const payload = token.slice(0, separatorIndex);
    const signature = token.slice(separatorIndex + 1);
    if (!payload || !signature) return null;

    const expectedSignature = sign(payload, options.secret);
    const signatureBuffer = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    if (signatureBuffer.length !== expectedBuffer.length) return null;
    if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

    const parsed: unknown = JSON.parse(fromBase64Url(payload));
    if (typeof parsed !== "object" || parsed === null) return null;
    const { ownerId, expiresAt } = parsed as { ownerId?: unknown; expiresAt?: unknown };
    if (ownerId !== options.expectedOwnerId) return null;
    if (typeof expiresAt !== "number" || !Number.isSafeInteger(expiresAt)) return null;
    if (expiresAt <= (options.nowMilliseconds ?? Date.now())) return null;
    return { ownerId, expiresAt };
  } catch {
    return null;
  }
}
