import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { items: number[] } = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<number>) {
      const STATE = state;
      STATE.items = [...STATE.items, action.payload];
    },
    removeItem(state, action: PayloadAction<number>) {
      const STATE = state;
      STATE.items = STATE.items.filter((item) => item !== action.payload);
    },
    removeAll(state) {
      const STATE = state;
      STATE.items = [];
    },
  },
});

export default itemsSlice.reducer;
