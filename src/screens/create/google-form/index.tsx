import React, { Component } from 'react';

import ScreenContainer from 'src/components/screen-container';

import Dropdown from 'src/components/dropdown';
import { ReviewTypesAsOptions } from 'src/data/review';
import { ReviewType } from 'src/@types/index';

import styles from './styles';

class CreateGoogleFormReview extends Component {
  state = {
    // name: '',
    type: ReviewType.weekly,
    // day: '',
    // time: '',
  };

  onSelect = (value: string) => {
    this.setState({
      type: value,
    });
  };

  render() {
    const { type } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <Dropdown
          label="Type"
          options={ReviewTypesAsOptions}
          onSelect={this.onSelect}
          selectedValue={type}
        />
      </ScreenContainer>
    );
  }
}

export default CreateGoogleFormReview;
