import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { SiteNav } from '../../components/SiteNav';
import { OrganizationContextProvider } from '../../contexts/OrganizationContext';
import { useAuthenticationContext } from '../../contexts/useAuthenticationContext';

export const PortalTemplate = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn } = useAuthenticationContext();
  const navigate = useNavigate();

  if (isLoggedIn !== true) {
    navigate('/');
    return null;
  }

  return (
    <OrganizationContextProvider>
      <div className="min-h-full">
        <SiteNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
          <main className="flex-1">
            <Outlet />
          </main>
        </SiteNav>
      </div>
    </OrganizationContextProvider>
  );
};
