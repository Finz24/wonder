import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StudioDemoClient } from "@/components/studio/studio-demo-client";
import {
  STUDIO_DEMO_FIXTURE_NOTICE,
  STUDIO_DEMO_NO_AUTH_NOTICE,
} from "@/studio/demo-fixture-adapter";

export const metadata: Metadata = {
  title: "הדגמת עריכה זמנית · Wonder",
  description: "הדגמה זמנית של עורך הפרויקטים — ללא שמירה וללא התחברות.",
};

export default function StudioDemoPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
      <header className="max-w-2xl">
        <p className="font-utility text-xs font-bold tracking-[0.12em]">הסטודיו של הילה · הדגמה זמנית</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">שולחן העריכה</h1>
        <Separator className="my-6 max-w-24" />
        <p className="text-lg leading-8 text-pretty text-muted-foreground">
          רשימת הפרויקטים ועריכת שם ותיאור — באותם צבעים, צורות וגופנים של המגילה, בקצב רגוע וללא תנועה.
        </p>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="סימוני הדגמה">
          <Badge>הדגמה זמנית</Badge>
          <Badge variant="secondary">ללא שמירה</Badge>
          <Badge variant="outline">ללא התחברות</Badge>
        </div>
        <p role="note" className="mt-4 font-utility text-sm leading-7 text-muted-foreground">
          {STUDIO_DEMO_FIXTURE_NOTICE} {STUDIO_DEMO_NO_AUTH_NOTICE} כל התוכן כאן הוא תוכן לדוגמה בלבד.
        </p>
      </header>

      <div className="mt-10">
        <StudioDemoClient />
      </div>
    </main>
  );
}
