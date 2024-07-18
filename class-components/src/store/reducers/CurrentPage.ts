import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    increment(state) {
      const STATE = state;
      STATE.page += 1;
    },
    decrement(state) {
      const STATE = state;
      STATE.page -= 1;
    },
    setPage(state, action: PayloadAction<number>) {
      const STATE = state;
      STATE.page = action.payload;
    },
  },
});

export default currentPageSlice.reducer;
