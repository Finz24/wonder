# Wonder repository instructions

Wonder is a clean-slate Hebrew RTL portfolio for Hila's creator-made physical celebration work. Read `CONTEXT.md` and relevant ADRs before making domain decisions; use its defined vocabulary in issues, specifications, tests, and implementation discussions.

## Agent skills

### Issue tracker

Issues and specifications are managed in the public GitHub repository `Finz24/wonder` using GitHub Issues and the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the canonical labels `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository: read root `CONTEXT.md` and relevant ADRs under `docs/adr/`. See `docs/agents/domain.md`.

## Documentation lookup

When a task concerns a library, framework, SDK, API, CLI tool, or cloud service, use Context7 MCP first. Begin with `resolve-library-id`, select the best matching official documentation source, then use `query-docs` for each distinct concept. Do this even for familiar or well-known tools because documentation and syntax may have changed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
