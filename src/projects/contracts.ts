declare const projectIdBrand: unique symbol;
declare const mediaIdBrand: unique symbol;
declare const ownerAuthorizationBrand: unique symbol;

export type ProjectId = string & { readonly [projectIdBrand]: true };
export type ProjectMediaId = string & { readonly [mediaIdBrand]: true };

export type ProjectMediaReference = Readonly<{
  id: ProjectMediaId;
  url: string;
  alternativeText: string;
  caption: string | null;
}>;

export type ProjectDraft = Readonly<{
  projectId: ProjectId;
  title: string;
  description: string;
  media: readonly ProjectMediaReference[];
  coverMediaId: ProjectMediaId | null;
  updatedAt: Date;
}>;

export type PublishedProject = Readonly<{
  projectId: ProjectId;
  slug: string;
  title: string;
  description: string;
  media: readonly [ProjectMediaReference, ...ProjectMediaReference[]];
  cover: ProjectMediaReference;
  publishedAt: Date;
  portfolioPosition: number;
}>;

export type OwnerAuthorization = Readonly<{
  ownerId: string;
  readonly [ownerAuthorizationBrand]: true;
}>;

export interface PublishedProjectReader {
  listPublishedProjects(): Promise<readonly PublishedProject[]>;
}

export interface OwnerProjectReader {
  getProject(
    authorization: OwnerAuthorization,
    projectId: ProjectId,
  ): Promise<Readonly<{ draft: ProjectDraft | null; published: PublishedProject | null }> | null>;
}

export interface OwnerProjectOperations {
  saveDraft(authorization: OwnerAuthorization, draft: ProjectDraft): Promise<void>;
  publishDraft(
    authorization: OwnerAuthorization,
    projectId: ProjectId,
  ): Promise<PublishedProject>;
}

export function projectId(value: string): ProjectId {
  if (!value.trim()) throw new Error("Project identity cannot be empty.");
  return value as ProjectId;
}

export function projectMediaId(value: string): ProjectMediaId {
  if (!value.trim()) throw new Error("Project media identity cannot be empty.");
  return value as ProjectMediaId;
}
