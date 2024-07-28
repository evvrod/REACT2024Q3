import { combineReducers, configureStore } from '@reduxjs/toolkit';

import CharactersApi from '../services/CharacterService';
import currentPageReducer from './reducers/CurrentPage';
import charactersReducer from './reducers/Characters';
import currentQueryReducer from './reducers/CurrentQuery';
import itemsReducer from './reducers/Items';

const rootReducer = combineReducers({
  currentPageReducer,
  charactersReducer,
  currentQueryReducer,
  itemsReducer,
  [CharactersApi.reducerPath]: CharactersApi.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(CharactersApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
