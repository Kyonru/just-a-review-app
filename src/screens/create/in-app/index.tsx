/* eslint-disable @typescript-eslint/indent */
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox, FAB, TextInput } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dropdown from 'src/components/dropdown';
import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';
import DatePicker from 'src/components/date-picker';

import { ReviewType, ReviewQuestion, DayOfTheWeek } from 'src/@types';

import { daysOfTheWeek } from 'src/data/date';
import { ReviewTypesAsOptions } from 'src/data/review';
import colors from 'src/theme/colors';
import { getReviewTypeColor } from 'src/theme/helpers';
import { createQuestion } from 'src/utils/questions';
import { createReview } from 'src/utils/reviews';

import {
  CreateInAppState,
  CreateInAppProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';
import styles from './styles';

class CreateInAppReview extends Component<CreateInAppProps, CreateInAppState> {
  state = {
    name: '',
    type: ReviewType.weekly,
    questions: [],
    currentQuestion: '',
    date: new Date(),
    day: DayOfTheWeek.monday,
    time: new Date(),
    monthlyDay: 1,
  };

  onSave = () => {
    const { name, type, questions, date, day, time, monthlyDay } = this.state;
    const { navigation, addReview } = this.props;
    addReview(
      createReview({
        name,
        type,
        questions,
        date,
        day,
        time,
        monthlyDay,
      }),
    );
    navigation.pop();
  };

  onTypeSelect = (value: string) => {
    this.setState({
      type: value as ReviewType,
    });
  };

  onDaySelect = (value: string) => {
    this.setState({
      day: value as DayOfTheWeek,
    });
  };

  onMonthlyDayChange = (newDay: string) => {
    if (newDay === '') {
      this.setState({
        monthlyDay: newDay,
      });
      return;
    }
    let day = parseInt(newDay, 10) || 1;
    if (day > 31) {
      day = 31;
    }
    if (day <= 0) {
      day = 1;
    }

    this.setState({
      monthlyDay: day,
    });
  };

  defaultMonthlyDay = () => {
    const { monthlyDay } = this.state;
    if ((monthlyDay as any) === '') {
      this.setState({ monthlyDay: 1 });
    }
  };

  onAddQuestion = () => {
    const { questions, currentQuestion } = this.state;
    if (!currentQuestion) {
      return;
    }
    this.setState({
      questions: [...questions, createQuestion(currentQuestion)],
      currentQuestion: '',
    });
  };

  onCheckQuestion = (item: ReviewQuestion) => () => {
    const { questions } = this.state;
    const index = questions.findIndex(
      (value: ReviewQuestion) => value.id === item.id,
    );

    this.setState({
      questions: [
        ...questions.slice(0, index),
        { ...item, required: !item.required },
        ...questions.slice(index + 1),
      ],
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
        onPress={this.onCheckQuestion(item)}
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
            onPress={this.onCheckQuestion(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderExtraInputs = () => {
    const { type, date, day, time, monthlyDay } = this.state;
    const fields: any[] = [];
    if (type === ReviewType.yearly) {
      fields.push(
        <View key="dateTimePicker">
          <DatePicker
            label="Date"
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={moment.utc(date).toDate()}
            is24Hour
            display="default"
            onChange={(event, newDate) => {
              this.setState({ date: newDate! });
            }}
            displayValue={moment.utc(date).format('ll')}
            maximumDate={moment(date)
              .endOf('year')
              .toDate()}
            minimumDate={moment(date)
              .startOf('year')
              .toDate()}
          />
          <ListSeparator />
        </View>,
      );
    }
    if (type === ReviewType.monthly) {
      fields.push(
        <View key="monthlyDayInput">
          <TextInput
            mode="outlined"
            selectionColor={colors.lynch}
            label="Review Day"
            value={`${monthlyDay}`}
            keyboardType="number-pad"
            onChangeText={this.onMonthlyDayChange}
            theme={{ colors: { primary: colors.lynch } }}
            onBlur={this.defaultMonthlyDay}
          />
          <ListSeparator />
        </View>,
      );
    }
    if (type === ReviewType.weekly) {
      fields.push(
        <View key="dayPicker">
          <Dropdown
            label="Day"
            options={daysOfTheWeek}
            onSelect={this.onDaySelect}
            selectedValue={day}
          />
          <ListSeparator />
        </View>,
      );
    }

    fields.push(
      <View key="timePicker">
        <DatePicker
          label="Date"
          mode="time"
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={time}
          is24Hour
          display="clock"
          onChange={(event, newTime) => {
            this.setState({ time: newTime! });
          }}
          displayValue={moment.utc(time).format('LT')}
        />
        <ListSeparator />
      </View>,
    );
    return fields;
  };

  render() {
    const { type, name, currentQuestion, questions } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <Dropdown
          label="Review Type"
          options={ReviewTypesAsOptions}
          onSelect={this.onTypeSelect}
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
        {this.renderExtraInputs()}
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
          <FAB
            small
            icon="plus"
            disabled={!currentQuestion}
            onPress={this.onAddQuestion}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateInAppReview);
