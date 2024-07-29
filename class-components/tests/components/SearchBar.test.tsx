import React from 'react';

import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import SearchBar from '../../src/components/SearchBar/SearchBar';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname:  () => ({
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

vi.mock('../../src/hooks/useLocalStorage', () => ({
  __esModule: true,
  default: () => ['stored-query', vi.fn()],
}));

describe('Testing SearchBar', () => {
  test('renders SearchBar component correctly', () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(
      (screen.getByPlaceholderText('Search...') as HTMLInputElement).value,
    ).toBe('test-query');
  });
});
