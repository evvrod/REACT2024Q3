import React from 'react';

import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Pagination from '../../src/components/Pagination/Pagination';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (param: string) => {
      switch (param) {
        case 'query':
          return 'test-query';
        case 'page':
          return '2';
        default:
          return null;
      }
    },
  }),
}));

describe('Pagination Component', () => {
  test('renders pagination buttons and current page', () => {
    render(<Pagination next="https://example.com/2" previous={null} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('disables Next button when there is no next page', () => {
    render(<Pagination next={null} previous={null} />);

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('disables Previous button when there is no previous page', () => {
    render(<Pagination next={null} previous={null} />);

    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });
});
