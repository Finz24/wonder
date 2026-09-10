import { rmSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

import { E2E_DATABASE_URL } from "../tests/test-environment";

if (process.env.DATABASE_URL !== E2E_DATABASE_URL) {
  throw new Error(`Refusing to reset any database except ${E2E_DATABASE_URL}.`);
}

const testDatabasePath = resolve(E2E_DATABASE_URL.slice("file:".length));
const scratchDirectory = resolve(".scratch");
const pathFromScratchDirectory = relative(scratchDirectory, testDatabasePath);

if (pathFromScratchDirectory.startsWith("..") || isAbsolute(pathFromScratchDirectory)) {
  throw new Error("Test database resolved outside the workspace scratch directory.");
}

rmSync(testDatabasePath, { force: true });
rmSync(`${testDatabasePath}-shm`, { force: true });
rmSync(`${testDatabasePath}-wal`, { force: true });
