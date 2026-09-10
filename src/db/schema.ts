import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
});

export const projectDrafts = sqliteTable("project_drafts", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  media: text("media", { mode: "json" }).notNull(),
  coverMediaId: text("cover_media_id"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const publishedProjects = sqliteTable("published_projects", {
  projectId: text("project_id")
    .primaryKey()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  media: text("media", { mode: "json" }).notNull(),
  coverMediaId: text("cover_media_id").notNull(),
  publishedAt: integer("published_at", { mode: "timestamp_ms" }).notNull(),
  portfolioPosition: integer("portfolio_position").notNull().unique(),
});
