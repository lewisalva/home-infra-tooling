import Container from '@mui/material/Container';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthenticationContext } from '../../contexts/useAuthenticationContext';
import { Copyright } from '../Copyright';

export const Unauthenticated = () => {
  const { isLoggedIn } = useAuthenticationContext();
  const navigate = useNavigate();

  if (isLoggedIn === true) {
    navigate('/portal/organizations');
    return null;
  } else if (isLoggedIn === undefined) {
    return <></>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Outlet />
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};
