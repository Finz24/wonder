import type {
  OwnerAuthorization,
  OwnerProjectOperations,
  OwnerProjectReader,
  ProjectDraft,
  ProjectMediaReference,
  PublishedProject,
  PublishedProjectReader,
} from "./contracts";
import { projectId, projectMediaId } from "./contracts";

export const SAMPLE_CONTENT_NOTICE = "תוכן לדוגמה בלבד — לא עבודה אמיתית של הילה.";

const sampleProjectId = projectId("project_fixture_paper_blossoms");
const sampleMediaId = projectMediaId("media_fixture_paper_blossoms_cover");
const sampleCover = {
  id: sampleMediaId,
  url: "/fixtures/sample-paper-blossoms.svg",
  alternativeText: "איור לדוגמה של פרחי נייר על רקע ורוד",
  caption: "איור זמני לצורכי פיתוח",
} as const;

export const samplePublishedProject: PublishedProject = {
  projectId: sampleProjectId,
  slug: "sample-paper-blossoms",
  title: "פרויקט הדגמה שמור",
  description: SAMPLE_CONTENT_NOTICE,
  media: [sampleCover],
  cover: sampleCover,
  publishedAt: new Date("2026-09-07T09:00:00.000Z"),
  portfolioPosition: 0,
};

export const sampleProjectDraft: ProjectDraft = {
  projectId: sampleProjectId,
  title: "טיוטה פרטית שאסור לפרסם",
  description: "גרסת עבודה פרטית של תוכן הדוגמה.",
  media: samplePublishedProject.media,
  coverMediaId: sampleMediaId,
  updatedAt: new Date("2026-09-08T09:00:00.000Z"),
};

export function ownerAuthorizationForFixtures(): OwnerAuthorization {
  return { ownerId: "fixture-owner" } as OwnerAuthorization;
}

type FixtureOwnerProjectAdapter = OwnerProjectReader & OwnerProjectOperations;

export function createFixtureProjectAdapters(): Readonly<{
  publishedProjectReader: PublishedProjectReader;
  ownerProjectAdapter: FixtureOwnerProjectAdapter;
  ownerAuthorization: OwnerAuthorization;
}> {
  const ownerAuthorization = ownerAuthorizationForFixtures();
  let draft: ProjectDraft | null = sampleProjectDraft;
  let published: PublishedProject | null = samplePublishedProject;

  function assertFixtureOwner(authorization: OwnerAuthorization) {
    if (authorization.ownerId !== ownerAuthorization.ownerId) {
      throw new Error("Fixture owner authorization is required.");
    }
  }

  const ownerProjectAdapter: FixtureOwnerProjectAdapter = {
    async getProject(authorization, requestedProjectId) {
      assertFixtureOwner(authorization);
      if (requestedProjectId !== sampleProjectId) return null;
      return { draft, published };
    },
    async saveDraft(authorization, nextDraft) {
      assertFixtureOwner(authorization);
      if (nextDraft.projectId !== sampleProjectId) {
        throw new Error("The fixture adapter contains one Project.");
      }
      draft = nextDraft;
    },
    async publishDraft(authorization, requestedProjectId) {
      assertFixtureOwner(authorization);
      if (requestedProjectId !== sampleProjectId || !draft) {
        throw new Error("The fixture Project has no Draft to publish.");
      }

      const currentDraft = draft;
      const [firstMedia, ...remainingMedia] = currentDraft.media;
      const cover = currentDraft.media.find((item) => item.id === currentDraft.coverMediaId);
      if (!currentDraft.title || !currentDraft.description || !firstMedia || !cover) {
        throw new Error("The fixture Draft is incomplete and cannot be Published.");
      }
      const media: [ProjectMediaReference, ...ProjectMediaReference[]] = [
        firstMedia,
        ...remainingMedia,
      ];

      published = {
        projectId: currentDraft.projectId,
        slug: published?.slug ?? "sample-project",
        title: currentDraft.title,
        description: currentDraft.description,
        media,
        cover,
        publishedAt: new Date(),
        portfolioPosition: published?.portfolioPosition ?? 0,
      };
      return published;
    },
  };

  return {
    publishedProjectReader: {
      async listPublishedProjects() {
        return published ? [published] : [];
      },
    },
    ownerProjectAdapter,
    ownerAuthorization,
  };
}
