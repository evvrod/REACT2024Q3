import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApiCharacters {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

interface ICharacter {
  id: number;
  url: string;
  name: string;
  birth_year: string;
  gender: 'Male' | 'Female';
  height: number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
}

export interface ICharactersState {
  characters: ICharacter[];
}

const initialState: ICharactersState = {
  characters: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<ICharacter[]>) {
      const STATE = state;
      STATE.characters = action.payload;
    },
  },
});

export default charactersSlice.reducer;
