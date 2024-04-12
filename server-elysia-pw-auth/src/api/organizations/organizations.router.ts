import { Elysia } from 'elysia';

import { ensureAuthentication } from '../../globalMiddleware/authentication';
import { isUserAdminForOrganization } from '../../globalMiddleware/authorization';
import {
  createOrganization,
  createOrganizationSchema,
  deleteOrganization,
  findOrganizationsForUser,
  updateOrganization,
} from '../../models/Organization';

export const organizationsRouter = new Elysia({ prefix: '/organizations' })
  .use(ensureAuthentication)
  .get('', ({ user }) => {
    return findOrganizationsForUser(user);
  })
  .group(
    '/:organizationId',
    {
      beforeHandle: async ({ error, params, user }) => {
        const isOrganizationAdmin = await isUserAdminForOrganization(user, params.organizationId);
        if (!isOrganizationAdmin) {
          return error(401);
        }
      },
    },
    (app) =>
      app.put(
        '',
        async ({ params, body, set }) => {
          await updateOrganization({ ...body, id: params.organizationId });
          set.status = 204;
        },
        {
          body: createOrganizationSchema,
        }
      )
  )
  .group(
    '',
    {
      ensurePlatformAdmin: true,
    },
    (app) =>
      app
        .post(
          '',
          async ({ body, set }) => {
            const organization = await createOrganization(body);

            set.status = 201;
            return organization;
          },
          { body: createOrganizationSchema }
        )
        .delete('/:organizationId', async ({ params, set }) => {
          await deleteOrganization(params.organizationId);
          set.status = 204;
        })
  );
