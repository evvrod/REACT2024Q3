import { expect, describe, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userEvent from '@testing-library/user-event';

import currentQueryReducer from '../../src/store/reducers/CurrentQuery';
import currentPageReducer from '../../src/store/reducers/CurrentPage';
import itemsReducer from '../../src/store/reducers/Items';

import CharactersApi from '../../src/services/CharacterService';
import { mockCharacters } from '../mocks/Characters';

import { ICharacterWithId } from '../../src/interfaces/Characters';
import CardList from '../../src/components/CardList/CardList';

const navigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const original =
    (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...original,
    useNavigate: () => navigate,
  };
});

vi.mock('../../src/components/Card/Card', () => ({
  default: () => <div>Mock Card</div>,
}));

vi.mock('../../src/components/Pagination/Pagination', () => ({
  default: () => <div>Mock Pagination</div>,
}));

function configStore(query: string, page: number) {
  const initialStateItemsReducer: { items: ICharacterWithId[] } = {
    items: [],
  };

  return configureStore({
    reducer: {
      currentQueryReducer,
      currentPageReducer,
      itemsReducer,
      [CharactersApi.reducerPath]: CharactersApi.reducer,
    },
    preloadedState: {
      currentQueryReducer: { query },
      currentPageReducer: { page },
      itemsReducer: initialStateItemsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(CharactersApi.middleware),
  });
}

vi.mock('../../src/components/Card/Card', () => ({
  default: () => <div>Mock Card</div>,
}));

describe('Testing CardList', () => {
  test('renders Spinner while fetching data', () => {
    const currentPage = 1;
    const currentQuery = 'all';

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    const store = configStore(currentQuery, currentPage);
    render(
      <Provider store={store}>
        <CardList />,
      </Provider>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders error message when there is an error', async () => {
    const currentPage = 1111111111;
    const currentQuery = 'all';

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    const store = configStore(currentQuery, currentPage);
    render(
      <Provider store={store}>
        <CardList />,
      </Provider>,
    );

    expect(
      await screen.findByText(
        'Error: Invalid query parameters. Please check your input and try again.',
      ),
    ).toBeInTheDocument();
  });

  test('renders "No results found." when there are no results', async () => {
    const currentPage = 1;
    const currentQuery = 'Lllllllllllll';

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: { results: [] },
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const store = configStore(currentQuery, currentPage);
    render(
      <Provider store={store}>
        <CardList />,
      </Provider>,
    );

    expect(await screen.findByText('No results found.')).toBeInTheDocument();
  });

  test('renders SearchBar and CardList components when data is fetched successfully', () => {
    const currentPage = 1;
    const currentQuery = 'all';

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: { results: mockCharacters },
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const store = configStore(currentQuery, currentPage);
    render(
      <Provider store={store}>
        <CardList />,
      </Provider>,
    );

    const cards = screen.queryAllByText(/Mock Card/);
    expect(cards.length).toBeGreaterThan(0);
  });

  test('go to search page when the card list is clicked', async () => {
    const currentPage = 1;
    const currentQuery = 'all';
    const query = `query=${currentQuery}&page=${currentPage}`;

    vi.spyOn(CharactersApi, 'useFetchCharactersQuery').mockReturnValue({
      data: { results: mockCharacters },
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const store = configStore(currentQuery, currentPage);
    render(
      <Provider store={store}>
        <CardList />,
      </Provider>,
    );

    const wrapperCardList = await screen.findByRole('button', {
      name: /Close details/i,
    });

    expect(navigate).not.toHaveBeenCalled();
    await userEvent.click(wrapperCardList);
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(`/?${query}`);
  });
});
