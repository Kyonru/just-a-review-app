import { createSelector } from 'reselect';
import { settingsStoreSelector } from 'src/store/selectors';

export const getUser = createSelector(
  settingsStoreSelector,
  store => store.user || {},
);

export const getDevelopment = createSelector(
  settingsStoreSelector,
  store => store.development || {},
);

export const getLanguage = createSelector(
  settingsStoreSelector,
  store => store.language || {},
);

export const getUseDarkMode = createSelector(
  settingsStoreSelector,
  store => store.useDarkMode || {},
);

export const getShowOnBoarding = createSelector(
  settingsStoreSelector,
  store => store.showOnBoarding || {},
);

export const getUseRewards = createSelector(
  settingsStoreSelector,
  store => store.useRewards || {},
);
