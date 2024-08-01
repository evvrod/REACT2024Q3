import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from './features/Items';

export const setupStore = () =>
  configureStore({
    reducer: { itemsReducer },
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
