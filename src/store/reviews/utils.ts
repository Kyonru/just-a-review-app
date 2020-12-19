import moment from 'moment';
import { SectionListData } from 'react-native';

import { Review } from 'src/@types';
import { getNextDate } from 'src/utils/reviews';

export function mapReviewsListToSectionList(reviews: Review[]) {
  const sections: { [key: string]: Review[] } = {};
  reviews.forEach((review: Review) => {
    let section = '';
    const date = getNextDate(review);
    section = date.format('YYYY-MM-DD');

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
