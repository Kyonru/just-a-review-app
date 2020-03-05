import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-community/async-storage';
import logger from 'redux-logger';

import { Store } from 'src/@types/store';

import reviewsReducer from './reviews/reducer';

export const reducers = combineReducers<Store>({
  reviews: reviewsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const args = __DEV__ ? [thunk, logger] : [thunk];

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer, applyMiddleware(...args));
export const persistor = persistStore(store);

export default () => {
  return { store, persistor };
};
