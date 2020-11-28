/* eslint-disable @typescript-eslint/indent */
import { createSelector } from 'reselect';
import { SectionListData } from 'react-native';
import { reviewsStoreSelector } from 'src/store/selectors';
import { Review } from 'src/@types/index';
import { Store } from 'src/@types/store';
import { getSectionsFromReviewDates } from 'src/utils/reviews';
import { mapReviewsListToSectionList, sortDatedSectionList } from './utils';

export const getReviewList = createSelector(
  reviewsStoreSelector,
  store => store.reviews || [],
);

export const getReview = createSelector(
  getReviewList,
  reviews => (id: string) => {
    const index = (reviews || []).findIndex(review => review.id === id);

    return reviews[index];
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
