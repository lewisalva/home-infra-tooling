import { Elysia } from 'elysia';

import { ensureAuthentication } from '../../globalMiddleware/authentication';

export const usersRouter = new Elysia({ prefix: '/users' })
  .use(ensureAuthentication)
  .get('/me', ({ user }) => {
    return { user };
  });
