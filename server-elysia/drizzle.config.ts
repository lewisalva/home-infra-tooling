import type { Config } from 'drizzle-kit';

import env from './src/globalMiddleware/environment';

export default {
  schema: './src/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.PG_URL,
  },
  strict: false,
  verbose: false,
  out: './drizzle',
} satisfies Config;
