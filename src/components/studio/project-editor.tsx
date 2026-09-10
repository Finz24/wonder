import type { RefObject } from "react";

import { cn } from "@/lib/utils";
import {
  DESCRIPTION_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  type DemoFieldErrors,
  type DemoProject,
  type DemoProjectFields,
} from "@/studio/demo-fixture-adapter";

import { STUDIO_FOCUS_RING } from "./studio-theme";

type ProjectEditorProps = Readonly<{
  project: DemoProject;
  fields: DemoProjectFields;
  errors: DemoFieldErrors;
  saveError: string | null;
  statusText: string;
  titleInputRef: RefObject<HTMLInputElement | null>;
  onChange: (fields: DemoProjectFields) => void;
  onSave: () => void;
}>;

const inputClassName = cn(
  "mt-2 block w-full rounded-md border border-input bg-card px-4 py-3 font-body text-base leading-8",
  STUDIO_FOCUS_RING,
);

export function ProjectEditor({ project, fields, errors, saveError, statusText, titleInputRef, onChange, onSave }: ProjectEditorProps) {
  return (
    <section aria-labelledby="demo-editor-heading" className="min-w-0 rounded-md border border-border bg-card p-6 shadow-xs sm:p-8">
      <div className="border-b border-border pb-5">
        <p className="font-utility text-xs font-bold tracking-[0.12em] text-muted-foreground">על שולחן העבודה</p>
        <h2 id="demo-editor-heading" className="mt-2 font-display text-3xl leading-tight">
          {project.title || "פרויקט חדש"}
        </h2>
      </div>

      <form
        className="mt-6"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSave();
        }}
      >
        <label htmlFor="demo-project-title" className="block font-utility text-sm font-bold">
          שם הפרויקט
          <input
            id="demo-project-title"
            name="title"
            type="text"
            required
            maxLength={TITLE_MAX_LENGTH}
            autoComplete="off"
            ref={titleInputRef}
            value={fields.title}
            onChange={(event) => onChange({ ...fields, title: event.target.value })}
            aria-invalid={errors.title ? "true" : undefined}
            aria-describedby={errors.title ? "demo-title-error" : undefined}
            className={inputClassName}
          />
        </label>
        {errors.title ? (
          <p id="demo-title-error" role="alert" className="mt-2 font-utility text-sm text-destructive">
            {errors.title}
          </p>
        ) : null}

        <label htmlFor="demo-project-description" className="mt-6 block font-utility text-sm font-bold">
          הסיפור שלך
          <textarea
            id="demo-project-description"
            name="description"
            required
            rows={5}
            maxLength={DESCRIPTION_MAX_LENGTH}
            value={fields.description}
            onChange={(event) => onChange({ ...fields, description: event.target.value })}
            aria-invalid={errors.description ? "true" : undefined}
            aria-describedby={errors.description ? "demo-description-error" : "demo-description-hint"}
            className={cn(inputClassName, "min-h-28 resize-y")}
          />
        </label>
        <p id="demo-description-hint" className="mt-2 font-utility text-xs leading-6 text-muted-foreground">
          כתבי בקול שלך, בגוף ראשון — מה יצרת ומה הופך את זה למיוחד?
        </p>
        {errors.description ? (
          <p id="demo-description-error" role="alert" className="mt-2 font-utility text-sm text-destructive">
            {errors.description}
          </p>
        ) : null}

        {saveError ? (
          <p role="alert" className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 font-utility text-sm">
            {saveError}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <button
            id="demo-save-draft"
            type="submit"
            className={cn(
              "rounded-md bg-primary px-5 py-3 font-utility text-sm font-bold text-primary-foreground",
              STUDIO_FOCUS_RING,
            )}
          >
            שמירת טיוטה (הדגמה)
          </button>
          <span id="demo-save-status" role="status" aria-live="polite" className="font-utility text-xs text-muted-foreground">
            {statusText}
          </span>
        </div>
      </form>
    </section>
  );
}
