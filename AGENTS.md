# Wonder repository instructions

Wonder New is a clean-slate Hebrew RTL portfolio for Hila's creator-made physical celebration work. Read `CONTEXT.md` and relevant ADRs before making domain decisions; use its defined vocabulary in issues, specifications, tests, and implementation discussions.

## Agent skills

### Issue tracker

Issues and specifications are managed in the public GitHub repository `Finz24/wonder` using GitHub Issues and the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the canonical labels `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository: read root `CONTEXT.md` and relevant ADRs under `docs/adr/`. See `docs/agents/domain.md`.

## Documentation lookup

When a task concerns a library, framework, SDK, API, CLI tool, or cloud service, use Context7 MCP first. Begin with `resolve-library-id`, select the best matching official documentation source, then use `query-docs` for each distinct concept. Do this even for familiar or well-known tools because documentation and syntax may have changed.
