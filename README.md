# Wonder · By Hila

A Hebrew RTL portfolio for Hila Orfali's handmade celebration work, presented as an animated scroll, with a private Owner Workspace and Project-bound Testimonials.

## Start here

- Read [the implementation specification](docs/specs/wonder-implementation-spec.md).
- Follow [the build sequence](docs/implementation-plan.md).
- Use [GitHub Issues](https://github.com/Finz24/wonder/issues) to coordinate work.
- The parent specification is [issue #1](https://github.com/Finz24/wonder/issues/1), labelled ready-for-agent.
- Read [repository instructions](AGENTS.md), [domain vocabulary](CONTEXT.md), and relevant [ADRs](docs/adr).

## Approved prototype

The reviewed design source, generated example images, seal, and exact generation prompts are preserved on [prototype/scroll-book](https://github.com/Finz24/wonder/tree/prototype/scroll-book/prototypes/scroll-book). It is a visual reference, with fictional content and temporary state, not the production application.

On that branch, run `node prototypes/scroll-book/serve.mjs`, then open `http://127.0.0.1:4174/` for the scroll or `http://127.0.0.1:4174/owner.html` for Hila's editor. Existing local prototype files are retained and ignored on main so the local demo can continue running.

The issue #2 foundation provides the production application shell and local durable persistence. Authentication, media storage, hosting, and the complete Portfolio experience remain later implementation tickets.

## Run the application

Wonder uses Node.js 20.9 or newer, Next.js 16, shadcn/ui with Base UI primitives, Tailwind CSS 4, and a migrated SQLite database. Wonder's framework-neutral design tokens live in `src/app/globals.css`; the React component source lives in `src/components/ui`. Copy `.env.example` to `.env` if you want to override the default local database path, then run:

```powershell
npm install
npm run dev
```

`npm run dev` applies committed migrations and inserts the clearly labelled sample Project only when it is absent. Open `http://localhost:3000`. Local database files live under `data/` and are intentionally ignored by Git.

## Verify the foundation

```powershell
npm run lint
npm run typecheck
npm run build
npm test
```

The Playwright smoke test starts the running application with a fresh database under `.scratch/`. It verifies that the persisted Published fixture is visible in Hebrew RTL and that its separate private Draft content is absent.

## Run with Docker Compose

```powershell
docker compose up --build --wait
```

Open `http://localhost:3000`. The container runs as a non-root user, applies database migrations before startup, and stores SQLite data in the `wonder-data` named volume. Stop it with `docker compose down`; add `--volumes` only when you intentionally want to remove the stored local data.

The image health check calls `/api/health`, which verifies the application can reach its database. Run the full packaging smoke test from Bash or CI with `npm run test:docker`; it uses port 3101 and deletes its isolated test volume afterward.

GitHub Actions runs quality checks, the production build, browser tests, and the Docker Compose health smoke test for pull requests and pushes to `main`.
