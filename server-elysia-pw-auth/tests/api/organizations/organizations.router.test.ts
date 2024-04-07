import { treaty } from '@elysiajs/eden';
import { describe, expect, it } from 'bun:test';

import { organizationsRouter } from '../../../src/api/organizations/organizations.router';
import { getAuthHeaders } from '../../utils';

const organizationsApi = treaty(organizationsRouter);

describe('organizations.router', () => {
  describe('get', () => {
    it('throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi.organizations.get();

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    it('returns list of orgs for the logged in user', async () => {
      const headers = await getAuthHeaders();

      const { status, data } = await organizationsApi.organizations.get({ headers });

      expect(status).toEqual(200);
      expect(data).toHaveLength(1);
    });
  });
});
