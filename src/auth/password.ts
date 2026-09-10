import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const KEY_LENGTH_BYTES = 64;
const SALT_LENGTH_BYTES = 16;

/**
 * Create a scrypt password hash in `saltHex:derivedHex` form.
 * The salt is freshly random for every hash.
 */
export async function hashOwnerPassword(password: string): Promise<string> {
  if (!password) throw new Error("Owner password cannot be empty.");
  const salt = randomBytes(SALT_LENGTH_BYTES);
  const derived = (await scrypt(password, salt, KEY_LENGTH_BYTES)) as Buffer;
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

/**
 * Verify a password against a `saltHex:derivedHex` scrypt hash.
 * Returns false (rather than throwing) for malformed hashes so callers can
 * treat every failure as a generic authentication rejection.
 */
export async function verifyOwnerPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  try {
    if (!password || !passwordHash) return false;
    const separatorIndex = passwordHash.indexOf(":");
    if (separatorIndex <= 0) return false;
    const saltHex = passwordHash.slice(0, separatorIndex);
    const expectedHex = passwordHash.slice(separatorIndex + 1);
    if (!saltHex || !expectedHex) return false;
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(expectedHex, "hex");
    if (salt.length !== SALT_LENGTH_BYTES || expected.length !== KEY_LENGTH_BYTES) return false;
    const derived = (await scrypt(password, salt, KEY_LENGTH_BYTES)) as Buffer;
    if (derived.length !== expected.length) return false;
    return timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
