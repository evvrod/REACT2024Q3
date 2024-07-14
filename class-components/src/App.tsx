import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './views/Layout/Layout';
import HomePage from './views/HomePage/HomePage';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Details, { DetailsLoader } from './components/Details/Details';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import './App.css';

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
            loader: DetailsLoader,
            errorElement: <ErrorPage />,
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

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
