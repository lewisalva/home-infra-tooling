import { edenTreaty } from '@elysiajs/eden';

import type { API } from '../../../server-elysia-pw-auth/src/index';

export const client = edenTreaty<API>('/');
export const authenticatedClient = edenTreaty<API>('/', {
  $fetch: { credentials: 'include' },
});

export type Schema = API['_routes'];
