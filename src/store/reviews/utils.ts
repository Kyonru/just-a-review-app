import moment from 'moment';
import 'moment/locale/es';
import { SectionListData } from 'react-native';

import { momentLangConfig } from 'src/services/i18n';
import { Review } from 'src/@types';

export function mapReviewsListToSectionList(reviews: Review[], locale = 'en') {
  const sections: { [key: string]: Review[] } = {};
  reviews.forEach((review: Review) => {
    let section = '';

    moment.locale(locale, momentLangConfig);
    const date = moment(review.nextReminder);
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
