import { Separator } from "@/components/ui/separator";
import { ProjectChapter } from "@/components/project-chapter";
import { database } from "@/db/client";
import { DrizzlePublishedProjectReader } from "@/projects/drizzle-published-project-reader";
import { isSampleProject } from "@/projects/fixtures";

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

      {projects.length === 0 ? (
        <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
          עוד לא פורסמו פרויקטים בתיק העבודות.
        </p>
      ) : (
        <section aria-label="פרקי הפרויקטים" data-portfolio-chapters>
          {projects.map((project, index) => {
            return (
              <ProjectChapter
                key={project.projectId}
                project={project}
                chapterNumber={index + 1}
                isSample={isSampleProject(project)}
              />
            );
          })}
        </section>
      )}
    </main>
  );
}
