import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { checkAuth, signin, signout, signup } from '../services/auth';

export type AuthenticationContextType = {
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const AuthenticationContext = createContext<AuthenticationContextType>({
  isLoggedIn: false,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

const AuthenticationContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });

    setShouldLoad(true);
  };

  const signUp = async (name: string, email: string, password: string) => {
    await signup({ name, email, password });

    setShouldLoad(true);
  };

  const signOut = async () => {
    await signout();

    setIsLoggedIn(false);
  };

  useEffect(() => {
    setShouldLoad(true);
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      setShouldLoad(false);
      checkAuth().then((isUserLoggedIn) => {
        setIsLoggedIn(isUserLoggedIn);
      });
    }
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    if (isLoggedIn && !location.pathname.includes('portal')) {
      navigate('/portal/practices');
    } else if (!isLoggedIn && location.pathname.includes('portal')) {
      navigate('/signin');
    }
  }, [isLoggedIn, location, navigate, shouldLoad]);

  const defaultValue: AuthenticationContextType = {
    isLoggedIn,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthenticationContext.Provider value={defaultValue}>{children}</AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
