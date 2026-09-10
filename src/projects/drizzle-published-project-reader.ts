import { asc, eq } from "drizzle-orm";

import type { WonderDatabase } from "@/db/database";
import { projects, publishedProjects } from "@/db/schema";
import type {
  ProjectMediaReference,
  PublishedProject,
  PublishedProjectReader,
} from "@/projects/contracts";
import { projectId, projectMediaId } from "@/projects/contracts";

function readMedia(value: unknown): readonly [ProjectMediaReference, ...ProjectMediaReference[]] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("A Published Project must contain at least one media reference.");
  }

  const media = value.map((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("id" in entry) ||
      typeof entry.id !== "string" ||
      !("url" in entry) ||
      typeof entry.url !== "string" ||
      !("alternativeText" in entry) ||
      typeof entry.alternativeText !== "string" ||
      !("caption" in entry) ||
      (entry.caption !== null && typeof entry.caption !== "string")
    ) {
      throw new Error("Stored Project media is invalid.");
    }

    return {
      id: projectMediaId(entry.id),
      url: entry.url,
      alternativeText: entry.alternativeText,
      caption: entry.caption,
    };
  });

  return media as [ProjectMediaReference, ...ProjectMediaReference[]];
}

export class DrizzlePublishedProjectReader implements PublishedProjectReader {
  constructor(private readonly db: WonderDatabase) {}

  async listPublishedProjects(): Promise<readonly PublishedProject[]> {
    const rows = await this.db
      .select({
        projectId: publishedProjects.projectId,
        slug: projects.slug,
        title: publishedProjects.title,
        description: publishedProjects.description,
        media: publishedProjects.media,
        coverMediaId: publishedProjects.coverMediaId,
        publishedAt: publishedProjects.publishedAt,
        portfolioPosition: publishedProjects.portfolioPosition,
      })
      .from(publishedProjects)
      .innerJoin(projects, eq(publishedProjects.projectId, projects.id))
      .orderBy(asc(publishedProjects.portfolioPosition));

    return rows.map((row) => {
      const media = readMedia(row.media);
      const coverMediaId = projectMediaId(row.coverMediaId);
      const cover = media.find((item) => item.id === coverMediaId);

      if (!cover) {
        throw new Error("A Published Project cover must refer to its ordered media.");
      }

      return {
        projectId: projectId(row.projectId),
        slug: row.slug,
        title: row.title,
        description: row.description,
        media,
        cover,
        publishedAt: row.publishedAt,
        portfolioPosition: row.portfolioPosition,
      };
    });
  }
}
