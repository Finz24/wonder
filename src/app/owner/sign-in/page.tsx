import { redirect } from "next/navigation";

import { getOwnerSession } from "@/auth/guard";

import { SignInForm } from "./sign-in-form";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "כניסת הילה · Wonder",
  description: "כניסה למרחב האישי של הילה",
};

/**
 * Owner sign-in surface. Already-authenticated visits skip straight into
 * the Owner Workspace; everything else gets Hila's calm sign-in card.
 */
export default async function OwnerSignInPage() {
  const session = await getOwnerSession();
  if (session) redirect("/owner");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-4 py-12 sm:px-8">
      <SignInForm />
      <p className="mt-6 max-w-md text-center text-sm leading-7 text-muted-foreground">
        הכניסה מיועדת להילה בלבד. אין הרשמה ציבורית ואין תפקידים נוספים.
      </p>
    </main>
  );
}
