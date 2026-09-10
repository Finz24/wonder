/**
 * Owner-guard integration seam for the themed Project editor (issue #8).
 *
 * Issue #7 owns Hila-only sign-in and the reusable server/request owner guard.
 * This demo route performs ZERO durable editorial operations: it never calls a
 * Server Action, Route Handler mutation, or the database. All editing state
 * lives in browser memory through the temporary fixture adapter
 * (`./demo-fixture-adapter`) and resets on reload.
 *
 * Integration contract for the real Owner Workspace (issues #7 and #9):
 *
 * 1. Every durable operation (save Draft, publish, archive, reorder, upload)
 *    must call the issue #7 owner guard at the server/request boundary first
 *    and return 401 for unauthenticated requests and 403 for insufficient
 *    permissions — hidden UI alone is not protection.
 * 2. Client editor components in `@/components/studio` stay presentational:
 *    they receive data and callbacks and never import `server-only` modules.
 * 3. When the guarded workspace lands, this `/studio/demo` route is deleted;
 *    it must never be linked from public pages nor mistaken for protection.
 */

export const OWNER_GUARD_SEAM_ISSUE_URL = "https://github.com/Finz24/wonder/issues/7";
export const DURABLE_DRAFTS_ISSUE_URL = "https://github.com/Finz24/wonder/issues/9";

/**
 * Runtime marker that the current surface is demo-only. It throws if anyone
 * reuses demo helpers in a context that claims durability, so a future
 * refactor fails loudly instead of silently shipping unprotected writes.
 */
export function assertDemoOnlySurface(options: Readonly<{ performsServerMutations: boolean }>): void {
  if (options.performsServerMutations) {
    throw new Error(
      `Unprotected durable editorial operation blocked: route the mutation through the owner guard (${OWNER_GUARD_SEAM_ISSUE_URL}) first.`,
    );
  }
}
