import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CharactersApi from '../../src/services/CharacterService';

import { Gender } from '../../src/interfaces/Characters';
import Details from '../../src/components/Details/Details';

const mockCharacterDetailsFetchData = {
  character: {
    url: 'https://swapi.dev/api/people/1/',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: Gender.MALE,
    height: 172,
    hair_color: 'Blond',
    eye_color: 'Blue',
    skin_color: 'Fair',
    homeworld: 'https://swapi.dev/api/planets/1/',
    vehicles: [
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/',
    ],
    starships: [
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/',
    ],
  },
  homeworld: {
    name: 'Tatooine',
  },
  vehicles: [{ name: 'Speeder' }, { name: 'Landspeeder' }],
  starships: [{ name: 'X-Wing' }, { name: 'TIE Fighter' }],
};

vi.mock('../services/CharactersApi', () => ({
  useFetchCharactersQuery: vi.fn(),
}));

function renderDetails(query: string, page: number, history: MemoryHistory) {
  history.push(`/?query=${query}&page=${page}`);

  const store = configureStore({
    reducer: {
      [CharactersApi.reducerPath]: CharactersApi.reducer,
    },
    preloadedState: {},
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(CharactersApi.middleware),
  });

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Details />,
      </Router>
    </Provider>,
  );
}

describe('Testing Details', () => {
  test('should render spinner while fetching data', () => {
    const currentPage = 1;
    const currentQuery = 'Luke';

    vi.spyOn(CharactersApi, 'useFetchCharactersDetailsQuery').mockReturnValue({
      data: mockCharacterDetailsFetchData,
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    const history = createMemoryHistory();
    renderDetails(currentQuery, currentPage, history);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders Details correctly', () => {
    const currentPage = 1;
    const currentQuery = 'Luke';

    vi.spyOn(CharactersApi, 'useFetchCharactersDetailsQuery').mockReturnValue({
      data: mockCharacterDetailsFetchData,
      isFetching: false,
      isError: false,
      refetch: vi.fn(),
    });

    const history = createMemoryHistory();
    renderDetails(currentQuery, currentPage, history);

    expect(screen.getByText('Base Info')).toBeInTheDocument();
    expect(screen.getByText('height : 172')).toBeInTheDocument();
    expect(screen.getByText('hair color : Blond')).toBeInTheDocument();
    expect(screen.getByText('eye color : Blue')).toBeInTheDocument();
    expect(screen.getByText('skin color : Fair')).toBeInTheDocument();

    expect(screen.getByText('Home world')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();

    expect(screen.getByText('Vehicles')).toBeInTheDocument();
    expect(screen.getByText('Speeder')).toBeInTheDocument();
    expect(screen.getByText('Landspeeder')).toBeInTheDocument();

    expect(screen.getByText('Star ships')).toBeInTheDocument();
    expect(screen.getByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText('TIE Fighter')).toBeInTheDocument();
  });
});
