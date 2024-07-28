import { useEffect } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/ErrorBoundary/ErrorBoundary';

function ErrorComponent() {
  useEffect(() => {
    throw new Error('Test error');
  }, []);

  return null;
}

describe('ErrorBoundary', () => {
  it('renders error message when a child throws an error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(
      screen.getByText(/Oops! Something went wrong. Please try again later./i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reload/i })).toBeInTheDocument();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
  });
});
