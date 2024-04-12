import { createContext, useCallback, useEffect, useState } from 'react';

import {
  getOrganization,
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
  const [organizations, setOrganizations] = useState<OrganizationContextType['organizations']>([]);
  const [shouldLoadOrganizations, setShouldLoadOrganizations] = useState(false);

  const setSelectedOrganization = useCallback((id: string, name: string) => {
    setSelectedOrganizationId(id);
    setSelectedOrganizationName(name);
  }, []);

  useEffect(() => {
    setShouldLoadOrganizations(true);
  }, []);

  useEffect(() => {
    setShouldLoadOrganizations(true);
  }, []);

  useEffect(() => {
    if (shouldLoadOrganizations) {
      setShouldLoadOrganizations(false);
      getOrganization().then((organizations) => {
        if (organizations.length > 0) {
          setSelectedOrganization(organizations[0].id, organizations[0].name);
        }
        setOrganizations(organizations);
      });
    }
  }, [shouldLoadOrganizations, setSelectedOrganization]);

  const createOrganization = useCallback(
    async ({ name }: OrganizationCreateType) => {
      const orgId = await postOrganization({ name });
      if (!orgId) throw new Error('Failed to create organization');

      setSelectedOrganization(orgId, name);
    },
    [setSelectedOrganization]
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
