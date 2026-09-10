import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { openDatabase } from "../src/db/database";

const database = openDatabase();

try {
  migrate(database.db, { migrationsFolder: "./drizzle" });
  console.log("Database migrations applied.");
} finally {
  database.close();
}
