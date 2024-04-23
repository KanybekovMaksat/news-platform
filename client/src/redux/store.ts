import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authApi } from './http/auth.api';
import { postApi } from './http/post.api';
import FavoriteReducer from './slices/favoriteSlice';
import AuthReducer from './slices/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
};

const favoritesPersistReducer = persistReducer(
  favoritesPersistConfig,
  FavoriteReducer
);

export const rootReducer = combineReducers({
  auth: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  favorites: favoritesPersistReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(postApi.middleware),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatcher = typeof store.dispatch;
setupListeners(store.dispatch);
