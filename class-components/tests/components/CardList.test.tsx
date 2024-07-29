import React from 'react';

import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from '../../src/lib/features/Items';

import { mockApiCharacters } from '../mocks/Characters';

import CardList from '../../src/components/CardList/CardList';

vi.mock('../../src/components/Card/Card', () => ({
  default: () => <div>Mock Card</div>,
}));

vi.mock('../../src/components/Pagination/Pagination', () => ({
  default: () => <div>Mock Pagination</div>,
}));

const initialState = {
  items: [],
};
const store = configureStore({
  reducer: { itemsReducer },
  preloadedState: { itemsReducer: initialState },
});

describe('Testing CardList', () => {
  test('renders "No results found." when there are no results', async () => {
    render(
      <Provider store={store}>
        <CardList
          data={{
            count: 10,
            next: null,
            previous: null,
            results: [],
          }}
        />
        ,
      </Provider>,
    );

    expect(await screen.findByText('No results found.')).toBeInTheDocument();
  });

  test('renders Cards and Pagination when data is fetched successfully', () => {
    render(
      <Provider store={store}>
        <CardList data={mockApiCharacters} />,
      </Provider>,
    );

    const cards = screen.queryAllByText(/Mock Card/);
    expect(cards.length).toBeGreaterThan(0);

    const pagination = screen.queryAllByText(/Mock Pagination/);
    expect(pagination.length).toBeGreaterThan(0);
  });
});
