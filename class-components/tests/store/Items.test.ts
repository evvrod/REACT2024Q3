import { describe, test, expect } from 'vitest';
import { mockCharacterWithId, mockCharactersWithId } from '../mocks/Characters';

import { itemsSlice } from '../../src/store/reducers/Items';

describe('itemsSlice', () => {
  test('returns the initial state for unknown actions', () => {
    const initialState = {
      items: [],
    };
    const { reducer } = itemsSlice;
    const action = { type: 'unknown' };
    expect(reducer(initialState, action)).toEqual(initialState);
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('adds a new item to an empty state', () => {
    const initialState = {
      items: [],
    };
    const { reducer, actions } = itemsSlice;

    const action = actions.addItem(mockCharacterWithId);

    expect(reducer(initialState, action)).toEqual({
      items: [mockCharacterWithId],
    });
  });

  test('adds a new item to a non-empty state', () => {
    const initialState = {
      items: mockCharactersWithId,
    };
    const { reducer, actions } = itemsSlice;

    const action = actions.addItem(mockCharacterWithId);

    expect(reducer(initialState, action)).toEqual({
      items: [...mockCharactersWithId, mockCharacterWithId],
    });
  });

  test('clears all items from the state', () => {
    const initialState = {
      items: mockCharactersWithId,
    };
    const { reducer, actions } = itemsSlice;

    const action = actions.removeAll();

    expect(reducer(initialState, action)).toEqual({
      items: [],
    });
  });

  test('removes an item by id from the state', () => {
    const initialState = {
      items: mockCharactersWithId,
    };
    const { reducer, actions } = itemsSlice;

    const action = actions.removeItem(1);

    expect(reducer(initialState, action)).toEqual({
      items: mockCharactersWithId.filter((item) => item.id !== 1),
    });
  });
});
