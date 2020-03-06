/* eslint-disable @typescript-eslint/indent */
import { createSelector } from 'reselect';
import { reviewsStoreSelector } from 'src/store/selectors';
import { Review, ReviewType, DayOfTheWeek } from 'src/@types/index';
import { Store } from 'src/@types/store';
import moment from 'moment';
import { getSectionsFromReviewDates } from 'src/utils/reviews';
import { SectionListData } from 'react-native';
import {
  getNextDayOfWeek,
  getNextDayOfMonth,
  getNextDayOfYear,
} from 'src/utils/time';

export const getReviewList = createSelector(
  reviewsStoreSelector,
  store => store.reviews || [],
);

export const getReviewListAsDatedSection = createSelector<
  Store,
  Review[],
  { [key: string]: Review[] }
>(getReviewList, reviews => {
  const sections: { [key: string]: Review[] } = {};
  reviews.forEach((review: Review) => {
    let section = '';
    if (review.type === ReviewType.daily) {
      section = moment().format('YYYY-MM-DD');
    }

    if (review.type === ReviewType.weekly) {
      section = getNextDayOfWeek(review.day! as DayOfTheWeek).format(
        'YYYY-MM-DD',
      );
    }

    if (review.type === ReviewType.monthly) {
      section = getNextDayOfMonth(review.day! as number).format('YYYY-MM-DD');
    }

    if (review.type === ReviewType.yearly) {
      section = getNextDayOfYear(review.date!).format('YYYY-MM-DD');
    }

    sections[section] = sections[section]
      ? sections[section].concat(review)
      : [review];
  });

  return sections;
});

export const getReviewListAsSectionList = createSelector<
  Store,
  { [key: string]: Review[] },
  SectionListData<Review>[]
>(getReviewListAsDatedSection, reviews => {
  return getSectionsFromReviewDates(reviews).sort((a, b) => {
    if (moment(a.value).unix() < moment(b.value).unix()) {
      return -1;
    }
    if (moment(a.value).unix() > moment(b.value).unix()) {
      return 1;
    }
    return 0;
  });
});
