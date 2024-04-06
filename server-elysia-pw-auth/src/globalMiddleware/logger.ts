import { logger } from '@bogeychan/elysia-logger';

export const loggerMiddleware = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
