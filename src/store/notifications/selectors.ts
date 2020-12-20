import { createSelector } from 'reselect';
import { notificationsStoreSelector } from 'src/store/selectors';

export const getReviewNotificaitons = createSelector(
  notificationsStoreSelector,
  store => (id: string) => {
    return store[id] || {};
  },
);
