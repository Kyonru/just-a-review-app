import React, { Component } from 'react';

import ScreenContainer from 'src/components/screen-container';
import FABButton from 'src/components/button/fab';
import SectionReviewList from 'src/containers/review-list/section';

import { getSectionsFromReviewDates } from 'src/utils/reviews';
import { MockDatedReviewLists } from 'src/data/mock';

import colors from 'src/theme/colors';
import { SCREEN_NAMES } from 'src/navigation/constants';
import styles from './styles';

class MainScreen extends Component<any> {
  unsubscribeFocus: any;

  state = {
    showFAB: true,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.unsubscribeFocus = navigation.addListener('focus', () => {
      this.setState({ showFAB: true });
    });
    this.unsubscribeFocus = navigation.addListener('blur', () => {
      this.setState({ showFAB: false });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  openCreateInApp = () => {
    this.props.navigation.push(SCREEN_NAMES.createInApp);
  };

  openCreateFromExternal = () => {
    this.props.navigation.push(SCREEN_NAMES.createExternalForm);
  };

  render() {
    const { showFAB } = this.state;
    const { navigation } = this.props;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SectionReviewList
          data={getSectionsFromReviewDates(MockDatedReviewLists)}
          navigation={navigation}
        />
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
            {
              icon: 'link',
              label: 'External',
              onPress: this.openCreateFromExternal,
              color: colors.white,
              style: { backgroundColor: colors.shamrock },
            },
          ]}
        />
      </ScreenContainer>
    );
  }
}

export default MainScreen;
