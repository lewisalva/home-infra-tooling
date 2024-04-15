import { useQuery } from '@tanstack/react-query';
import { createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signin, signout, signup } from '../services/auth';
import { getUser } from '../services/users';

export type AuthenticationContextType = {
  isLoggedIn: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const AuthenticationContext = createContext<AuthenticationContextType | null>(null);

export const AuthenticationContextProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: isLoggedIn,
    status,
    refetch,
  } = useQuery({
    queryKey: ['validateSession'],
    queryFn: () => getUser(),
  });

  const signIn = async (email: string, password: string) => {
    await signin({ email, password });

    refetch();
  };

  const signUp = async (name: string, email: string, password: string) => {
    await signup({ name, email, password });

    refetch();
  };

  const signOut = async () => {
    await signout();

    refetch();
  };

  useEffect(() => {
    if (status === 'pending') return;

    const shouldRedirectFromPortal = !isLoggedIn && location.pathname.startsWith('/portal');
    if (shouldRedirectFromPortal) {
      navigate('/signin');
    } else {
      navigate('/portal/organizations');
    }
  }, [isLoggedIn, status, location.pathname, navigate]);

  const defaultValue: AuthenticationContextType = {
    isLoggedIn: !!isLoggedIn,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthenticationContext.Provider value={defaultValue}>{children}</AuthenticationContext.Provider>
  );
};
