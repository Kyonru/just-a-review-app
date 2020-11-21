import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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
import storage from '@react-native-community/async-storage';
import logger from 'redux-logger';

import { Store } from 'src/@types/store';

import reviewsSlice from './reviews/reducer';

export const reducers = combineReducers<Store>({
  reviews: reviewsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = createStore(persistedReducer, applyMiddleware(...args));

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // prepend and concat calls can be chained
      .concat(__DEV__ ? logger : ([] as any)),
});

export const persistor = persistStore(store);

export default () => {
  return { store, persistor };
};
