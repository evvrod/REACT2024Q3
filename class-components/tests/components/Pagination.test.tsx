import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';

import currentQueryReducer from '../../src/store/reducers/CurrentQuery';
import currentPageReducer, {
  currentPageSlice,
} from '../../src/store/reducers/CurrentPage';
import CharactersApi from '../../src/services/CharacterService';
import Pagination from '../../src/components/Pagination/Pagination';

import { mockCharacters } from '../mocks/Characters';

vi.mock('react-router-dom', async (importOriginal) => {
  const original =
    (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...original,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

function configStore(query: string, page: number) {
  return configureStore({
    reducer: {
      currentQueryReducer,
      currentPageReducer,
      [CharactersApi.reducerPath]: CharactersApi.reducer,
    },
    preloadedState: {
      currentQueryReducer: { query },
      currentPageReducer: { page },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(CharactersApi.middleware),
  });
}

describe('Pagination Component', () => {
  test('renders pagination buttons and current page', () => {
    const currentPage = 1;
    const currentQuery = 'all';
    const store = configStore(currentQuery, currentPage);
    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: {
        count: 5,
        next: null,
        previous: 'prev',
        results: mockCharacters,
      },
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /previous/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('disables Next button when there is no next page', () => {
    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: {
        count: 5,
        next: null,
        previous: 'prev',
        results: mockCharacters,
      },
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    const store = configStore('all', 1);
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  test('disables Previous button when there is no previous page', () => {
    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: {
        count: 5,
        next: 'next',
        previous: null,
        results: mockCharacters,
      },
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    const store = configStore('all', 1);
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  test('calls increment action and updates search params on clicking Next button', async () => {
    const currentPage = 1;
    const currentQuery = 'all';
    const store = configStore(currentQuery, currentPage);

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: {
        count: 5,
        next: 'next',
        previous: null,
        results: mockCharacters,
      },
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await userEvent.click(nextButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('calls decrement action and updates search params on clicking Previous button', async () => {
    const currentPage = 2;
    const currentQuery = 'all';
    const store = configStore(currentQuery, currentPage);

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: {
        count: 5,
        next: null,
        previous: 'test',
        results: mockCharacters,
      },
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    await userEvent.click(previousButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
