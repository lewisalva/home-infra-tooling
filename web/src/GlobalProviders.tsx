import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';

import { AuthenticationContextProvider } from './contexts/AuthenticationContext.tsx';
import { queryClient } from './services/queryClient.ts';

export const GlobalProviders = () => (
  <QueryClientProvider client={queryClient}>
    <AuthenticationContextProvider>
      <Outlet />
    </AuthenticationContextProvider>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </QueryClientProvider>
);
