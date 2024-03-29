import { and, eq } from 'drizzle-orm';

import { usersOrganizationsTable } from '../schema';
import db from './db';

export const isUserAuthorizedForPractice = async (userId: string, organizationId: string) => {
  const result = await db.query.usersOrganizationsTable.findFirst({
    where: and(
      eq(usersOrganizationsTable.userId, userId),
      eq(usersOrganizationsTable.organizationId, organizationId)
    ),
  });

  return result !== undefined;
};
