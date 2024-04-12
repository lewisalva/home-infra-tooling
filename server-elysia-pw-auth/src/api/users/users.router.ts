import { Elysia } from 'elysia';

import { ensureAuthentication } from '../../globalMiddleware/authentication';
import { updateUser, updateUserSchema } from '../../models/User';

export const usersRouter = new Elysia({ prefix: '/users' })
  .use(ensureAuthentication)
  .get('/me', ({ user }) => {
    return { id: user.id, email: user.email };
  })
  .put(
    '/me',
    async ({ user, body, set }) => {
      await updateUser(user.id, body);
      set.status = 204;
    },
    { body: updateUserSchema }
  );
