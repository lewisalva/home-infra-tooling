import { asc, eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-typebox';
import { Static } from 'elysia';

import db from '../globalMiddleware/db';
import { organizationsTable, usersOrganizationsTable } from '../schema';
import { User } from './User';

export const selectOrganizationSchema = createSelectSchema(organizationsTable);

export type Organization = Static<typeof selectOrganizationSchema>;

export const findOrganizationsForUser = (userId: User['id']) => {
  return db.query.usersOrganizationsTable.findMany({
    columns: { permission: true, userId: true },
    with: { organization: true },
    where: eq(usersOrganizationsTable.userId, userId),
    orderBy: asc(organizationsTable.updatedAt),
  });
};
