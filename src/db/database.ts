import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

import * as schema from "./schema";

function databasePath(databaseUrl: string): string {
  const path = databaseUrl.startsWith("file:") ? databaseUrl.slice("file:".length) : databaseUrl;
  if (!path) throw new Error("DATABASE_URL must identify a SQLite file.");
  return resolve(path);
}

export function openDatabase(databaseUrl = process.env.DATABASE_URL ?? "file:./data/wonder.sqlite") {
  const path = databasePath(databaseUrl);
  mkdirSync(dirname(path), { recursive: true });

  const sqlite = new Database(path);
  sqlite.pragma("foreign_keys = ON");

  return {
    db: drizzle(sqlite, { schema }),
    close: () => sqlite.close(),
  };
}

export type WonderDatabase = ReturnType<typeof openDatabase>["db"];
