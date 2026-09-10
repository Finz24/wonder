# Bootstrap the production application with Next.js and SQLite

## Decision

Bootstrap Wonder as a TypeScript Next.js 16 App Router application. Render server-owned data in Server Components using the Node.js runtime. Persist the first Project in SQLite through Drizzle ORM and versioned SQL migrations. Exercise the running application with Playwright against an isolated SQLite file.

Keep Project contracts independent of Next.js and Drizzle. Public readers expose only Published Projects; owner reads and mutations require an `OwnerAuthorization` value. Draft and Published versions are separate contracts and separate tables so a saved Draft cannot silently replace public content.

Use labelled fixture adapters and a clearly labelled stored sample Project until Hila supplies launch content. Authentication, media storage, and hosting remain explicit later decisions; their adapters must preserve these contracts and access boundaries.

## Context

Issue #2 needs the smallest runnable foundation that stores and displays one Published Project while public and owner work continue independently. Wonder inherits no earlier technical stack. Current Next.js documentation supports querying a database directly from a Server Component and requires Node.js 20.9 or newer. Current Drizzle documentation supports SQLite with `better-sqlite3` and versioned migrations. Current Playwright documentation supports starting the application under test with isolated environment variables.

SQLite keeps this first increment durable and locally runnable without committing to a hosting provider. A deployment that cannot provide durable local storage will replace the persistence adapter before core release.
