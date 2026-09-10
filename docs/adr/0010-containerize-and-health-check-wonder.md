# Containerize and health-check Wonder

## Decision

Build Wonder with a multi-stage Dockerfile and run the production Next.js server as the image's non-root `node` user. Persist SQLite data in a named Compose volume. Apply committed migrations and the idempotent sample seed before the server starts.

Expose `/api/health` as an uncached readiness check that verifies both the Next.js request path and access to the local database. Define the image health check in the Dockerfile so it travels with the image; Compose inherits it and waits for `healthy` during the smoke test.

Run linting, type checking, production build, browser tests, production-dependency audit, and the Compose health smoke test in GitHub Actions. The container test owns an isolated Compose project and removes its containers and volume afterward.

## Context

Docker's current guidance recommends multi-stage Node.js builds, non-root runtime users, and named volumes for persistent data. `docker compose up --wait` waits until services are running or healthy and returns a failing exit code when startup fails. This makes a Compose smoke test useful for catching packaging, migration, permissions, port, and startup failures that application-only tests cannot see.

The Compose test is a focused packaging test, not a replacement for faster application tests. A later orchestrated deployment may need separate liveness and readiness probes and an external migration job.
