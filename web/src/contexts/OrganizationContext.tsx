import { createContext, useCallback, useEffect, useState } from 'react';

import { getOrganizations, OrganizationsType } from '../services/organizations';

export type OrganizationContextType = {
  selectedOrganizationId: string;
  selectedOrganizationName: string;
  organizations: OrganizationsType;
  setSelectedOrganization: (id: string, name: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const OrganizationContext = createContext<OrganizationContextType>({
  selectedOrganizationId: '',
  selectedOrganizationName: '',
  organizations: [],
  setSelectedOrganization: () => {},
});

const OrganizationContextProvider = ({ children }: Props) => {
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
      getOrganizations().then((organizations) => {
        if (organizations.length > 0) {
          setSelectedOrganization(
            organizations[0].organization.id,
            organizations[0].organization.name
          );
        }
        setOrganizations(organizations);
      });
    }
  }, [shouldLoadOrganizations, setSelectedOrganization]);

  const defaultValue: OrganizationContextType = {
    selectedOrganizationId,
    selectedOrganizationName,
    organizations,
    setSelectedOrganization,
  };

  return (
    <OrganizationContext.Provider value={defaultValue}>{children}</OrganizationContext.Provider>
  );
};

export default OrganizationContextProvider;
