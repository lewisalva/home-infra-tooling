import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthenticationContext } from '../../contexts/useAuthenticationContext';

export const AuthTemplate = () => {
  const { isLoggedIn } = useAuthenticationContext();
  const navigate = useNavigate();

  if (isLoggedIn === true) {
    navigate('/portal/organizations');
    return null;
  }

  return <Outlet />;
};
