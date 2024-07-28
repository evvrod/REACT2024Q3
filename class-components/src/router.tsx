import { createBrowserRouter } from 'react-router-dom';

import Layout from './views/Layout/Layout';
import HomePage from './views/HomePage/HomePage';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Details from './components/Details/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'details/:details',
            element: <Details />,
            // errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: 'error',
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
