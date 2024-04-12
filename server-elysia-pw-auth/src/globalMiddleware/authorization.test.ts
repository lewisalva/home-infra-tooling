import { beforeAll, describe, expect, test } from 'bun:test';
import { User } from 'lucia';

import { organizationsTable, usersOrganizationsTable, usersTable } from '../schema';
import {
  isUserAdminForOrganization,
  isUserAuthorizedForOrganization,
  isUserPlatformAdmin,
} from './authorization';
import db from './db';

describe('Authorization middleware', () => {
  let organizationId: string;
  let otherOrgId: string;
  let member: User;
  let admin: User;
  let platformAdmin: User;
  let otherMember: User;
  let otherAdmin: User;

  beforeAll(async () => {
    const organizationData = [
      {
        name: 'Test: Authorization middleware',
      },
      {
        name: 'Test: Authorization middleware - Other Org',
      },
    ];
    const usersData = [
      {
        email: 'member@org.com',
        hashedPassword: 'hashedPassword',
        name: 'member',
      },
      {
        email: 'admin@org.com',
        hashedPassword: 'hashedPassword',
        name: 'admin',
      },
      {
        email: 'platform.admin@org.com',
        hashedPassword: 'hashedPassword',
        name: 'platform admin',
        isPlatformAdmin: true,
      },
      {
        email: 'otherMember@org.com',
        hashedPassword: 'hashedPassword',
        name: 'otherMember',
      },
      {
        email: 'otherAdmin@org.com',
        hashedPassword: 'hashedPassword',
        name: 'otherAdmin',
      },
    ];

    [{ organizationId }, { organizationId: otherOrgId }] = await db
      .insert(organizationsTable)
      .values(organizationData)
      .returning({ organizationId: organizationsTable.id });

    const users = await db
      .insert(usersTable)
      .values(usersData)
      .returning({ userId: usersTable.id });

    const [
      { userId: memberId },
      { userId: adminId },
      { userId: platformAdminId },
      { userId: otherMemberId },
      { userId: otherAdminId },
    ] = users;

    member = { id: memberId, email: '', isPlatformAdmin: false };
    admin = { id: adminId, email: '', isPlatformAdmin: false };
    platformAdmin = { id: platformAdminId, email: '', isPlatformAdmin: true };
    otherMember = { id: otherMemberId, email: '', isPlatformAdmin: false };
    otherAdmin = { id: otherAdminId, email: '', isPlatformAdmin: false };

    await db.insert(usersOrganizationsTable).values([
      { userId: memberId, organizationId, permission: 'member' },
      { userId: adminId, organizationId, permission: 'admin' },
      { userId: otherMemberId, organizationId: otherOrgId, permission: 'member' },
      { userId: otherAdminId, organizationId: otherOrgId, permission: 'admin' },
    ]);
  });

  /* Access Table
  | user            | Platform Admin | Admin Access | Org Access |
  |-----------------|----------------|--------------|------------|
  | otherMember     |       🛑       |      🛑      |     🛑     |
  | otherAdmin      |       🛑       |      🛑      |     🛑     |
  | member          |       🛑       |      🛑      |     ✅     |
  | admin           |       🛑       |      ✅      |     ✅     |
  | platformAdmin   |       ✅       |      ✅      |     ✅     |
  */

  describe('isUserAuthorizedForOrganization', () => {
    test('should return true if is authorized, false otherwise', async () => {
      expect(await isUserAuthorizedForOrganization(otherMember, organizationId)).toEqual(false);
      expect(await isUserAuthorizedForOrganization(otherAdmin, organizationId)).toEqual(false);
      expect(await isUserAuthorizedForOrganization(member, organizationId)).toEqual(true);
      expect(await isUserAuthorizedForOrganization(admin, organizationId)).toEqual(true);
      expect(await isUserAuthorizedForOrganization(platformAdmin, organizationId)).toEqual(true);
    });
  });

  describe('isUserAdminForOrganization', () => {
    test('should return true if is admin, false otherwise', async () => {
      expect(await isUserAdminForOrganization(otherMember, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(otherAdmin, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(member, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(admin, organizationId)).toEqual(true);
      expect(await isUserAdminForOrganization(platformAdmin, organizationId)).toEqual(true);
    });
  });

  describe('isUserPlatformAdmin', () => {
    test('should return true if is platform admin, false otherwise', async () => {
      expect(isUserPlatformAdmin(otherMember)).toEqual(false);
      expect(isUserPlatformAdmin(otherAdmin)).toEqual(false);
      expect(isUserPlatformAdmin(member)).toEqual(false);
      expect(isUserPlatformAdmin(admin)).toEqual(false);
      expect(isUserPlatformAdmin(platformAdmin)).toEqual(true);
    });
  });
});
