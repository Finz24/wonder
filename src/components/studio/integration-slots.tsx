import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DemoProject, DemoProjectFields } from "@/studio/demo-fixture-adapter";

/**
 * Shared integration slots for neighbouring tracks. They render fixture
 * content read-only and mark exactly where the real adapters plug in:
 * media upload (issue #10), cover/order/captions (issue #11), and the full
 * scroll Preview (issue #13). Nothing here persists or publishes.
 */

export function MediaSlot({ project }: Readonly<{ project: DemoProject }>) {
  return (
    <fieldset
      disabled
      aria-describedby="demo-media-slot-note"
      className="mt-6 min-w-0 rounded-md border border-border bg-card p-6 sm:p-8"
    >
      <legend className="px-2 font-display text-2xl">התמונות בפרויקט</legend>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {project.photoCount > 0 ? (
          <figure className="m-0 w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverUrl}
              alt={project.coverAlternativeText}
              className="block h-auto w-full rounded-md border-4 border-secondary"
            />
            <figcaption className="mt-2 font-utility text-xs text-muted-foreground">תמונת כריכה (דוגמה)</figcaption>
          </figure>
        ) : (
          <p className="font-utility text-sm text-muted-foreground">אין תמונות עדיין בהדגמה.</p>
        )}
        <label htmlFor="demo-upload" className="font-utility text-sm font-bold text-primary">
          + הוספת תמונות (מושבת בהדגמה)
          <input id="demo-upload" type="file" accept="image/*" multiple disabled className="mt-2 block" />
        </label>
      </div>

      <p id="demo-media-slot-note" className="mt-4 font-utility text-xs leading-6 text-muted-foreground">
        שיוך להעלאת תמונות יתחבר כאן (נושא מס׳ 10); בחירת כריכה, סדר האלבום וכיתובים יתחברו כאן (נושא מס׳ 11).
      </p>
    </fieldset>
  );
}

export function PreviewSlot({
  project,
  fields,
}: Readonly<{ project: DemoProject; fields: DemoProjectFields }>) {
  const previewTitle = fields.title.trim() || project.title || "פרויקט חדש";
  const previewDescription = fields.description.trim() || project.description;

  return (
    <section
      aria-labelledby="demo-preview-heading"
      className="mt-6 min-w-0 rounded-md border border-dashed border-input p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="demo-preview-heading" className="font-display text-2xl">
          תצוגה מקדימה זמנית
        </h2>
        <Badge variant="outline">אינה פרסום</Badge>
      </div>
      <p className="mt-2 font-utility text-xs leading-6 text-muted-foreground">
        מראה מקוצר של הטיוטה, באותם גופנים וצבעים של המגילה. התצוגה המלאה במגילה תתחבר כאן (נושא מס׳ 13).
      </p>

      <Card className="mt-4">
        <CardHeader>
          <Badge className="w-fit">פרויקט לדוגמה</Badge>
          <CardTitle>
            <span className="mt-3 block font-display text-3xl leading-tight">{previewTitle}</span>
          </CardTitle>
          <CardDescription>
            <span className="mt-3 block text-base leading-8 text-foreground">{previewDescription}</span>
          </CardDescription>
        </CardHeader>
        {project.photoCount > 0 ? (
          <CardContent>
            <figure className="m-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.coverUrl}
                alt={project.coverAlternativeText}
                className="block h-auto w-full rounded-[45%_45%_1rem_1rem]"
              />
            </figure>
          </CardContent>
        ) : null}
      </Card>
    </section>
  );
}
