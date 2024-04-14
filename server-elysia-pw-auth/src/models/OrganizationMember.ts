import { and, eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-typebox';
import { Static, t } from 'elysia';

import db from '../globalMiddleware/db';
import { usersOrganizationsTable } from '../schema';

export const selectUserOrganizationSchema = createSelectSchema(usersOrganizationsTable);
export const createUserOrganizationSchema = t.Composite([
  t.Pick(selectUserOrganizationSchema, ['userId', 'organizationId']),
  t.Partial(t.Pick(selectUserOrganizationSchema, ['permission'])),
]);

export type UserOrganization = Static<typeof selectUserOrganizationSchema>;
export type CreateUserOrganization = Static<typeof createUserOrganizationSchema>;
export type UpdateUserOrganization = CreateUserOrganization;
export type DeleteUserOrganization = Omit<CreateUserOrganization, 'permission'>;

export const addUserToOrganization = async (body: CreateUserOrganization) => {
  console.log('addUserToOrganization', body);
  return db.insert(usersOrganizationsTable).values(body);
};

export const removeUserFromOrganization = async (body: DeleteUserOrganization) => {
  return db
    .delete(usersOrganizationsTable)
    .where(
      and(
        eq(usersOrganizationsTable.userId, body.userId),
        eq(usersOrganizationsTable.organizationId, body.organizationId)
      )
    );
};

export const findUsersInOrganization = (organizationId: UserOrganization['organizationId']) => {
  return db.query.usersOrganizationsTable.findMany({
    with: { user: true },
    where: eq(usersOrganizationsTable.organizationId, organizationId),
  });
};

export const updateUserInOrganization = async (body: UpdateUserOrganization) => {
  return db
    .update(usersOrganizationsTable)
    .set({ permission: body.permission })
    .where(
      and(
        eq(usersOrganizationsTable.userId, body.userId),
        eq(usersOrganizationsTable.organizationId, body.organizationId)
      )
    );
};
