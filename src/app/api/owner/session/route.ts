import { withOwnerAuthorization } from "@/auth/guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Owner session probe. Returns the signed-in identity or 401, letting
 * automated checks assert the authorization boundary directly.
 */
export async function GET() {
  return withOwnerAuthorization(async (authorization) =>
    Response.json({ authenticated: true, ownerId: authorization.ownerId }),
  );
}
