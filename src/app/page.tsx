import Image from "next/image";

import { database } from "@/db/client";
import { DrizzlePublishedProjectReader } from "@/projects/drizzle-published-project-reader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await new DrizzlePublishedProjectReader(database).listPublishedProjects();

  return (
    <main>
      <header className="masthead">
        <p className="eyebrow">Wonder · By Hila</p>
        <h1>תיק העבודות של הילה</h1>
        <p>עבודות חגיגה שנוצרו ביד, ומוצגות כאן כדי לעורר רעיון אישי משלכם.</p>
      </header>

      {projects.map((project) => {
        return (
          <article key={project.projectId} className="project" aria-labelledby={`project-${project.projectId}`}>
            <div className="sample-label">פרויקט לדוגמה</div>
            <div className="project-copy">
              <p className="project-number">פרויקט {project.portfolioPosition + 1}</p>
              <h2 id={`project-${project.projectId}`}>{project.title}</h2>
              <p>{project.description}</p>
            </div>
            <figure>
              <Image
                src={project.cover.url}
                alt={project.cover.alternativeText}
                width={720}
                height={540}
                priority
              />
              {project.cover.caption ? <figcaption>{project.cover.caption}</figcaption> : null}
            </figure>
          </article>
        );
      })}
    </main>
  );
}
