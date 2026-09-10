import { hashOwnerPassword } from "./password";

/**
 * Fictional development/test identity. Never a real Creator credential:
 * it only applies when Wonder runs outside production without configured
 * owner environment values, and every surface using it is labelled.
 */
export const FIXTURE_OWNER_EMAIL = "owner.fixture@example.com";
export const FIXTURE_OWNER_PASSWORD = "fixture-owner-password-not-real-7";
export const FIXTURE_SESSION_SECRET =
  "development-only-fixture-secret-not-real-0123456789abcdef";

export const OWNER_SESSION_COOKIE_NAME = "wonder_owner_session";
export const DEFAULT_SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;

export type OwnerConfig = Readonly<{
  ownerEmail: string;
  ownerPasswordHash: string;
  sessionSecret: string;
  sessionMaxAgeSeconds: number;
  /** True when fictional local values stand in for Hila's real identity. */
  isFixtureConfig: boolean;
}>;

let cachedConfig: OwnerConfig | null = null;

function parseMaxAgeSeconds(raw: string | undefined): number {
  if (raw === undefined || raw.trim() === "") return DEFAULT_SESSION_MAX_AGE_SECONDS;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 60 || parsed > 30 * 24 * 60 * 60) {
    throw new Error("WONDER_SESSION_MAX_AGE_SECONDS must be 60-2592000 seconds.");
  }
  return parsed;
}

/**
 * Resolve the single configured owner identity. Production requires explicit
 * environment values; development and test fall back to clearly labelled
 * fictional values so the application stays locally runnable.
 */
export async function getOwnerConfig(): Promise<OwnerConfig> {
  if (cachedConfig) return cachedConfig;

  const sessionMaxAgeSeconds = parseMaxAgeSeconds(process.env.WONDER_SESSION_MAX_AGE_SECONDS);
  const configuredEmail = process.env.WONDER_OWNER_EMAIL?.trim();
  const configuredPasswordHash = process.env.WONDER_OWNER_PASSWORD_HASH?.trim();
  const configuredSecret = process.env.WONDER_SESSION_SECRET;

  if (configuredEmail && configuredPasswordHash && configuredSecret) {
    if (configuredSecret.length < 32) {
      throw new Error("WONDER_SESSION_SECRET must be at least 32 characters.");
    }
    cachedConfig = {
      ownerEmail: configuredEmail.toLowerCase(),
      ownerPasswordHash: configuredPasswordHash,
      sessionSecret: configuredSecret,
      sessionMaxAgeSeconds,
      isFixtureConfig: false,
    };
    return cachedConfig;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Owner authentication is not configured. Set WONDER_OWNER_EMAIL, " +
        "WONDER_OWNER_PASSWORD_HASH and WONDER_SESSION_SECRET.",
    );
  }

  cachedConfig = {
    ownerEmail: FIXTURE_OWNER_EMAIL,
    // Per-process random salt keeps the stored value unique while
    // verification stays valid inside this process.
    ownerPasswordHash: await hashOwnerPassword(FIXTURE_OWNER_PASSWORD),
    sessionSecret: FIXTURE_SESSION_SECRET,
    sessionMaxAgeSeconds,
    isFixtureConfig: true,
  };
  return cachedConfig;
}

/** Test-only reset so suites can re-resolve configuration per process. */
export function resetOwnerConfigForTests(): void {
  cachedConfig = null;
}

/**
 * Fictional local credentials, exposed only so automated tests can sign in
 * against the fixture configuration. Never real Creator credentials.
 */
export function fixtureOwnerCredentialsForTests(): Readonly<{ email: string; password: string }> {
  return { email: FIXTURE_OWNER_EMAIL, password: FIXTURE_OWNER_PASSWORD };
}
