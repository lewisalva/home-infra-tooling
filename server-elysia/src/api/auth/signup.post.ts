import { Elysia, error, t } from 'elysia';

import { lucia } from '../../globalMiddleware/authentication';
import db from '../../globalMiddleware/db';
import { usersTable } from '../../schema';

export const signupPost = new Elysia().post(
  '/signup',
  async ({ body: { email, name, password }, cookie, set }) => {
    const hashedPassword = await Bun.password.hash(password);

    try {
      const [{ userId }] = await db
        .insert(usersTable)
        .values({ email: email.toLowerCase(), name, hashedPassword })
        .returning({ userId: usersTable.id });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      set.status = 201;
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes('duplicate key value violates unique constraint')
      ) {
        return error(409);
      }

      console.log(err);
      return error(500);
    }
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1, error: 'Invalid name' }),
      email: t.String({ format: 'email', error: 'Invalid email' }),
      password: t.String({ minLength: 6, error: 'Invalid password' }),
    }),
  }
);
