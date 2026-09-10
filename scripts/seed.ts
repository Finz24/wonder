import { openDatabase } from "../src/db/database";
import { projectDrafts, projects, publishedProjects } from "../src/db/schema";
import { sampleProjectDraft, samplePublishedProject } from "../src/projects/fixtures";

const database = openDatabase();

try {
  database.db
    .insert(projects)
    .values({ id: samplePublishedProject.projectId, slug: samplePublishedProject.slug })
    .onConflictDoNothing()
    .run();

  database.db
    .insert(publishedProjects)
    .values({
      ...samplePublishedProject,
      coverMediaId: samplePublishedProject.cover.id,
    })
    .onConflictDoNothing()
    .run();

  database.db
    .insert(projectDrafts)
    .values(sampleProjectDraft)
    .onConflictDoNothing()
    .run();

  console.log("Clearly labelled sample Project fixture stored.");
} finally {
  database.close();
}
