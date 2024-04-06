import { authenticatedClient, Schema } from './client';

export type OrganizationsType = Schema['api']['organizations']['get']['response']['200'];
export type PracticeType = OrganizationsType[number];

export const getOrganizations = async () => {
  const { data, status } = await authenticatedClient.api.organizations.get();

  if (status !== 200 || !data) {
    return [];
  }

  return data;
};
