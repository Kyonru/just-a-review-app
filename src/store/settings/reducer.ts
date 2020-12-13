/* eslint-disable no-param-reassign */
import { LogBox } from 'react-native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from 'src/@types/store';
import { createMockReducer } from 'src/store/utils/mock';

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

export default createSlice({
  name: 'settings',
  initialState: SettingsInitialState,
  reducers: {
    changeLanguage,
    toggleWarnings,
    toggleDarkMode,
    toggleShowOnBoarding,
    toggleUseRewards,
    updateUserInfo,
  },
  extraReducers: builder => {
    createMockReducer(builder, [toggleWarnings], [true]);
  },
});
