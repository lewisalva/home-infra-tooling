import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from '../schema';
import env from './environment';

export const pgClient = new Client({
  connectionString: env.PG_URL,
});
await pgClient.connect();

const db = drizzle(pgClient, { schema });

export default db;
