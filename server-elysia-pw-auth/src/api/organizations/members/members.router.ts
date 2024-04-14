import Elysia from 'elysia';

import { ensureAuthentication } from '../../../globalMiddleware/authentication';
import { isUserAdminForOrganization } from '../../../globalMiddleware/authorization';
import {
  addUserToOrganization,
  createUserOrganizationSchema,
  findUsersInOrganization,
  removeUserFromOrganization,
  updateUserInOrganization,
} from '../../../models/OrganizationMember';

export const membersRouter = new Elysia().use(ensureAuthentication).group(
  '/:organizationId/members',
  {
    beforeHandle: async ({ error, params, user }) => {
      const isOrganizationAdmin = await isUserAdminForOrganization(user, params.organizationId);
      if (!isOrganizationAdmin) {
        return error(401);
      }
    },
  },
  (app) =>
    app
      .get('', ({ params }) => {
        return findUsersInOrganization(params.organizationId);
      })
      .post(
        '',
        async ({ body, error, params, set }) => {
          if (body.organizationId !== params.organizationId) {
            return error(400);
          }

          await addUserToOrganization({ ...body, organizationId: params.organizationId });

          set.status = 201;
        },
        { body: createUserOrganizationSchema }
      )
      .delete('/:userId', async ({ params, set }) => {
        await removeUserFromOrganization({
          userId: params.userId,
          organizationId: params.organizationId,
        });

        set.status = 204;
      })
      .put(
        '/:userId',
        async ({ body, error, params, set }) => {
          if (body.organizationId !== params.organizationId || body.userId !== params.userId) {
            return error(400);
          }

          await updateUserInOrganization(body);

          set.status = 204;
        },
        { body: createUserOrganizationSchema }
      )
);
