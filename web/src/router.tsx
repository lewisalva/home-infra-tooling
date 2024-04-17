import { createBrowserRouter } from 'react-router-dom';

import { GlobalProviders } from './GlobalProviders';
import { AuthTemplate } from './pages/auth/AuthTemplate';
import Signin from './pages/auth/Signin';
import { Signout } from './pages/auth/Signout';
import Signup from './pages/auth/Signup';
import { Members } from './pages/organizations/members/Members';
import { OrganizationCreate } from './pages/organizations/OrganizationCreate';
import { Organizations } from './pages/organizations/Organizations';
import { PortalTemplate } from './pages/portal/PortalTemplate';

export const router = createBrowserRouter([
  {
    element: <GlobalProviders />,
    children: [
      {
        path: '/',
        element: <AuthTemplate />,
        // children: [
        //   {
        //     index: true,
        //     element: <Signup />,
        //   },
        //   {
        //     path: 'signin',
        //     element: <Signin />,
        //   },
        //   {
        //     path: 'signup',
        //     element: <Signup />,
        //   },
        // ],
      },
      {
        path: '/portal',
        element: <PortalTemplate />,
        children: [
          {
            path: 'organizations',
            element: <Organizations />,
          },
          { path: 'organizations/members', element: <Members /> },
          {
            path: 'organizations/create',
            element: <OrganizationCreate />,
          },
          { path: 'signout', element: <Signout /> },
        ],
      },
    ],
  },
]);
