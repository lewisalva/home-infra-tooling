import { logger } from '@bogeychan/elysia-logger';

import env from './environment';

const devOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
} as const;

export const loggerMiddleware = logger(env.NODE_ENV !== 'production' ? devOptions : undefined);
