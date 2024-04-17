import { Outlet, useNavigate } from 'react-router-dom';

import { useAuthenticationContext } from '../../contexts/useAuthenticationContext';

export const AuthTemplate = () => {
  const { isLoggedIn } = useAuthenticationContext();
  const navigate = useNavigate();

  if (isLoggedIn === true) {
    navigate('/portal/organizations');
    return null;
  } else if (isLoggedIn === undefined) {
    return <></>;
  }

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <Outlet />
    </div>
  );
};
