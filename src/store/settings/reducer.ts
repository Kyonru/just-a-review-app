/* eslint-disable no-param-reassign */
import { LogBox } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Token } from 'src/@types/index';
import { SettingsState } from 'src/@types/store';
import { createMockReducer } from 'src/store/utils/mock';
import { removeAllNotifcations } from 'src/services/notifications/triggers';

import { SettingsInitialState } from './state';

function changeLanguage(
  state: SettingsState,
  { payload }: PayloadAction<string>,
) {
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
  removeAllNotifcations();
}

export default createSlice({
  name: 'settings',
  initialState: SettingsInitialState,
  reducers: {
    changeLanguage,
    toggleWarnings,
    toggleDarkMode,
    toggleNotifications,
    toggleShowOnBoarding,
    toggleUseRewards,
    updateUserInfo,
    updateNotificationToken,
  },
  extraReducers: builder => {
    createMockReducer(builder, [toggleWarnings], [true]);
  },
});
