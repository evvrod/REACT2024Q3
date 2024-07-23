import { describe, test, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider, Outlet } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import router from '../src/router';
import App from '../src/App';

vi.mock('../src/views/HomePage/HomePage', () => ({
  default: () => (
    <>
      <Outlet />
      <div>Mock Home Page Content</div>
    </>
  ),
}));

vi.mock('../src/components/Details/Details', () => ({
  default: () => <div>Mock Details Content</div>,
}));

vi.mock('../src/views/ErrorPage/ErrorPage', () => ({
  default: () => <div>Mock Error Page Content</div>,
}));

describe('testing App Routing', () => {
  test('renders HomePage on root path', async () => {
    render(<App />);

    expect(screen.getByText('Mock Home Page Content')).toBeInTheDocument();
  });

  test('renders Details when navigating to details URL', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: [`/details/1`],
    });
    render(
      <ErrorBoundary>
        <RouterProvider router={testRouter} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Mock Details Content/i)).toBeInTheDocument();
  });

  test('renders ErrorPage for unknown routes', () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/test/1'],
    });
    render(
      <ErrorBoundary>
        <RouterProvider router={testRouter} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Mock Error Page Content/i)).toBeInTheDocument();
  });
});
