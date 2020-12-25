import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { LogBox } from 'react-native';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';

import { Store } from 'src/@types/store';
import { clearDeliveredNotifcations } from 'src/services/notifications/triggers';

import reviewsSlice from './reviews/reducer';
import logsSclice from './logs/reducer';
import settingsSclice from './settings/reducer';
import notificationsSlice from './notifications/reducer';

import migrations from './migrations';
import { getDevelopment, getNotificationsSettings } from './settings/selectors';

export const reducers = combineReducers<Store>({
  logs: logsSclice.reducer,
  reviews: reviewsSlice.reducer,
  settings: settingsSclice.reducer,
  notifications: notificationsSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  migrate: createMigrate(migrations as any, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

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

export const persistor = persistStore(store, {}, () => {
  const { showYellowBox } = getDevelopment(store.getState());
  const { clearDelivered } = getNotificationsSettings(store.getState());

  if (__DEV__) {
    LogBox.ignoreAllLogs(showYellowBox);
  }

  if (clearDelivered) {
    clearDeliveredNotifcations();
  }
});

export default () => {
  return { store, persistor };
};
