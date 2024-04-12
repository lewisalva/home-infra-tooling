import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';

import { AuthenticationContextProvider } from './contexts/AuthenticationContext.tsx';
import theme from './theme.tsx';

export const GlobalProviders = () => (
  <AuthenticationContextProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  </AuthenticationContextProvider>
);
