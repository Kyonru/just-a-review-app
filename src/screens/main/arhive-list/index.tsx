/* eslint-disable @typescript-eslint/indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScreenContainer from 'src/components/screen-container';
import SectionReviewList from 'src/containers/review-list/section';

import { SCREEN_NAMES } from 'src/navigation/constants';
import { withThrottle } from 'src/utils/timers';

import {
  ReviewsMainScreenAppProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';
import styles from './styles';

class MainScreen extends Component<ReviewsMainScreenAppProps> {
  openCreateInApp = withThrottle(() => {
    this.props.navigation.push(SCREEN_NAMES.createInApp);
  });

  openCreateFromExternal = () => {
    this.props.navigation.push(SCREEN_NAMES.createExternalForm);
  };

  render() {
    const { navigation, reviews } = this.props;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SectionReviewList
          onPressEmptyState={this.openCreateInApp}
          data={[...reviews]}
          navigation={navigation}
        />
      </ScreenContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
