import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ScrollBook } from "@/components/scroll/scroll-book";
import { ScrollChapter } from "@/components/scroll/scroll-chapter";
import { ScrollClosing } from "@/components/scroll/scroll-closing";
import { ScrollCover } from "@/components/scroll/scroll-cover";
import { database } from "@/db/client";
import { DrizzlePublishedProjectReader } from "@/projects/drizzle-published-project-reader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await new DrizzlePublishedProjectReader(database).listPublishedProjects();

  return (
    <ScrollBook cover={<ScrollCover />} closing={<ScrollClosing />}>
      {projects.map((project) => {
        return (
          <ScrollChapter
            key={project.projectId}
            slug={project.slug}
            labelledBy={`project-${project.projectId}`}
            heading={
              <>
                <p className="font-utility text-xs font-bold tracking-[0.12em] text-muted-foreground">
                  פרויקט {project.portfolioPosition + 1}
                </p>
                <h2
                  id={`project-${project.projectId}`}
                  className="mt-3 font-display text-4xl leading-tight sm:text-5xl"
                >
                  {project.title}
                </h2>
              </>
            }
          >
            <article className="relative" aria-labelledby={`project-${project.projectId}`}>
              <Card className="relative grid items-center gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(16rem,1.1fr)] md:[--card-spacing:--spacing(8)]">
                <Badge className="absolute end-4 top-4">פרויקט לדוגמה</Badge>
                <CardHeader className="pt-10 md:pt-8">
                  <CardDescription>
                    <p className="mt-4 text-base leading-8 text-foreground">{project.description}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <figure className="m-0">
                    <Image
                      className="block h-auto w-full rounded-[45%_45%_1rem_1rem]"
                      src={project.cover.url}
                      alt={project.cover.alternativeText}
                      width={720}
                      height={540}
                      priority
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
          </ScrollChapter>
        );
      })}
    </ScrollBook>
  );
}
