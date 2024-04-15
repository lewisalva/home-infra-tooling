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
  const { selectedOrganizationId } = useOrganizationContext();
  const {
    data: organizationMembers,
    // refetch: reloadOrganizationMembers,
    isLoading: isLoadingOrganizationMembers,
  } = useQuery({
    queryKey: ['organizationMembers', selectedOrganizationId],
    queryFn: () => {
      return getOrganizationMembers(selectedOrganizationId);
    },
  });

  const addOrganizationMember = useCallback(async (body: OrganizationMemberCreateType) => {
    const isSuccess = await postOrganizationMember(body);
    if (!isSuccess) throw new Error('Failed to add organization member');
  }, []);

  const updateOrganizationMember = useCallback(async (body: OrganizationMemberUpdateType) => {
    const isSuccess = await putOrganizationMember(body);
    if (!isSuccess) throw new Error('Failed to update organization member');
  }, []);

  const removeOrganizationMember = useCallback(async (body: OrganizationMemberDeleteType) => {
    const isSuccess = await deleteOrganizationMember(body);
    if (!isSuccess) throw new Error('Failed to remove organization member');
  }, []);

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
