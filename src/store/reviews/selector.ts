/* eslint-disable @typescript-eslint/indent */
import { createSelector } from 'reselect';
import { SectionListData } from 'react-native';
import { reviewsStoreSelector } from 'src/store/selectors';
import { Review } from 'src/@types/index';
import { Store } from 'src/@types/store';
import { getSectionsFromReviewDates } from 'src/utils/reviews';
import { mapReviewsListToSectionList, sortDatedSectionList } from './utils';

export const getReviewList = createSelector(reviewsStoreSelector, store => {
  return Object.keys(store.reviews)
    .map(key => store.reviews[key])
    .filter(review => !!review);
});

export const getReview = createSelector(
  reviewsStoreSelector,
  store => (id: string) => {
    return store.reviews[id];
  },
);

export const getArchivedReviewListAsDatedSectionList = createSelector<
  Store,
  Review[],
  { [key: string]: Review[] }
>(getReviewList, reviews => {
  return mapReviewsListToSectionList(
    reviews.filter(review => !!review.archivedAt),
  );
});

export const getReviewListAsDatedSectionList = createSelector<
  Store,
  Review[],
  { [key: string]: Review[] }
>(getReviewList, reviews => {
  return mapReviewsListToSectionList(
    reviews.filter(review => !review.archivedAt),
  );
});

export const getReviewListAsSectionList = createSelector<
  Store,
  { [key: string]: Review[] },
  SectionListData<Review>[]
>(getReviewListAsDatedSectionList, reviews => {
  return sortDatedSectionList(getSectionsFromReviewDates(reviews));
});

export const getArchivedReviewListAsSectionList = createSelector<
  Store,
  { [key: string]: Review[] },
  SectionListData<Review>[]
>(getArchivedReviewListAsDatedSectionList, reviews => {
  return sortDatedSectionList(getSectionsFromReviewDates(reviews));
});

export const getArchivedReviewListLength = createSelector<
  Store,
  Review[],
  number
>(getReviewList, reviews => {
  return reviews.filter(review => !!review.archivedAt).length;
});
