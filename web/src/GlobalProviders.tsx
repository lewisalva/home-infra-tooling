import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';

import { AuthenticationContextProvider } from './contexts/AuthenticationContext.tsx';
import { queryClient } from './services/queryClient.ts';
import theme from './theme.tsx';

export const GlobalProviders = () => (
  <QueryClientProvider client={queryClient}>
    <AuthenticationContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </AuthenticationContextProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
