import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from '../schema';
import env from './environment';

const client = new Client({
  connectionString: env.PG_URL,
});
await client.connect();

const db = drizzle(client, { schema });

export default db;
