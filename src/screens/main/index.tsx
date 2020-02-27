import React, {Component} from 'react';

import ScreenContainer from 'src/components/screen-container/index';
import SingleReviewList from 'src/containers/review-list/single';

import styles from './styles';
import {MockReviewList} from 'src/data/mock/index';

class MainScreen extends Component {
  render() {
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SingleReviewList data={MockReviewList} />
      </ScreenContainer>
    );
  }
}

export default MainScreen;
