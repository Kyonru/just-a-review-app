import moment from 'moment';
import { SectionListData } from 'react-native';
import { DayOfTheWeek, Review, ReviewType } from 'src/@types';
import {
  getNextDayOfMonth,
  getNextDayOfWeek,
  getNextDayOfYear,
} from 'src/utils/time';

export function mapReviewsListToSectionList(reviews: Review[]) {
  const sections: { [key: string]: Review[] } = {};
  reviews.forEach((review: Review) => {
    let section = '';
    let date;
    if (review.type === ReviewType.daily) {
      date =
        review.lastLog && moment(review.lastLog).isSame(moment(), 'day')
          ? moment().add(1, 'day')
          : moment();
      section = date.format('YYYY-MM-DD');
    }

    if (review.type === ReviewType.weekly) {
      const reviewDate = getNextDayOfWeek(review.day! as DayOfTheWeek);
      date =
        review.lastLog && moment(review.lastLog).isSame(moment(), 'day')
          ? reviewDate.add(1, 'week')
          : reviewDate;

      section = date.format('YYYY-MM-DD');
    }

    if (review.type === ReviewType.monthly) {
      const reviewDate = getNextDayOfMonth(review.day! as number);
      date =
        review.lastLog && moment(review.lastLog).isSame(moment(), 'day')
          ? reviewDate.add(1, 'month')
          : reviewDate;

      section = reviewDate.format('YYYY-MM-DD');
    }

    if (review.type === ReviewType.yearly) {
      const reviewDate = getNextDayOfYear(review.date!);
      date =
        review.lastLog && moment(review.lastLog).isSame(moment(), 'day')
          ? reviewDate.add(1, 'year')
          : reviewDate;

      section = reviewDate.format('YYYY-MM-DD');
    }

    sections[section] = sections[section]
      ? sections[section].concat(review)
      : [review];
  });

  return sections;
}

export const sortDatedSectionList = (list: SectionListData<Review>[]) => {
  return list.sort((a, b) => {
    if (moment(a.value).unix() < moment(b.value).unix()) {
      return -1;
    }
    if (moment(a.value).unix() > moment(b.value).unix()) {
      return 1;
    }
    return 0;
  });
};
