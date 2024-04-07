import { eq } from 'drizzle-orm';
import { createSelectSchema } from 'drizzle-typebox';
import { Static, t } from 'elysia';

import { lucia } from '../globalMiddleware/authentication';
import db from '../globalMiddleware/db';
import { usersTable } from '../schema';

export const selectUserSchema = createSelectSchema(usersTable);

export const loginUserSchema = t.Object({
  email: t.String({ format: 'email', error: 'Invalid email' }),
  password: t.String({ minLength: 6, error: 'Invalid password' }),
});

export const signUpUserSchema = t.Composite([
  loginUserSchema,
  t.Object({ name: t.String({ minLength: 1, error: 'Invalid name' }) }),
]);

export type User = Static<typeof selectUserSchema>;
export type LoginUser = Static<typeof loginUserSchema>;
export type SignUpUser = Static<typeof signUpUserSchema>;

export const findUserByEmail = (email: User['email']) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.email, email.toLowerCase()),
  });
};

export const checkUserPassword = async ({ email, password }: LoginUser) => {
  const user = await findUserByEmail(email);

  if (!user || !(await Bun.password.verify(password, user.hashedPassword))) {
    return undefined;
  }

  return user;
};

export const createSessionCookie = async (userId: User['id']) => {
  const session = await lucia.createSession(userId, {});
  return lucia.createSessionCookie(session.id);
};

export const createUser = async ({ email, password, name }: SignUpUser) => {
  const hashedPassword = await Bun.password.hash(password);

  const [{ userId }] = await db
    .insert(usersTable)
    .values({ email: email.toLowerCase(), hashedPassword, name })
    .returning({ userId: usersTable.id });

  return userId;
};
