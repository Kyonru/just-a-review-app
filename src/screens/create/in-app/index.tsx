import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Checkbox, FAB, TextInput } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dropdown from 'src/components/dropdown';
import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';

import { ReviewType } from 'src/@types';
import colors from 'src/theme/colors';
import { ReviewTypesAsOptions } from 'src/data/review';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { createQuestion } from 'src/utils/questions';
import { getReviewTypeColor } from 'src/theme/helpers';
import styles from './styles';

class CreateInAppReview extends Component<any> {
  state = {
    name: '',
    type: ReviewType.weekly,
    questions: [],
    currentQuestion: '',
    // day: '',
    // time: '',
  };

  onSave = () => {
    this.props.navigation.pop();
  };

  onSelect = (value: string) => {
    this.setState({
      type: value,
    });
  };

  onAddQuestion = () => {
    const { questions, currentQuestion } = this.state;
    this.setState({
      questions: [...questions, createQuestion(currentQuestion)],
      currentQuestion: '',
    });
  };

  renderQuestion = ({ item, drag, isActive }: any) => {
    return (
      <TouchableOpacity
        style={
          isActive
            ? styles.activeQuestionRowContainer
            : styles.questionRowContainer
        }
        onLongPress={drag}
      >
        <View style={styles.questionRow}>
          <View style={styles.questionContainer}>
            <Icon
              style={styles.questionLeftIcon}
              color="black"
              name="drag-handle"
              size={28}
            />

            <Text
              style={styles.question}
              textBreakStrategy="simple"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.q}
            </Text>
          </View>

          <Checkbox
            status={item.required ? 'checked' : 'unchecked'}
            onPress={() => {
              // this.setState({ checked: !item.required });
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { type, name, currentQuestion, questions } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <Dropdown
          label="Email"
          options={ReviewTypesAsOptions}
          onSelect={this.onSelect}
          selectedValue={type}
        />
        <ListSeparator />
        <TextInput
          mode="outlined"
          selectionColor={colors.lynch}
          label="Name"
          value={name}
          onChangeText={reviewName => this.setState({ name: reviewName })}
          theme={{ colors: { primary: colors.lynch } }}
        />
        <ListSeparator />
        <View style={styles.questionInputContainer}>
          <TextInput
            style={styles.questionInput}
            mode="outlined"
            selectionColor={colors.lynch}
            label="Question"
            value={currentQuestion}
            onChangeText={newQuestion =>
              this.setState({ currentQuestion: newQuestion })
            }
            theme={{ colors: { primary: colors.lynch } }}
          />
          <FAB small icon="plus" onPress={this.onAddQuestion} />
        </View>
        <View style={styles.listContainer}>
          <DraggableFlatList
            data={questions}
            renderItem={this.renderQuestion}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={({ data }) => this.setState({ questions: data })}
          />
        </View>
        <FAB
          disabled={!questions.length}
          style={styles.fab}
          icon="check"
          onPress={this.onSave}
          theme={{ colors: { accent: getReviewTypeColor(type) } }}
        />
      </ScreenContainer>
    );
  }
}

export default CreateInAppReview;
