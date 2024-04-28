import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { runSeeds } from '../seeds';
import db, { pgClient } from '../src/globalMiddleware/db';
import { organizationsTable, usersOrganizationsTable, usersTable } from '../src/schema';

beforeAll(async () => {
  await migrate(db, { migrationsFolder: 'drizzle' });
  await runSeeds();
});

afterAll(async () => {
  await db.delete(usersOrganizationsTable);
  await db.delete(usersTable);
  await db.delete(organizationsTable);
  await pgClient.end();
});
