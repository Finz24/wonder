import { getOwnerConfig } from "@/auth/config";
import { authenticateOwner, setOwnerSessionCookie } from "@/auth/service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Direct-request sign-in endpoint. Shares the same single-identity
 * authentication and session cookie as the workspace sign-in form so
 * authorization can be exercised without a browser.
 */
export async function POST(request: Request) {
  let email = "";
  let password = "";
  try {
    const body: unknown = await request.json();
    if (typeof body === "object" && body !== null) {
      const record = body as { email?: unknown; password?: unknown };
      if (typeof record.email === "string") email = record.email;
      if (typeof record.password === "string") password = record.password;
    }
  } catch {
    return Response.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  if (!email.trim() || !password) {
    return Response.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const authenticated = await authenticateOwner(email, password);
  if (!authenticated) {
    return Response.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const config = await getOwnerConfig();
  await setOwnerSessionCookie(config.ownerEmail);
  return Response.json({ authenticated: true });
}
