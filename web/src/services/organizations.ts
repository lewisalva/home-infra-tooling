import { authenticatedClient, Schema } from './client';

export type OrganizationsType = Schema['api']['organizations']['get']['response']['200'];
export type OrganizationType = OrganizationsType[number];
export type OrganizationCreateType = Schema['api']['organizations']['post']['body'];
export type OrganizationUpdateType =
  Schema['api']['organizations'][':organizationId']['put']['body'];

export const getOrganization = async () => {
  const { data, status } = await authenticatedClient.api.organizations.get();

  if (status !== 200 || !data) {
    return [];
  }

  return data;
};

export const postOrganization = async (body: OrganizationCreateType) => {
  const { data, status } = await authenticatedClient.api.organizations.post(body);

  if (status !== 201) {
    return undefined;
  }

  return data?.id;
};

export const putOrganization = async (organizationId: string, body: OrganizationUpdateType) => {
  const { status } = await authenticatedClient.api.organizations({ organizationId }).put(body);

  if (status !== 204) {
    return false;
  }

  return true;
};
