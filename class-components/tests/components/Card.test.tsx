import React from 'react';

import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { userEvent } from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from '../../src/lib/features/Items';
import { Gender, ICharacterWithId } from '../../src/interfaces/Characters';
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

// function renderCard(query: string, items: ICharacterWithId[]) {
//   const initialState = {
//     items,
//   };
//   const store = configureStore({
//     reducer: { itemsReducer },
//     preloadedState: { itemsReducer: initialState },
//   });
//   render(
//     <Provider store={store}>
//       <MemoryRouter initialEntries={[`/?${query}`]}>
//         <Card id={mockCardProps.id} character={mockCardProps.character} />,
//       </MemoryRouter>
//     </Provider>,
//   );

//   return store;
// }

// describe('Testing Card', () => {
//   test('render Card component correctly', () => {
//     const query = 'query=Luke&page=1';
//     renderCard(query, []);
//     const name = screen.getByText('Luke Skywalker');
//     expect(name).toBeInTheDocument();
//     const birthYear = screen.getByText('birth year : 19BBY');
//     expect(birthYear).toBeInTheDocument();
//     const gender = screen.getByText(`gender : ${Gender.MALE}`);
//     expect(gender).toBeInTheDocument();

//     const linkElement = screen.getByRole('link');
//     expect(linkElement).toHaveAttribute(
//       'href',
//       `/details/${mockCardProps.id}/?${query}`,
//     );
//   });

//   test('render Card component correctly without selecting to download ', () => {
//     const query = 'query=Luke&page=1';
//     renderCard(query, []);

//     const checkbox = screen.getByRole('checkbox');
//     expect(checkbox).not.toBeChecked();
//   });

//   test('render Card component correctly with selecting to download ', () => {
//     const query = 'query=Luke&page=1';
//     renderCard(query, [{ id: mockCardProps.id, ...mockCardProps.character }]);

//     const checkbox = screen.getByRole('checkbox');
//     expect(checkbox).toBeChecked();
//   });

//   test('render Card component correctly without selecting to download', () => {
//     const query = 'query=Luke&page=1';
//     renderCard(query, []);

//     const checkbox = screen.getByRole('checkbox');
//     expect(checkbox).not.toBeChecked();
//   });

//   test('toggles checkbox selection when clicked', async () => {
//     const query = 'query=Luke&page=1';
//     const store = renderCard(query, [
//       { id: mockCardProps.id, ...mockCardProps.character },
//     ]);

//     const checkbox = screen.getByRole('checkbox');

//     expect(checkbox).toBeChecked();
//     const initState = store.getState();
//     expect(initState.itemsReducer.items).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ id: mockCardProps.id }),
//       ]),
//     );

//     await userEvent.click(checkbox);
//     expect(checkbox).not.toBeChecked();
//     const state = store.getState();
//     expect(state.itemsReducer.items).not.toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ id: mockCardProps.id }),
//       ]),
//     );

//     await userEvent.click(checkbox);
//     expect(checkbox).toBeChecked();
//     const updatedState = store.getState();
//     expect(updatedState.itemsReducer.items).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ id: mockCardProps.id }),
//       ]),
//     );
//   });
// });

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
