import { createBrowserRouter } from 'react-router-dom';

import { Authenticated } from './components/templates/Authenticated';
import { Unauthenticated } from './components/templates/Unauthenticated';
import { GlobalProviders } from './GlobalProviders';
import Signin from './pages/auth/Signin';
import { Signout } from './pages/auth/Signout';
import Signup from './pages/auth/Signup';
import { Organizations } from './pages/organizations/Organizations';

export const router = createBrowserRouter([
  {
    element: <GlobalProviders />,
    children: [
      {
        path: '/',
        element: <Unauthenticated />,
        children: [
          {
            index: true,
            element: <Signup />,
          },
          {
            path: 'signin',
            element: <Signin />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
      {
        path: '/portal',
        element: <Authenticated />,
        children: [
          {
            path: 'practices',
            element: <Organizations />,
          },
          { path: 'signout', element: <Signout /> },
        ],
      },
    ],
  },
]);
