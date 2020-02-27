import React, {Component} from 'react';

import ScreenContainer from 'src/components/screen-container/index';
import FABButton from 'src/components/button/fab';
import SectionReviewList from 'src/containers/review-list/section';

import {getSectionsFromReviewDates} from 'src/utils/reviews';
import {MockDatedReviewLists} from 'src/data/mock/index';

import styles from './styles';
import colors from 'src/theme/colors';

class MainScreen extends Component {
  render() {
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SectionReviewList
          data={getSectionsFromReviewDates(MockDatedReviewLists)}
        />
        <FABButton
          options={[
            {
              icon: 'cellphone',
              label: 'in App',
              onPress: () => console.warn('Pressed in App'),
              color: colors.white,
              style: {backgroundColor: colors.pistonBlue},
            },
            {
              icon: 'comment',
              label: 'Google Form',
              onPress: () => console.warn('Pressed Google Form'),
              color: colors.white,
              style: {backgroundColor: colors.shamrock},
            },
          ]}
        />
      </ScreenContainer>
    );
  }
}

export default MainScreen;
