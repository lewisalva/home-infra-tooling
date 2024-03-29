import 'dotenv/config';

import { eq } from 'drizzle-orm';

import db from '../src/globalMiddleware/db';
import { practicesTable, userPracticesTable, usersTable } from '../src/schema';
const { INITIAL_ADMIN_EMAIL = '', INITIAL_ADMIN_PASS = '', INITIAL_ADMIN_NAME = '' } = process.env;
console.log(INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASS, INITIAL_ADMIN_NAME);

const initialUser = {
  name: INITIAL_ADMIN_NAME,
  email: INITIAL_ADMIN_EMAIL.toLowerCase(),
  hashedPassword: await Bun.password.hash(INITIAL_ADMIN_PASS),
};

const initialPractice = {
  name: 'Finni Health',
};

const [user] = await db.select().from(usersTable).where(eq(usersTable.email, initialUser.email));

if (user) {
  throw new Error('Initial user already exists');
}

const [{ userId }] = await db
  .insert(usersTable)
  .values(initialUser)
  .returning({ userId: usersTable.id });

const [{ practiceId }] = await db
  .insert(practicesTable)
  .values(initialPractice)
  .returning({ practiceId: practicesTable.id });

await db.insert(userPracticesTable).values({ userId, practiceId });

process.exit(0);
