import { treaty } from '@elysiajs/eden';

import { authRouter } from '../src/api/auth/auth.router';

const authApi = treaty(authRouter);

const authHeaders = new Headers();

export const getAuthHeaders = async () => {
  if (!authHeaders.has('cookie')) {
    const { headers } = await authApi.auth.signin.post({
      email: 'lewis@j1.support',
      password: '123456',
    });

    const [cookie] = (headers as Headers).getSetCookie();

    authHeaders.set('cookie', cookie);
  }

  return Object.fromEntries(authHeaders);
};
