import "server-only";

import { openDatabase } from "./database";

const globalDatabase = globalThis as typeof globalThis & {
  wonderDatabase?: ReturnType<typeof openDatabase>;
};

export const database = (globalDatabase.wonderDatabase ??= openDatabase()).db;
