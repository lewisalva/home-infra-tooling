import { asc, eq } from 'drizzle-orm';
import { Elysia } from 'elysia';

import { ensureAuthentication } from '../../globalMiddleware/authentication';
import db from '../../globalMiddleware/db';
import { organizationsTable, usersOrganizationsTable } from '../../schema';

export const organizationsRouter = new Elysia({ prefix: '/organizations' })
  .use(ensureAuthentication)
  .get('', ({ user }) => {
    return db.query.usersOrganizationsTable.findMany({
      columns: { permission: true, userId: true },
      with: { organization: true },
      where: eq(usersOrganizationsTable.userId, user.id),
      orderBy: asc(organizationsTable.updatedAt),
    });
  });
