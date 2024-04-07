import { Elysia } from 'elysia';

import { ensureAuthentication } from '../../globalMiddleware/authentication';
import { findOrganizationsForUser } from '../../models/Organization';

export const organizationsRouter = new Elysia({ prefix: '/organizations' })
  .use(ensureAuthentication)
  .get('', ({ user }) => {
    return findOrganizationsForUser(user.id);
  });
