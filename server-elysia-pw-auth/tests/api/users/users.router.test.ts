import { treaty } from '@elysiajs/eden';
import { describe, expect, it } from 'bun:test';

import { usersRouter } from '../../../src/api/users/users.router';
import { getAuthHeaders } from '../../utils';

const usersApi = treaty(usersRouter);

describe('users.router', () => {
  describe('me.get', () => {
    it('throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await usersApi.users.me.get();

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });
  });

  it('returns with user id', async () => {
    const headers = await getAuthHeaders();
    const { status, data } = await usersApi.users.me.get({ headers });

    expect(status).toEqual(200);
    expect(data?.user.email).toEqual('lewis@j1.support');
  });
});
