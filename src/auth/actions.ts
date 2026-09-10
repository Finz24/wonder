"use server";

import { redirect } from "next/navigation";

import { getOwnerConfig } from "./config";
import {
  authenticateOwner,
  clearOwnerSessionCookie,
  setOwnerSessionCookie,
} from "./service";

export type SignInState = Readonly<{
  error: string | null;
}>;

const GENERIC_SIGN_IN_ERROR = "פרטי הכניסה אינם נכונים.";

/**
 * Sign-in Server Action used by the Owner Workspace sign-in form. On success
 * it sets the session cookie and redirects into the workspace; on failure it
 * returns a generic Hebrew error without redirecting.
 */
export async function signInAction(
  _previousState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!email.trim() || !password) return { error: GENERIC_SIGN_IN_ERROR };

  const authenticated = await authenticateOwner(email, password);
  if (!authenticated) return { error: GENERIC_SIGN_IN_ERROR };

  const config = await getOwnerConfig();
  await setOwnerSessionCookie(config.ownerEmail);
  redirect("/owner");
}

/** Sign-out Server Action: deletes the session cookie and leaves the workspace. */
export async function signOutAction(): Promise<void> {
  await clearOwnerSessionCookie();
  redirect("/owner/sign-in");
}
