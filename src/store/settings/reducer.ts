/* eslint-disable no-param-reassign */
import { LogBox } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Locale } from 'react-native-localize';

import { Token } from 'src/@types/index';
import { SettingsState } from 'src/@types/store';
import { createMockReducer } from 'src/store/utils/mock';
import {
  removeAllNotifcations,
  clearDeliveredNotifcations,
} from 'src/services/notifications/triggers';
import { updateLanguage } from 'src/services/i18n/index';

import { SettingsInitialState } from './state';

function changeLanguage(
  state: SettingsState,
  { payload }: PayloadAction<Locale>,
) {
  updateLanguage(payload);
  state.language = payload;
}

function toggleWarnings(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.development.showYellowBox = payload;
  LogBox.ignoreAllLogs(payload);
}

function toggleDarkMode(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.useDarkMode = payload;
}

function toggleShowOnBoarding(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.showOnBoarding = payload;
}

function toggleUseRewards(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.useRewards = payload;
}

function updateUserInfo(
  state: SettingsState,
  { payload }: PayloadAction<{ name?: string; image?: string }>,
) {
  const { name, image } = payload;

  if (name !== undefined) {
    state.user.name = name;
  }

  if (image) {
    state.user.image = image;
  }
}

function updateNotificationToken(
  state: SettingsState,
  { payload }: PayloadAction<Token>,
) {
  state.notifications.token = payload;
}

function toggleNotifications(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.notifications.enabled = payload;
  if (!payload) {
    removeAllNotifcations();
  }
}

function toggleClearDeliveredNotifications(
  state: SettingsState,
  { payload }: PayloadAction<boolean>,
) {
  state.notifications.clearDelivered = payload;
  if (payload) {
    clearDeliveredNotifcations();
  }
}

export default createSlice({
  name: 'settings',
  initialState: SettingsInitialState,
  reducers: {
    changeLanguage,
    toggleWarnings,
    toggleDarkMode,
    toggleNotifications,
    toggleClearDeliveredNotifications,
    toggleShowOnBoarding,
    toggleUseRewards,
    updateUserInfo,
    updateNotificationToken,
  },
  extraReducers: builder => {
    createMockReducer(builder, [toggleWarnings], [true]);
  },
});
