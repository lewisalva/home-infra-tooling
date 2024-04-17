import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { SiteNav } from '../../components/SiteNav';
import { OrganizationContextProvider } from '../../contexts/OrganizationContext';

export const PortalTemplate = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
