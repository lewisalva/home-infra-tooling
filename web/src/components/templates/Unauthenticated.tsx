import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

import { Copyright } from '../Copyright';

export const Unauthenticated = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Outlet />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
