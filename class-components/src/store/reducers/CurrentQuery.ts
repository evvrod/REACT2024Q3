import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

export const currentQuerySlice = createSlice({
  name: 'currentRequest',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      const STATE = state;
      STATE.query = action.payload;
    },
  },
});

export default currentQuerySlice.reducer;
