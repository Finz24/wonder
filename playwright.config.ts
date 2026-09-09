import { defineConfig, devices } from "@playwright/test";

import { E2E_DATABASE_URL } from "./tests/test-environment";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run db:reset:test && npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    env: { ...process.env, DATABASE_URL: E2E_DATABASE_URL },
    reuseExistingServer: false,
    stdout: "pipe",
    stderr: "pipe",
  },
});
