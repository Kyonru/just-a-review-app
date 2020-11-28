import { createSelector } from 'reselect';
import { logsStoreSelector } from 'src/store/selectors';

export const getLogList = createSelector(
  logsStoreSelector,
  store => store.logs || {},
);
