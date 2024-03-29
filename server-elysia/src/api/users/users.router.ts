import { Elysia } from 'elysia';

import { authentication } from '../../globalMiddleware/authentication';

export const usersRouter = new Elysia({ prefix: '/users' })
  .use(authentication)
  .get('/me', ({ user }) => {
    return { user };
  });
