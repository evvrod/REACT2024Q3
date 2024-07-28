import { expect, describe, test, vi } from 'vitest';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { ICharacterWithId } from '../../src/interfaces/Characters';
import { mockCharactersWithId } from '../mocks/Characters';

import HomePage from '../../src/views/HomePage/HomePage';

describe('Testing HomePage', () => {
  const createMockStore = (items: ICharacterWithId[]) =>
    configureStore({
      reducer: {
        itemsReducer: () => ({ items }),
      },
    });

  vi.mock('../../src/components/SearchBar/SearchBar', () => ({
    default: () => <div>Mock SearchBar</div>,
  }));

  vi.mock('../../src/components/CardList/CardList', () => ({
    default: () => <div>Mock CardList</div>,
  }));

  test('renders SearchBar and CardList components', () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Mock SearchBar/)).toBeInTheDocument();
    expect(screen.queryByText(/Mock CardList/)).toBeInTheDocument();
  });
  test('renders Modal component when items are present', () => {
    const store = createMockStore(mockCharactersWithId);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/items are selected/)).toBeInTheDocument();
  });

  test('does not render Modal component when items are empty', () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/items are selected/)).toBeNull();
  });
});
