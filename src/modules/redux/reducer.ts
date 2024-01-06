import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import api from '@/common/services/api';
import vehiclesSlice from '@/features/vehicles/vehiclesSlice';

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
  vehicles: vehiclesSlice,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    blacklist: ['api'],
  },
  reducer,
);

export default persistedReducer;
