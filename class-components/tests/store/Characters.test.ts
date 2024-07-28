import { describe, test, expect } from 'vitest';
import {
  charactersSlice,
  ICharactersState,
} from '../../src/store/reducers/Characters';

import { mockCharactersWithId } from '../mocks/Characters';

describe('charactersSlice', () => {
  const initialState: ICharactersState = {
    characters: [],
  };

  test('should return the initial state', () => {
    const { reducer } = charactersSlice;
    const action = { type: 'unknown' };
    expect(reducer(initialState, action)).toEqual(initialState);
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  test('should handle setCharacters', () => {
    const { reducer, actions } = charactersSlice;

    const action = actions.setCharacters(mockCharactersWithId);

    expect(reducer(initialState, action)).toEqual({
      characters: mockCharactersWithId,
    });
  });
});
