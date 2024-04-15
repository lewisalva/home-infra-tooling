import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';

import {
  deleteOrganizationMember,
  getOrganizationMembers,
  OrganizationMemberCreateType,
  OrganizationMemberDeleteType,
  OrganizationMembersType,
  OrganizationMemberUpdateType,
  postOrganizationMember,
  putOrganizationMember,
} from '../services/organizationMembers';
import { useOrganizationContext } from './useOrganizationContext';

export type OrganizationMembersContextType = {
  selectedOrganizationMemberId?: string;
  setSelectedOrganizationMemberId: (id: string) => void;
  organizationMembers?: OrganizationMembersType;
  isLoadingOrganizationMembers: boolean;
  addOrganizationMember: (body: OrganizationMemberCreateType) => void;
  updateOrganizationMember: (body: OrganizationMemberUpdateType) => void;
  removeOrganizationMember: (body: OrganizationMemberDeleteType) => void;
};

type Props = {
  children: React.ReactNode;
};

export const OrganizationMembersContext = createContext<OrganizationMembersContextType | null>(
  null
);

export const OrganizationMembersContextProvider = ({ children }: Props) => {
  const [selectedOrganizationMemberId, setSelectedOrganizationMemberId] = useState<
    string | undefined
  >(undefined);
  const { selectedOrganization } = useOrganizationContext();
  const {
    data: organizationMembers,
    refetch: reloadOrganizationMembers,
    isLoading: isLoadingOrganizationMembers,
  } = useQuery({
    queryKey: ['organizationMembers', selectedOrganization?.id],
    queryFn: () => {
      if (selectedOrganization) {
        return getOrganizationMembers(selectedOrganization?.id);
      }
      return [];
    },
  });

  const addOrganizationMember = useCallback(
    async (body: OrganizationMemberCreateType) => {
      await postOrganizationMember(body);
      reloadOrganizationMembers();
    },
    [reloadOrganizationMembers]
  );

  const updateOrganizationMember = useCallback(
    async (body: OrganizationMemberUpdateType) => {
      await putOrganizationMember(body);
      reloadOrganizationMembers();
    },
    [reloadOrganizationMembers]
  );

  const removeOrganizationMember = useCallback(
    async (body: OrganizationMemberDeleteType) => {
      await deleteOrganizationMember(body);
      reloadOrganizationMembers();
    },
    [reloadOrganizationMembers]
  );

  const defaultValue: OrganizationMembersContextType = {
    selectedOrganizationMemberId,
    setSelectedOrganizationMemberId,
    organizationMembers,
    isLoadingOrganizationMembers,
    addOrganizationMember,
    updateOrganizationMember,
    removeOrganizationMember,
  };

  return (
    <OrganizationMembersContext.Provider value={defaultValue}>
      {children}
    </OrganizationMembersContext.Provider>
  );
};
