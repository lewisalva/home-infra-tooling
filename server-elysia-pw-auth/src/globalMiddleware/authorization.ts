import { and, eq } from 'drizzle-orm';

import { usersOrganizationsTable, usersTable } from '../schema';
import db from './db';

type UserOrganization = (typeof usersOrganizationsTable)['$inferSelect'];

const fetchUser = (userId: UserOrganization['userId']) => {
  return db.query.usersTable.findFirst({ where: eq(usersTable.id, userId) });
};

const fetchUserInOrganization = ({
  userId,
  organizationId,
  shouldCheckAdmin = false,
}: {
  userId: UserOrganization['userId'];
  organizationId: UserOrganization['organizationId'];
  shouldCheckAdmin?: boolean;
}) => {
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

export const isUserProductAdmin = async (userId: UserOrganization['userId']): Promise<boolean> => {
  const user = await fetchUser(userId);
  return user?.isPlatformAdmin ?? false;
};

export const isUserAuthorizedForOrganization = async (
  userId: UserOrganization['userId'],
  organizationId: UserOrganization['organizationId']
): Promise<boolean> => {
  if (await isUserProductAdmin(userId)) {
    return true;
  }

  const result = await fetchUserInOrganization({ userId, organizationId });

  return result !== undefined;
};

export const isUserAdminForOrganization = async (
  userId: UserOrganization['userId'],
  organizationId: UserOrganization['organizationId']
): Promise<boolean> => {
  if (await isUserProductAdmin(userId)) {
    return true;
  }

  const result = await fetchUserInOrganization({ userId, organizationId, shouldCheckAdmin: true });

  return result !== undefined;
};
