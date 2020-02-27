import React, {Component} from 'react';
import {View} from 'react-native';
import {FAB, TextInput} from 'react-native-paper';

import Dropdown from 'src/components/dropdown';
import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';

import {ReviewType} from 'src/@types';
import colors from 'src/theme/colors';
import {ReviewTypesAsOptions} from 'src/data/review';

import styles from './styles';

class CreateInAppReview extends Component {
  state = {
    name: '',
    type: ReviewType.weekly,
    questions: [],
    currentQuestion: '',
    day: '',
    time: '',
  };

  onSelect = (value: string) => {
    this.setState({
      type: value,
    });
  };

  onAddQuestion = () => {};

  render() {
    return (
      <ScreenContainer containerStyle={styles.container}>
        <Dropdown
          label="Email"
          options={ReviewTypesAsOptions}
          onSelect={this.onSelect}
          selectedValue={this.state.type}
        />
        <ListSeparator />
        <TextInput
          mode={'outlined'}
          selectionColor={colors.lynch}
          label="Name"
          value={this.state.name}
          onChangeText={name => this.setState({name})}
          theme={{colors: {primary: colors.lynch}}}
        />
        <ListSeparator />
        <View style={styles.questionInputContainer}>
          <TextInput
            style={styles.questionInput}
            mode={'outlined'}
            selectionColor={colors.lynch}
            label="Question"
            value={this.state.currentQuestion}
            onChangeText={currentQuestion => this.setState({currentQuestion})}
            theme={{colors: {primary: colors.lynch}}}
          />
          <FAB small icon="plus" onPress={this.onAddQuestion} />
        </View>
      </ScreenContainer>
    );
  }
}

export default CreateInAppReview;
