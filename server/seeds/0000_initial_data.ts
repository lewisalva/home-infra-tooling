import 'dotenv/config';

import { eq } from 'drizzle-orm';

import db from '../src/globalMiddleware/db';
import { organizationsTable, usersOrganizationsTable, usersTable } from '../src/schema';

const {
  INITIAL_ADMIN_EMAIL = '',
  INITIAL_ADMIN_PASS = '',
  INITIAL_ADMIN_NAME = '',
  INITIAL_ORG = 'J1Support',
} = process.env;

export const initial_data = async () => {
  const initialUser: (typeof usersTable)['$inferInsert'] = {
    name: INITIAL_ADMIN_NAME,
    email: INITIAL_ADMIN_EMAIL.toLowerCase(),
    hashedPassword: await Bun.password.hash(INITIAL_ADMIN_PASS),
    isPlatformAdmin: true,
  };

  const initialOrganization: (typeof organizationsTable)['$inferInsert'] = {
    name: INITIAL_ORG,
  };

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, initialUser.email));

  if (user) {
    return new Error('Initial user already exists');
  }

  const [{ userId }] = await db
    .insert(usersTable)
    .values(initialUser)
    .returning({ userId: usersTable.id });

  const [{ organizationId }] = await db
    .insert(organizationsTable)
    .values(initialOrganization)
    .returning({ organizationId: organizationsTable.id });

  await db.insert(usersOrganizationsTable).values({ userId, organizationId, permission: 'admin' });
};
