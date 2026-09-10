import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DemoProject } from "@/studio/demo-fixture-adapter";

import { STUDIO_FOCUS_RING } from "./studio-theme";

const STATE_LABELS = { published: "מפורסם", draft: "טיוטה" } as const;

type ProjectListProps = Readonly<{
  projects: readonly DemoProject[];
  selectedId: string | null;
  unsavedIds: ReadonlySet<string>;
  onSelect: (id: string) => void;
  onCreate: () => void;
}>;

function projectCountLabel(count: number): string {
  if (count === 1) return "פרויקט אחד";
  if (count === 2) return "שני פרויקטים";
  return `${count} פרויקטים`;
}

function photoCountLabel(count: number): string {
  if (count === 0) return "אין תמונות עדיין";
  if (count === 1) return "תמונה אחת";
  if (count === 2) return "שתי תמונות";
  return `${count} תמונות`;
}

export function ProjectList({ projects, selectedId, unsavedIds, onSelect, onCreate }: ProjectListProps) {
  return (
    <section aria-labelledby="demo-project-list-heading" className="min-w-0">
      <div className="flex items-center justify-between gap-3">
        <h2 id="demo-project-list-heading" className="font-display text-2xl">
          הפרויקטים שלי
        </h2>
        <span className="font-utility text-xs text-muted-foreground" role="status">
          {projectCountLabel(projects.length)}
        </span>
      </div>

      <button
        id="demo-new-project"
        type="button"
        onClick={onCreate}
        className={cn(
          "mt-4 w-full rounded-md bg-primary px-4 py-3 font-utility text-sm font-bold text-primary-foreground",
          STUDIO_FOCUS_RING,
        )}
      >
        + פרויקט חדש
      </button>

      <ul aria-label="רשימת פרויקטים בהדגמה" className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {projects.map((project) => {
          const selected = project.id === selectedId;
          const unsaved = unsavedIds.has(project.id);
          const displayTitle = project.title || "פרויקט חדש";
          return (
            <li key={project.id} className="min-w-44 flex-1 lg:min-w-0">
              <button
                type="button"
                onClick={() => onSelect(project.id)}
                aria-current={selected ? "true" : undefined}
                aria-label={unsaved ? `עריכת ${displayTitle} (לא נשמר)` : `עריכת ${displayTitle}`}
                className={cn(
                  "w-full rounded-md border bg-card px-4 py-3 text-right shadow-xs",
                  selected ? "border-primary" : "border-border",
                  STUDIO_FOCUS_RING,
                )}
              >
                <span className="block font-display text-lg leading-snug" aria-hidden="true">{displayTitle}</span>
                <span className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant={project.state === "published" ? "default" : "secondary"}>
                    {STATE_LABELS[project.state]}
                  </Badge>
                  <Badge variant="outline">תוכן לדוגמה</Badge>
                  {unsaved ? <Badge variant="outline">לא נשמר</Badge> : null}
                </span>
                <span className="mt-2 block font-utility text-xs text-muted-foreground">
                  {photoCountLabel(project.photoCount)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 font-utility text-xs leading-6 text-muted-foreground">
        מעבר בין פרויקטים שומר שינויים שלא נשמרו בזיכרון ההדגמה בלבד.
      </p>
    </section>
  );
}
