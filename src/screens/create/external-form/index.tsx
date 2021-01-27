import React, { Component } from 'react';

import ScreenContainer from 'src/components/screen-container';
import { FAB, TextInput } from 'react-native-paper';

import Dropdown from 'src/components/dropdown';
import { ReviewTypesAsOptions } from 'src/data/review';
import { ReviewType } from 'src/@types/index';

import { getReviewTypeColor } from 'src/theme/helpers';
import colors from 'src/theme/colors';

import styles from './styles';

class CreateGoogleFormReview extends Component<any> {
  state = {
    name: '',
    type: ReviewType.weekly,
    link: '',
  };

  onSave = () => {
    this.props.navigation.pop();
  };

  onSelect = (value: string) => {
    this.setState({
      type: value,
    });
  };

  render() {
    const { type, name, link } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <Dropdown
          label="Type"
          options={ReviewTypesAsOptions}
          onSelect={this.onSelect}
          selectedValue={type}
        />
        <TextInput
          mode="outlined"
          selectionColor={colors.lynch}
          label="Name"
          value={name}
          onChangeText={reviewName => this.setState({ name: reviewName })}
          theme={{ colors: { primary: colors.lynch } }}
        />
        <TextInput
          key="linkInput"
          mode="outlined"
          selectionColor={colors.lynch}
          label="External Link"
          value={link}
          onChangeText={value => this.setState({ link: value })}
          theme={{ colors: { primary: colors.lynch } }}
        />
        <FAB
          disabled={!link}
          style={styles.fab}
          icon="check"
          onPress={this.onSave}
          theme={{ colors: { accent: getReviewTypeColor(type) } }}
        />
      </ScreenContainer>
    );
  }
}

export default CreateGoogleFormReview;
