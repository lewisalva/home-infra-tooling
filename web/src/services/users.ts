import { authenticatedClient, Schema } from './client';

export type UserUpdateType = Schema['api']['users']['me']['put']['body'];

export const getUser = async () => {
  const { data, status } = await authenticatedClient.api.users.me.get();

  if (status !== 200 || !data?.id) {
    return false;
  }

  return true;
};

export const putUser = async (body: UserUpdateType) => {
  const { status } = await authenticatedClient.api.users.me.put(body);

  if (status !== 204) {
    return false;
  }

  return true;
};
