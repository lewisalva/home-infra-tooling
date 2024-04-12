import { beforeAll, describe, expect, test } from 'bun:test';

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
  let memberId: string;
  let adminId: string;
  let platformAdminId: string;
  let otherMemberId: string;
  let otherAdminId: string;

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

    [
      { userId: memberId },
      { userId: adminId },
      { userId: platformAdminId },
      { userId: otherMemberId },
      { userId: otherAdminId },
    ] = users;

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
      expect(await isUserAuthorizedForOrganization(otherMemberId, organizationId)).toEqual(false);
      expect(await isUserAuthorizedForOrganization(otherAdminId, organizationId)).toEqual(false);
      expect(await isUserAuthorizedForOrganization(memberId, organizationId)).toEqual(true);
      expect(await isUserAuthorizedForOrganization(adminId, organizationId)).toEqual(true);
      expect(await isUserAuthorizedForOrganization(platformAdminId, organizationId)).toEqual(true);
    });
  });

  describe('isUserAdminForOrganization', () => {
    test('should return true if is admin, false otherwise', async () => {
      expect(await isUserAdminForOrganization(otherMemberId, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(otherAdminId, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(memberId, organizationId)).toEqual(false);
      expect(await isUserAdminForOrganization(adminId, organizationId)).toEqual(true);
      expect(await isUserAdminForOrganization(platformAdminId, organizationId)).toEqual(true);
    });
  });

  describe('isUserPlatformAdmin', () => {
    test('should return true if is platform admin, false otherwise', async () => {
      expect(await isUserPlatformAdmin(otherMemberId)).toEqual(false);
      expect(await isUserPlatformAdmin(otherAdminId)).toEqual(false);
      expect(await isUserPlatformAdmin(memberId)).toEqual(false);
      expect(await isUserPlatformAdmin(adminId)).toEqual(false);
      expect(await isUserPlatformAdmin(platformAdminId)).toEqual(true);
    });
  });
});
