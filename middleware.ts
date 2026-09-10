import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SIGN_IN_PATH = "/owner/sign-in";
// Must stay identical to OWNER_SESSION_COOKIE_NAME in src/auth/config.ts.
// The value is inlined (not imported) because middleware runs in the Edge
// runtime, where the Node.js crypto used by the session modules is unavailable.
const OWNER_SESSION_COOKIE_NAME = "wonder_owner_session";

/**
 * UX-level redirect for the Owner Workspace: requests without any session
 * cookie are sent to sign-in instead of rendering owner pages. This checks
 * cookie presence only — signature, identity, and expiry are verified at the
 * server boundary in `src/auth/guard.ts`, which every owner page, action,
 * and route uses. A forged cookie passes this redirect but is rejected there.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === SIGN_IN_PATH || pathname.startsWith("/owner/sign-in/")) {
    return NextResponse.next();
  }

  const hasSessionCookie = request.cookies.has(OWNER_SESSION_COOKIE_NAME);
  if (hasSessionCookie) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Owner authorization is required." }, { status: 401 });
  }

  const signInUrl = request.nextUrl.clone();
  signInUrl.pathname = SIGN_IN_PATH;
  signInUrl.search = "";
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/owner/:path*", "/api/owner/:path*"],
};
