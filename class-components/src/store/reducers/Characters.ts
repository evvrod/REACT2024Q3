import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacterWithId } from '../../interfaces/Characters';

export interface ICharactersState {
  characters: ICharacterWithId[];
}

const initialState: ICharactersState = {
  characters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<ICharacterWithId[]>) {
      const STATE = state;
      STATE.characters = action.payload;
    },
  },
});

export default charactersSlice.reducer;
