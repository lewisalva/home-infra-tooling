import { treaty } from '@elysiajs/eden';
import { describe, expect, test } from 'bun:test';

import { getAuthHeaders } from '../../../tests/utils';
import { organizationsRouter } from './organizations.router';

const organizationsApi = treaty(organizationsRouter);

//TODO: add tests for non platform admins

describe('organizations.router', () => {
  describe('get /organizations', () => {
    test('it throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi.organizations.get();

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    test('it returns list of orgs for the logged in user', async () => {
      const headers = await getAuthHeaders();

      const { status, data } = await organizationsApi.organizations.get({ headers });

      expect(status).toEqual(200);
      expect(data?.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('post /organizations', () => {
    test('it throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi.organizations.post({ name: 'Test Org' });

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    test('it creates an organization', async () => {
      const headers = await getAuthHeaders();

      const { data, status } = await organizationsApi.organizations.post(
        { name: 'Test Org' },
        { headers }
      );

      expect(status).toEqual(201);
      expect(data).toHaveProperty('id');
    });
  });

  describe('delete /organizations/:organizationId', () => {
    test('it throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi
        .organizations({ organizationId: 'someId' })
        .delete({});

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    test('it deletes an organization', async () => {
      const headers = await getAuthHeaders();

      const { data } = await organizationsApi.organizations.post({ name: 'Test Org' }, { headers });
      expect(data).toHaveProperty('id');

      const { status } = await organizationsApi
        .organizations({ organizationId: data?.id ?? '' })
        .delete({}, { headers });

      expect(status).toEqual(204);
    });
  });

  describe('put /organizations/:organizationId', () => {
    test('it throws 401 when no auth cookie is sent', async () => {
      const { status, error } = await organizationsApi
        .organizations({ organizationId: 'someId' })
        .put({
          name: 'Updated Org',
        });

      expect(status).toEqual(401);
      expect(error?.value).toEqual('Unauthorized');
    });

    test('it updates an organization', async () => {
      const headers = await getAuthHeaders();

      const { data } = await organizationsApi.organizations.post({ name: 'Test Org' }, { headers });
      expect(data).toHaveProperty('id');

      const { status } = await organizationsApi
        .organizations({ organizationId: data?.id ?? '' })
        .put({ name: 'Updated Org' }, { headers });
      expect(status).toEqual(204);
    });
  });
});
