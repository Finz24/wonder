import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PublishedProject } from "@/projects/contracts";

type ProjectChapterProps = {
  project: PublishedProject;
  chapterNumber: number;
  sampleBadgeText?: string | null;
};

export function ProjectChapter({ project, chapterNumber, sampleBadgeText }: ProjectChapterProps) {
  const headingId = `project-${project.projectId}`;

  return (
    <article
      id={project.slug}
      data-chapter="project"
      data-project-id={project.projectId}
      data-media-count={project.media.length}
      aria-labelledby={headingId}
      className="relative mt-16 scroll-mt-8"
    >
      <Card className="relative grid items-center gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(16rem,1.1fr)] md:[--card-spacing:--spacing(8)]">
        {sampleBadgeText ? (
          <Badge className="absolute end-4 top-4">{sampleBadgeText}</Badge>
        ) : null}
        <CardHeader className="pt-10 md:pt-8">
          <p className="font-utility text-xs font-bold tracking-[0.12em] text-muted-foreground">
            פרק {chapterNumber}
          </p>
          <CardTitle>
            <h2
              id={headingId}
              className="mt-3 font-display text-4xl leading-tight sm:text-5xl"
            >
              {project.title}
            </h2>
          </CardTitle>
          <CardDescription>
            <p className="mt-4 text-base leading-8 text-foreground">{project.description}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <figure className="m-0">
            <Image
              className="block h-56 w-full rounded-[45%_45%_1rem_1rem] object-cover sm:h-72 md:h-80"
              src={project.cover.url}
              alt={project.cover.alternativeText}
              width={720}
              height={540}
              priority={chapterNumber === 1}
            />
            {project.cover.caption ? (
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {project.cover.caption}
              </figcaption>
            ) : null}
          </figure>
        </CardContent>
      </Card>
    </article>
  );
}
