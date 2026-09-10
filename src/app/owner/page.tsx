import { redirect } from "next/navigation";

import { signOutAction } from "@/auth/actions";
import { getOwnerConfig } from "@/auth/config";
import { requireOwner } from "@/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "הסטודיו של הילה · Wonder",
  description: "המרחב האישי של הילה",
};

/**
 * Owner Workspace shell. Server-guarded: the reusable `requireOwner`
 * boundary below (plus middleware) is what keeps Visitors out — never the
 * absence of a link. Editorial workflows themselves arrive in later tracks;
 * this shell owns authentication, session state, and sign-out.
 */
export default async function OwnerWorkspacePage() {
  let authorization;
  try {
    authorization = await requireOwner();
  } catch {
    redirect("/owner/sign-in");
  }
  const config = await getOwnerConfig();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-12 sm:px-8 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-utility text-xs font-bold tracking-[0.12em]">Wonder · By Hila</p>
        <h1 className="mt-5 font-display text-4xl leading-tight text-balance sm:text-5xl">
          הסטודיו של הילה
        </h1>
        <Separator className="mx-auto my-7 max-w-24" />
        <p className="text-base leading-8 text-pretty text-muted-foreground">
          מחוברת כ־<span dir="ltr">{authorization.ownerId}</span>. מכאן תנהלי את הפרויקטים וההמלצות.
        </p>
      </header>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>
            <span className="font-display text-2xl">בוקר של יצירה, הילה.</span>
          </CardTitle>
          <CardDescription>
            <span className="mt-2 block leading-7">
              כלי העריכה המלאים (פרויקטים, אלבומים ופרסום) נבנים במסלול נפרד. מעטפת ההתחברות
              וההגנה כבר פעילה כאן.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          {config.isFixtureConfig ? (
            <Badge>זהות לדוגמה — לא פרטי הילה האמיתיים</Badge>
          ) : (
            <Badge>זהות מוגדרת של הילה</Badge>
          )}
          <form action={signOutAction} className="ms-auto">
            <button
              type="submit"
              className="rounded-md border border-input bg-background px-4 py-2 font-utility text-sm font-bold transition-opacity hover:opacity-80"
            >
              יציאה מהסטודיו
            </button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
