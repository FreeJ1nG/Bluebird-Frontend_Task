import {
  Action,
  type AnyAction,
  configureStore,
  ThunkAction,
  type ThunkDispatch,
} from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import api from '@/common/services/api';
import reducer from '@/modules/redux/reducer';

export const configureAppStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(api.middleware),
  });
  return store;
};

const store = configureAppStore();

const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'] &
  ThunkDispatch<RootState, void, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export { store, persistor };
