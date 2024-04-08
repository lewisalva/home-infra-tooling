import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Elysia, error } from 'elysia';
import type { Session, User } from 'lucia';
import { Lucia /*, verifyRequestOrigin*/ } from 'lucia';

import { sessionsTable, usersTable } from '../schema';
import db from './db';
import env from './environment';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, usersTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === 'PRODUCTION',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}

export const ensureAuthentication = new Elysia()
  .derive(
    { as: 'scoped' },
    async (
      context
    ): Promise<{
      user: User | null;
      session: Session | null;
    }> => {
      // if (context.request.method !== 'GET') {
      //   const originHeader = context.request.headers.get('Origin');
      //   // NOTE: You may need to use `X-Forwarded-Host` instead
      //   const hostHeader = context.request.headers.get('Host');
      //   console.log({ originHeader, hostHeader });
      //   if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      //     return {
      //       user: null,
      //       session: null,
      //     };
      //   }
      // }

      const cookieHeader = context.request.headers.get('Cookie') ?? '';
      const sessionId = lucia.readSessionCookie(cookieHeader);
      if (!sessionId) {
        return {
          user: null,
          session: null,
        };
      }

      const { session, user } = await lucia.validateSession(sessionId);
      if (session && session.fresh) {
        const sessionCookie = lucia.createSessionCookie(session.id);
        context.cookie[sessionCookie.name].set({
          value: sessionCookie.value,
          ...sessionCookie.attributes,
        });
      }
      if (!session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        context.cookie[sessionCookie.name].set({
          value: sessionCookie.value,
          ...sessionCookie.attributes,
        });
      }
      return {
        user,
        session,
      };
    }
  )
  .onBeforeHandle({ as: 'scoped' }, ({ user }) => {
    if (user === null) {
      return error('Unauthorized');
    }
  })
  .derive(
    { as: 'scoped' },
    (
      context
    ): {
      user: User;
      session: Session;
    } => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        user: context.user!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        session: context.session!,
      };
    }
  );
