import { defineConfig, devices } from "@playwright/test";

import { E2E_DATABASE_URL } from "./tests/test-environment";

// Configurable port so parallel workers do not collide. Default stays 3100.
const E2E_PORT = Number.parseInt(process.env.E2E_PORT ?? "3100", 10);
const baseURL = `http://127.0.0.1:${E2E_PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run db:reset:test && npm run dev -- --hostname 127.0.0.1 --port ${E2E_PORT}`,
    url: baseURL,
    env: { ...process.env, DATABASE_URL: E2E_DATABASE_URL },
    reuseExistingServer: false,
    stdout: "pipe",
    stderr: "pipe",
  },
});
