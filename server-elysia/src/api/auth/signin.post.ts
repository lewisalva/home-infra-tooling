import { eq } from 'drizzle-orm';
import { Elysia, error, t } from 'elysia';

import { lucia } from '../../globalMiddleware/authentication';
import db from '../../globalMiddleware/db';
import { usersTable } from '../../schema';

export const signinPost = new Elysia().post(
  '/signin',
  async ({ body: { email, password }, cookie, set }) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()));

    if (!user || !(await Bun.password.verify(password, user.hashedPassword))) {
      return error('Not Found');
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookie[sessionCookie.name].set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });

    set.status = 204;
  },
  {
    body: t.Object({
      email: t.String({ format: 'email', error: 'Invalid email' }),
      password: t.String({ minLength: 6, error: 'Invalid password' }),
    }),
  }
);
