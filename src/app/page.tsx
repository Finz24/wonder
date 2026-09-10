import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { database } from "@/db/client";
import { DrizzlePublishedProjectReader } from "@/projects/drizzle-published-project-reader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await new DrizzlePublishedProjectReader(database).listPublishedProjects();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-12 sm:px-8 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="font-utility text-xs font-bold tracking-[0.12em]">Wonder · By Hila</p>
        <h1 className="mt-5 font-display text-5xl leading-[0.98] text-balance sm:text-7xl">
          תיק העבודות של הילה
        </h1>
        <Separator className="mx-auto my-7 max-w-24" />
        <p className="text-lg leading-8 text-pretty text-muted-foreground">
          עבודות חגיגה שנוצרו ביד, ומוצגות כאן כדי לעורר רעיון אישי משלכם.
        </p>
      </header>

      {projects.map((project) => {
        return (
          <article
            key={project.projectId}
            className="relative mt-16"
            aria-labelledby={`project-${project.projectId}`}
          >
            <Card className="relative grid items-center gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(16rem,1.1fr)] md:[--card-spacing:--spacing(8)]">
              <Badge className="absolute end-4 top-4">פרויקט לדוגמה</Badge>
              <CardHeader className="pt-10 md:pt-8">
                <p className="font-utility text-xs font-bold tracking-[0.12em] text-muted-foreground">
                  פרויקט {project.portfolioPosition + 1}
                </p>
                <CardTitle>
                  <h2
                    id={`project-${project.projectId}`}
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
                    className="block h-auto w-full rounded-[45%_45%_1rem_1rem]"
                    src={project.cover.url}
                    alt={project.cover.alternativeText}
                    width={720}
                    height={540}
                    priority
                  />
                  {project.cover.caption ? (
                    <figcaption className="mt-3 text-sm text-muted-foreground">{project.cover.caption}</figcaption>
                  ) : null}
                </figure>
              </CardContent>
            </Card>
          </article>
        );
      })}
    </main>
  );
}
