"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ProjectList } from "@/components/studio/project-list";
import { ProjectEditor } from "@/components/studio/project-editor";
import { MediaSlot, PreviewSlot } from "@/components/studio/integration-slots";
import {
  createDemoStudio,
  validateDemoProjectFields,
  type DemoFieldErrors,
  type DemoProject,
  type DemoProjectFields,
} from "@/studio/demo-fixture-adapter";
import { assertDemoOnlySurface } from "@/studio/owner-guard-seam";

function fieldsOf(project: DemoProject): DemoProjectFields {
  return { title: project.title, description: project.description };
}

function savedTimestamp(): string {
  return new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function StudioDemoClient() {
  // Demo-only: no Server Actions, no Route Handler mutations, no database
  // access. See `@/studio/owner-guard-seam` before adding anything durable.
  assertDemoOnlySurface({ performsServerMutations: false });

  const [studio] = useState(createDemoStudio);
  const [projects, setProjects] = useState<DemoProject[]>(() => studio.listProjects());
  const [selectedId, setSelectedId] = useState<string | null>(() => studio.listProjects()[0]?.id ?? null);
  const [working, setWorking] = useState<Readonly<Record<string, DemoProjectFields>>>({});
  const [fieldErrors, setFieldErrors] = useState<DemoFieldErrors>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Readonly<Record<string, string>>>({});
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const pendingFocusRef = useRef<string | null>(null);

  useEffect(() => {
    if (pendingFocusRef.current !== null && pendingFocusRef.current === selectedId) {
      pendingFocusRef.current = null;
      titleInputRef.current?.focus();
    }
  }, [selectedId]);

  const selected = useMemo(
    () => projects.find((project) => project.id === selectedId) ?? null,
    [projects, selectedId],
  );
  const fields = selected ? (working[selected.id] ?? fieldsOf(selected)) : null;
  const unsavedIds = useMemo(() => new Set(Object.keys(working)), [working]);

  function handleChange(next: DemoProjectFields) {
    if (!selected) return;
    setWorking((previous) => ({ ...previous, [selected.id]: next }));
    setSaveError(null);
  }

  function handleSave() {
    if (!selected || !fields) return;
    const errors = validateDemoProjectFields(fields);
    if (errors.title ?? errors.description) {
      setFieldErrors(errors);
      setSaveError("השמירה בהדגמה נכשלה — יש לתקן את השדות המסומנים.");
      return;
    }
    try {
      studio.updateProject(selected.id, fields);
    } catch (error) {
      setFieldErrors({});
      setSaveError(error instanceof Error ? error.message : "השמירה בהדגמה נכשלה.");
      return;
    }
    setProjects(studio.listProjects());
    setWorking((previous) => {
      const next = { ...previous };
      delete next[selected.id];
      return next;
    });
    setFieldErrors({});
    setSaveError(null);
    setSavedAt((previous) => ({ ...previous, [selected.id]: savedTimestamp() }));
  }

  function handleCreate() {
    const created = studio.createProject();
    setProjects(studio.listProjects());
    setSelectedId(created.id);
    setFieldErrors({});
    setSaveError(null);
    pendingFocusRef.current = created.id;
  }

  const statusText = !selected
    ? "אין פרויקט נבחר"
    : working[selected.id]
      ? "יש שינויים שטרם נשמרו"
      : savedAt[selected.id]
        ? `נשמר בהדגמה · ${savedAt[selected.id]} · האתר הציבורי לא השתנה`
        : "הכול מוכן לעריכה";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        unsavedIds={unsavedIds}
        onSelect={(id) => {
          setSelectedId(id);
          setFieldErrors({});
          setSaveError(null);
        }}
        onCreate={handleCreate}
      />

      <div className="min-w-0">
        {selected && fields ? (
          <>
            <ProjectEditor
              project={selected}
              fields={fields}
              errors={fieldErrors}
              saveError={saveError}
              statusText={statusText}
              titleInputRef={titleInputRef}
              onChange={handleChange}
              onSave={handleSave}
            />
            <MediaSlot project={selected} />
            <PreviewSlot project={selected} fields={fields} />
          </>
        ) : (
          <p role="status" className="font-utility text-sm text-muted-foreground">
            צרי פרויקט חדש כדי להתחיל לערוך בהדגמה.
          </p>
        )}
      </div>
    </div>
  );
}
