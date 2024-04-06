import CircularProgress from '@mui/material/CircularProgress';
import { useContext, useEffect, useState } from 'react';

import { AuthenticationContext } from '../../contexts/AuthenticationContext';

export const Signout = () => {
  const { signOut } = useContext(AuthenticationContext);
  const [shouldSignOut, setShouldSignOut] = useState(false);

  useEffect(() => {
    setShouldSignOut(true);
  }, []);

  useEffect(() => {
    if (shouldSignOut) {
      setShouldSignOut(false);
      signOut();
    }
  }, [shouldSignOut, signOut]);

  return <CircularProgress />;
};
