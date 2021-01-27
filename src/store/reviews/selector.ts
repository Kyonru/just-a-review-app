/* eslint-disable @typescript-eslint/indent */
import { createSelector } from 'reselect';
import { SectionListData } from 'react-native';
import { Locale } from 'react-native-localize';

import { Review } from 'src/@types/index';
import { Store, SettingsState } from 'src/@types/store';

import { getSectionsFromReviewDates } from 'src/utils/reviews';

import {
  reviewsStoreSelector,
  settingsStoreSelector,
} from 'src/store/selectors';

import { mapReviewsListToSectionList, sortDatedSectionList } from './utils';
import { getLanguage } from '../settings/selectors';

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
  SettingsState,
  { [key: string]: Review[] }
>(getReviewList, settingsStoreSelector, (reviews, settings) => {
  return mapReviewsListToSectionList(
    reviews.filter(review => !!review.archivedAt),
    settings.language.languageCode,
  );
});

export const getReviewListAsDatedSectionList = createSelector<
  Store,
  Review[],
  SettingsState,
  { [key: string]: Review[] }
>(getReviewList, settingsStoreSelector, (reviews, settings) => {
  return mapReviewsListToSectionList(
    reviews.filter(review => !review.archivedAt),
    settings.language.languageCode,
  );
});

export const getReviewListAsSectionList = createSelector<
  Store,
  { [key: string]: Review[] },
  Locale,
  SectionListData<Review>[]
>(getReviewListAsDatedSectionList, getLanguage, (reviews, locale) => {
  return sortDatedSectionList(
    getSectionsFromReviewDates(reviews, locale.languageCode),
  );
});

export const getArchivedReviewListAsSectionList = createSelector<
  Store,
  { [key: string]: Review[] },
  Locale,
  SectionListData<Review>[]
>(getArchivedReviewListAsDatedSectionList, getLanguage, (reviews, locale) => {
  return sortDatedSectionList(
    getSectionsFromReviewDates(reviews, locale.languageCode),
  );
});

export const getArchivedReviewListLength = createSelector<
  Store,
  Review[],
  number
>(getReviewList, reviews => {
  return reviews.filter(review => !!review.archivedAt).length;
});
