import React from 'react';

import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { userEvent } from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from '../../src/lib/features/Items';
import { Gender } from '../../src/interfaces/Characters';
import Card from '../../src/components/Card/Card';

const mockCardProps = {
  id: 1,
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
};

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === 'query') return 'test-query';
      if (key === 'page') return '1';
      return null;
    },
  }),
}));

const initialState = {
  items: [],
};
const store = configureStore({
  reducer: { itemsReducer },
  preloadedState: { itemsReducer: initialState },
});

describe('Card Component', () => {
  test('renders Card component correctly', () => {
    render(
      <Provider store={store}>
        <Card id={mockCardProps.id} character={mockCardProps.character} />
      </Provider>,
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('birth year : 19BBY')).toBeInTheDocument();
    expect(screen.getByText('gender : Male')).toBeInTheDocument();
  });

  test('handles checkbox change', async () => {
    render(
      <Provider store={store}>
        <Card id={mockCardProps.id} character={mockCardProps.character} />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    userEvent.click(checkbox);
    await waitFor(() => {
      const state = store.getState();
      const addedItem = state.itemsReducer.items.find(
        (item) => item.id === mockCardProps.id,
      );
      expect(addedItem).toEqual({
        ...mockCardProps.character,
        id: mockCardProps.id,
      });
    });

    userEvent.click(checkbox);
    await waitFor(() => {
      const state = store.getState();
      const removedItem = state.itemsReducer.items.find(
        (item) => item.id === mockCardProps.id,
      );
      expect(removedItem).toBeUndefined();
    });
  });

  test('navigates to the correct link', () => {
    render(
      <Provider store={store}>
        <Card id={mockCardProps.id} character={mockCardProps.character} />
      </Provider>,
    );

    const link = screen.getByText('Luke Skywalker').closest('a');
    expect(link).toHaveAttribute('href', '/details/1?query=test-query&page=1');
  });
});
