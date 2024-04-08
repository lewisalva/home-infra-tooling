import { treaty } from '@elysiajs/eden';
import { describe, expect, test } from 'bun:test';

import { getAuthHeaders } from '../../../tests/utils';
import { organizationsRouter } from './organizations.router';

const organizationsApi = treaty(organizationsRouter);

describe('organizations.router', () => {
  describe('get', () => {
    test('it throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi.organizations.get();

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    test('it returns list of orgs for the logged in user', async () => {
      const headers = await getAuthHeaders();

      const { status, data } = await organizationsApi.organizations.get({ headers });

      expect(status).toEqual(200);
      expect(data).toHaveLength(1);
    });
  });
});
