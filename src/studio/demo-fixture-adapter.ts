import { projectId, type ProjectId } from "@/projects/contracts";
import { SAMPLE_CONTENT_NOTICE, samplePublishedProject } from "@/projects/fixtures";

/**
 * Clearly temporary fixture adapter behind the themed Project editor demo.
 *
 * Scope (issue #8): in-memory demo state only. Nothing here touches the
 * database, performs a server mutation, or grants editorial authority.
 * All entries seed from the shared labelled sample fixture and reset on reload.
 *
 * Durable Draft work belongs to issue #9 and must pass the reusable owner
 * guard from issue #7 first — see `./owner-guard-seam`.
 */

export const STUDIO_DEMO_FIXTURE_NOTICE =
  "הדגמת עריכה זמנית — הנתונים אינם נשמרים ומתאפסים ברענון העמוד.";

export const STUDIO_DEMO_NO_AUTH_NOTICE =
  "ללא התחברות — הגנת בעלים תתחבר כאן לפני כל פעולה מתמשכת (נושא מס׳ 7).";

export const TITLE_MAX_LENGTH = 100;
export const DESCRIPTION_MAX_LENGTH = 2000;

export type DemoProjectState = "draft" | "published";

export type DemoProject = Readonly<{
  id: ProjectId;
  title: string;
  description: string;
  state: DemoProjectState;
  coverUrl: string;
  coverAlternativeText: string;
  photoCount: number;
  isFixture: true;
}>;

export type DemoProjectFields = Readonly<{
  title: string;
  description: string;
}>;

export type DemoFieldErrors = Readonly<{
  title?: string;
  description?: string;
}>;

export function validateDemoProjectFields(fields: DemoProjectFields): DemoFieldErrors {
  // Demo saves accept incomplete Drafts (parent story 44); only length is
  // enforced here. Publication completeness belongs to issue #12.
  const errors: { title?: string; description?: string } = {};

  if (fields.title.trim().length > TITLE_MAX_LENGTH) {
    errors.title = `השם ארוך מדי — עד ${TITLE_MAX_LENGTH} תווים.`;
  }

  if (fields.description.trim().length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `התיאור ארוך מדי — עד ${DESCRIPTION_MAX_LENGTH} תווים.`;
  }

  return errors;
}

function seedDemoProject(): DemoProject {
  return {
    id: samplePublishedProject.projectId,
    title: samplePublishedProject.title,
    description: SAMPLE_CONTENT_NOTICE,
    state: "published",
    coverUrl: samplePublishedProject.cover.url,
    coverAlternativeText: samplePublishedProject.cover.alternativeText,
    photoCount: samplePublishedProject.media.length,
    isFixture: true,
  };
}

export type DemoStudio = Readonly<{
  listProjects(): DemoProject[];
  getProject(id: string): DemoProject | null;
  createProject(): DemoProject;
  updateProject(id: string, fields: DemoProjectFields): DemoProject;
}>;

/**
 * Create an isolated in-memory studio for the demo route. Each call starts
 * from the shared sample fixture, so parallel sessions never share state.
 */
export function createDemoStudio(): DemoStudio {
  let projects: DemoProject[] = [seedDemoProject()];
  let createdCount = 0;

  return {
    listProjects() {
      return [...projects];
    },
    getProject(id: string) {
      return projects.find((project) => project.id === id) ?? null;
    },
    createProject() {
      createdCount += 1;
      const project: DemoProject = {
        id: projectId(`demo-project-${Date.now()}-${createdCount}`),
        title: "פרויקט חדש",
        description: "",
        state: "draft",
        coverUrl: samplePublishedProject.cover.url,
        coverAlternativeText: "תמונת דוגמה זמנית — תוחלף בהעלאה אמיתית",
        photoCount: 0,
        isFixture: true,
      };
      projects = [project, ...projects];
      return project;
    },
    updateProject(id: string, fields: DemoProjectFields) {
      const errors = validateDemoProjectFields(fields);
      const firstError = errors.title ?? errors.description;
      if (firstError) throw new Error(firstError);

      const existing = projects.find((project) => project.id === id);
      if (!existing) throw new Error("הפרויקט המבוקש אינו קיים בהדגמה.");

      const updated: DemoProject = {
        ...existing,
        title: fields.title.trim(),
        description: fields.description.trim(),
      };
      projects = projects.map((project) => (project.id === id ? updated : project));
      return updated;
    },
  };
}
