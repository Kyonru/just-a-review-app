import React, {Component} from 'react';

import ScreenContainer from 'src/components/screen-container';
import FABButton from 'src/components/button/fab';
import SectionReviewList from 'src/containers/review-list/section';

import {getSectionsFromReviewDates} from 'src/utils/reviews';
import {MockDatedReviewLists} from 'src/data/mock';

import styles from './styles';
import colors from 'src/theme/colors';
import {SCREEN_NAMES} from 'src/navigation/constants';

class MainScreen extends Component<any> {
  unsubscribeFocus: any;

  state = {
    showFAB: true,
  };

  componentDidMount() {
    this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this.setState({showFAB: true});
    });
    this.unsubscribeFocus = this.props.navigation.addListener('blur', () => {
      this.setState({showFAB: false});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  openCreateInApp = () => {
    this.props.navigation.push(SCREEN_NAMES.createInApp);
  };

  openCreateGoogleForm = () => {
    this.props.navigation.push(SCREEN_NAMES.createGoogleForm);
  };

  render() {
    return (
      <ScreenContainer containerStyle={styles.container}>
        <SectionReviewList
          data={getSectionsFromReviewDates(MockDatedReviewLists)}
        />
        <FABButton
          isVisible={this.state.showFAB}
          options={[
            {
              icon: 'cellphone',
              label: 'in App',
              onPress: this.openCreateInApp,
              color: colors.white,
              style: {backgroundColor: colors.pistonBlue},
            },
            {
              icon: 'comment',
              label: 'Google Form',
              onPress: this.openCreateGoogleForm,
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
