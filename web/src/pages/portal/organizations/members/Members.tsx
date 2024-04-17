import { OrganizationMembersContextProvider } from '../../../../contexts/OrganizationMembersContext';
import { MembersTable } from './MembersTable';

export const Members = () => {
  return (
    <OrganizationMembersContextProvider>
      <MembersTable />
    </OrganizationMembersContextProvider>
  );
};
