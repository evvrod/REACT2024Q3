import { expect, describe, test, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import currentQueryReducer from '../../src/store/reducers/CurrentQuery';
import currentPageReducer from '../../src/store/reducers/CurrentPage';

import SearchBar from '../../src/components/SearchBar/SearchBar';

const mockUseSearchParams = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const original =
    (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...original,
    useSearchParams: () => [
      new URLSearchParams('query=Luke&page=1'),
      mockUseSearchParams,
    ],
  };
});

vi.mock('../../src/hooks/useLocalStorage', () => ({
  __esModule: true,
  default: () => ['stored-query', vi.fn()],
}));

function configStore(query: string, page: number) {
  return configureStore({
    reducer: {
      currentQueryReducer,
      currentPageReducer,
    },
    preloadedState: {
      currentQueryReducer: { query },
      currentPageReducer: { page },
    },
  });
}

describe('Testing SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders SearchBar component correctly', () => {
    const initialQuery = 'Luke';
    const initialPage = 1;

    vi.mock('react-router-dom', async (importOriginal) => {
      const original =
        (await importOriginal()) as typeof import('react-router-dom');
      return {
        ...original,
        useSearchParams: () => [
          new URLSearchParams(`query=Luke&page=1`),
          mockUseSearchParams,
        ],
      };
    });

    const store = configStore(initialQuery, initialPage);

    render(
      <Provider store={store}>
        <SearchBar />,
      </Provider>,
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(
      (screen.getByPlaceholderText('Search...') as HTMLInputElement).value,
    ).toBe(initialQuery);
  });
});
