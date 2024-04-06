import { and, eq } from 'drizzle-orm';

import { usersOrganizationsTable } from '../schema';
import db from './db';

const fetchUserInOrganization = (
  userId: typeof usersOrganizationsTable.userId.dataType,
  organizationId: typeof usersOrganizationsTable.organizationId.dataType,
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
  userId: typeof usersOrganizationsTable.userId.dataType,
  organizationId: typeof usersOrganizationsTable.organizationId.dataType
): Promise<boolean> => {
  const result = await fetchUserInOrganization(userId, organizationId);

  return result !== undefined;
};

export const isUserAdminForOrganization = async (
  userId: typeof usersOrganizationsTable.userId.dataType,
  organizationId: typeof usersOrganizationsTable.organizationId.dataType
): Promise<boolean> => {
  const result = await fetchUserInOrganization(userId, organizationId, true);

  return result !== undefined;
};
