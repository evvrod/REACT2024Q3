import React from 'react';

import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { configureStore, Store } from '@reduxjs/toolkit';

import itemsReducer from '../../src/lib/features/Items';
import { ICharacterWithId } from '../../src/interfaces/Characters';
import exportToCSV from '../../src/utils/exportToCSV';

import Modal from '../../src/components/Modal/Modal';

import { mockCharactersWithId } from '../mocks/Characters';

vi.mock('../../src/utils/exportToCSV', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const initialStateItemsReducer: { items: ICharacterWithId[] } = {
  items: mockCharactersWithId,
};

function createTestStore() {
  return configureStore({
    reducer: {
      itemsReducer,
    },
    preloadedState: {
      itemsReducer: initialStateItemsReducer,
    },
  });
}

describe('Modal Component', () => {
  let store: Store;

  beforeEach(() => {
    store = createTestStore();
  });

  test('should render with the correct number of items', () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    expect(
      screen.getByText(`${mockCharactersWithId.length} items are selected`),
    ).toBeInTheDocument();
  });

  test('should dispatch removeAll action on Unselect all button click', async () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );
    await userEvent.click(screen.getByText('Unselect all'));
    const state = store.getState();
    expect(state.itemsReducer.items).toEqual([]);
  });

  test('should call exportToCSV with items on Download button click', async () => {
    render(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    await userEvent.click(screen.getByText('Download'));
    expect(exportToCSV).toHaveBeenCalledWith(mockCharactersWithId);
  });
});
