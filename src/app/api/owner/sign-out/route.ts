import { clearOwnerSessionCookie } from "@/auth/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Sign-out endpoint: clears the owner session cookie. */
export async function POST() {
  await clearOwnerSessionCookie();
  return Response.json({ authenticated: false });
}
