/* eslint-disable @typescript-eslint/indent */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScreenContainer from 'src/components/screen-container';
import FABButton from 'src/components/button/fab';
import SectionReviewList from 'src/containers/review-list/section';

import colors from 'src/theme/colors';
import { SCREEN_NAMES } from 'src/navigation/constants';
import { withThrottle } from 'src/utils/timers';

import {
  ReviewsMainScreenAppState,
  ReviewsMainScreenAppProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';
import styles from './styles';

class MainScreen extends Component<
  ReviewsMainScreenAppProps,
  ReviewsMainScreenAppState
> {
  unsubscribeFocus: any;

  unsubscribeBlur: any;

  state = {
    showFAB: true,
  };

  openCreateInApp = withThrottle(() => {
    this.props.navigation.push(SCREEN_NAMES.createInApp);
  });

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribeFocus = navigation.addListener('focus', () => {
      this.setState({ showFAB: true });
    });
    this.unsubscribeBlur = navigation.addListener('blur', () => {
      this.setState({ showFAB: false });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
    this.unsubscribeBlur();
  }

  openCreateFromExternal = () => {
    this.props.navigation.push(SCREEN_NAMES.createExternalForm);
  };

  render() {
    const { showFAB } = this.state;
    const { navigation, reviews } = this.props;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SectionReviewList data={[...reviews]} navigation={navigation} />
        <FABButton
          isVisible={showFAB}
          options={[
            {
              icon: 'cellphone',
              label: 'in App',
              onPress: this.openCreateInApp,
              color: colors.white,
              style: { backgroundColor: colors.pistonBlue },
            },
            // {
            //   icon: 'link',
            //   label: 'External',
            //   onPress: this.openCreateFromExternal,
            //   color: colors.white,
            //   style: { backgroundColor: colors.shamrock },
            // },
          ]}
        />
      </ScreenContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
