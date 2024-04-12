import { treaty } from '@elysiajs/eden';

import type { API } from '../../../server-elysia-pw-auth/src/index';

export const client = treaty<API>('http://localhost/');
export const authenticatedClient = treaty<API>('http://localhost/', {
  fetch: { credentials: 'include' },
});

export type Schema = API['_routes'];
