import { and, eq } from 'drizzle-orm';

import { usersOrganizationsTable, usersTable } from '../schema';
import db from './db';

const fetchUser = (userId: (typeof usersOrganizationsTable)['$inferSelect']['userId']) => {
  return db.query.usersTable.findFirst({ where: eq(usersTable.id, userId) });
};

const fetchUserInOrganization = (
  userId: (typeof usersOrganizationsTable)['$inferSelect']['userId'],
  organizationId: (typeof usersOrganizationsTable)['$inferSelect']['organizationId'],
  shouldCheckAdmin = false
) => {
  const filters = [
    eq(usersOrganizationsTable.userId, userId),
    eq(usersOrganizationsTable.organizationId, organizationId),
  ];

  if (shouldCheckAdmin) {
    filters.push(eq(usersOrganizationsTable.permission, 'admin'));
  }

  return db.query.usersOrganizationsTable.findFirst({
    where: and(...filters),
    columns: {
      userId: true,
    },
  });
};

export const isUserAuthorizedForOrganization = async (
  userId: (typeof usersOrganizationsTable)['$inferSelect']['userId'],
  organizationId: (typeof usersOrganizationsTable)['$inferSelect']['organizationId']
): Promise<boolean> => {
  const result = await fetchUserInOrganization(userId, organizationId);

  return result !== undefined;
};

export const isUserAdminForOrganization = async (
  userId: (typeof usersOrganizationsTable)['$inferSelect']['userId'],
  organizationId: (typeof usersOrganizationsTable)['$inferSelect']['organizationId']
): Promise<boolean> => {
  const result = await fetchUserInOrganization(userId, organizationId, true);

  return result !== undefined;
};

export const isUserProductAdmin = async (
  userId: (typeof usersOrganizationsTable)['$inferSelect']['userId']
): Promise<boolean> => {
  const user = await fetchUser(userId);
  return user?.isPlatformAdmin ?? false;
};
