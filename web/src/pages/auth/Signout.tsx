import { useEffect, useState } from 'react';

import { useAuthenticationContext } from '../../contexts/useAuthenticationContext';

export const Signout = () => {
  const { signOut } = useAuthenticationContext();
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

  return 'Signing out...';
};
