import moment from 'moment';
import { SectionListData } from 'react-native';

import { Review } from 'src/@types';

export const getSectionsFromReviewDates = (reviewObject: {
  [key: string]: Review[];
}): SectionListData<Review>[] => {
  return Object.keys(reviewObject).map(date => ({
    title: moment(date)
      .calendar()
      .split(' ')[0],
    data: reviewObject[date],
  }));
};
