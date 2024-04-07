import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { authRouter } from './api/auth/auth.router';
import { organizationsRouter } from './api/organizations/organizations.router';
import { usersRouter } from './api/users/users.router';
import env from './globalMiddleware/environment';
import { loggerMiddleware } from './globalMiddleware/logger';

export const app = new Elysia({ prefix: '/api' })
  .use(loggerMiddleware)
  .use(cors())
  .use(swagger())
  .use(authRouter)
  .use(usersRouter)
  .use(organizationsRouter)
  .onError(({ error }) => {
    console.error(error.stack, 'Uncaught Error');
    return error;
  })
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type API = typeof app;
