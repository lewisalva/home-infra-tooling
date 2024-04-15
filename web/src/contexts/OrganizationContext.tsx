import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useState } from 'react';

import {
  getOrganizations,
  OrganizationCreateType,
  OrganizationsType,
  postOrganization,
} from '../services/organizations';

export type OrganizationContextType = {
  selectedOrganizationId: string;
  selectedOrganizationName: string;
  organizations: OrganizationsType;
  setSelectedOrganization: (id: string, name: string) => void;
  createOrganization: (body: OrganizationCreateType) => void;
};

type Props = {
  children: React.ReactNode;
};

export const OrganizationContext = createContext<OrganizationContextType | null>(null);

export const OrganizationContextProvider = ({ children }: Props) => {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState('');
  const [selectedOrganizationName, setSelectedOrganizationName] = useState('');
  const { data: organizations, refetch } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => getOrganizations(),
    initialData: [],
  });

  const setSelectedOrganization = useCallback((id: string, name: string) => {
    setSelectedOrganizationId(id);
    setSelectedOrganizationName(name);
  }, []);

  const createOrganization = useCallback(
    async ({ name }: OrganizationCreateType) => {
      const orgId = await postOrganization({ name });
      if (!orgId) throw new Error('Failed to create organization');
      refetch();

      setSelectedOrganization(orgId, name);
    },
    [setSelectedOrganization, refetch]
  );

  const defaultValue: OrganizationContextType = {
    selectedOrganizationId,
    selectedOrganizationName,
    organizations,
    setSelectedOrganization,
    createOrganization,
  };

  return (
    <OrganizationContext.Provider value={defaultValue}>{children}</OrganizationContext.Provider>
  );
};
