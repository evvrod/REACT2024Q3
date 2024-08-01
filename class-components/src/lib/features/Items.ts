import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICharacterWithId } from '../../interfaces/Characters';

const initialState: { items: ICharacterWithId[] } = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICharacterWithId>) {
      const STATE = state;
      STATE.items = [...STATE.items, action.payload];
    },
    removeItem(state, action: PayloadAction<number>) {
      const STATE = state;
      STATE.items = STATE.items.filter((item) => item.id !== action.payload);
    },
    removeAll(state) {
      const STATE = state;
      STATE.items = [];
    },
  },
});

export default itemsSlice.reducer;
