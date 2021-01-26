/* eslint-disable @typescript-eslint/indent */
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  EmitterSubscription,
  Alert,
} from 'react-native';
import { Checkbox, FAB, TextInput, IconButton } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dropdown from 'src/components/dropdown';
import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';
import DatePicker from 'src/components/date-picker';

import { ReviewType, ReviewQuestion, DayOfTheWeek } from 'src/@types';

import { daysOfTheWeek } from 'src/data/date';
import { ReviewTypesAsOptions } from 'src/data/review';
import { SCREEN_NAMES } from 'src/navigation/constants';
import colors from 'src/theme/colors';
import { getReviewTypeColor } from 'src/theme/helpers';
import { createQuestion } from 'src/utils/questions';
import { createReview, updateReview } from 'src/utils/reviews';
import { withThrottle } from 'src/utils/timers';
import { LocalizationContext } from 'src/services/i18n';

import {
  CreateInAppState,
  CreateInAppProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';
import styles from './styles';

const DEFAULT_STATE: CreateInAppState = {
  name: '',
  type: ReviewType.weekly,
  questions: [],
  currentQuestion: '',
  date: moment().toDate(),
  day: moment()
    .format('dddd')
    .toLowerCase() as DayOfTheWeek,
  time: moment().toDate(),
  monthlyDay: 1,
  showFAB: true,
};

class CreateInAppReview extends Component<CreateInAppProps, CreateInAppState> {
  keyboardDidShowListener?: EmitterSubscription;

  keyboardDidHideListener?: EmitterSubscription;

  constructor(props: CreateInAppProps) {
    super(props);

    let editModeEnabled = false;
    let review;

    if (props && (props as any).route && (props as any).route.params) {
      editModeEnabled = (props as any).route.params.editModeEnabled;
      review = (props as any).route.params.review;
    }

    if (editModeEnabled && review) {
      let day: any = moment()
        .format('dddd')
        .toLowerCase() as DayOfTheWeek;

      day = !Number.isInteger(review.day) ? (review.day as DayOfTheWeek) : day;

      const monthlyDay: any = Number.isInteger(+review.day) ? review.day : 1;

      this.state = {
        day,
        monthlyDay,
        name: review.title,
        type: review.type,
        questions: review.questions,
        time: review.time,
        date: review.date || moment().toDate(),
        showFAB: true,
        currentQuestion: '',
      };

      const { translate, strings } = props.context;
      props.navigation.setOptions({ title: translate(strings.editReview) });
    } else {
      this.state = DEFAULT_STATE;
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener?.remove();
    this.keyboardDidHideListener?.remove();
  }

  onSave = withThrottle(() => {
    const { currentQuestion } = this.state;
    const { navigation, addReview, editReview } = this.props;

    let editModeEnabled = false;
    let review: any;

    if (
      this.props &&
      (this.props as any).route &&
      (this.props as any).route.params
    ) {
      editModeEnabled = (this.props as any).route.params.editModeEnabled;
      review = (this.props as any).route.params.review;
    }

    const add = (state: CreateInAppState) => {
      const { name, type, questions, date, day, time, monthlyDay } = state;

      if (editModeEnabled && review) {
        editReview(
          review.id,
          updateReview(review, {
            name,
            type,
            questions,
            date,
            day,
            time,
            monthlyDay: monthlyDay as number,
          }),
        );
      } else {
        addReview(
          createReview({
            name,
            type,
            questions,
            date,
            day,
            time,
            monthlyDay: monthlyDay as number,
          }),
        );
      }
      navigation.pop();
    };

    if (currentQuestion) {
      const { translate, strings } = this.props.context;
      Alert.alert(translate(strings.wait), translate(strings.lastQuestion), [
        { text: translate(strings.noContinue), onPress: () => add(this.state) },
        { text: translate(strings.waitCancel) },
        {
          text: translate(strings.yesAddIt),
          onPress: () => this.onAddQuestion(undefined, add),
        },
      ]);
    } else {
      add(this.state);
    }
  });

  keyboardDidShow = () => {
    this.setState({
      showFAB: false,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      showFAB: true,
    });
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

  onAddQuestion = (
    event?: any,
    callback?: (state: CreateInAppState) => any,
  ) => {
    const { questions, currentQuestion } = this.state;
    if (!currentQuestion) {
      return;
    }
    this.setState(
      {
        questions: [...questions, createQuestion(currentQuestion)],
        currentQuestion: '',
      },
      () =>
        callback &&
        callback({
          ...this.state,
          questions: [...questions, createQuestion(currentQuestion)],
          currentQuestion: '',
        }),
    );
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

  onDeleteQuestion = (item: ReviewQuestion) => () => {
    const action = () => {
      const { questions } = this.state;
      const index = questions.findIndex(
        (value: ReviewQuestion) => value.id === item.id,
      );

      this.setState({
        questions: [
          ...questions.slice(0, index),
          ...questions.slice(index + 1),
        ],
      });
    };

    const { translate, strings } = this.props.context;

    Alert.alert(
      translate(strings.deleteQuestion),
      translate(strings.cantBeUndone),
      [
        { text: translate(strings.yes), onPress: action },
        { text: translate(strings.no) },
      ],
    );
  };

  openQuestion = (item: ReviewQuestion) => () => {
    const { questions } = this.state;
    const { navigation } = this.props;

    const index = questions.findIndex(
      (value: ReviewQuestion) => value.id === item.id,
    );

    navigation.navigate(SCREEN_NAMES.questionEdit, {
      question: item,
      onSaveChanges: (question: ReviewQuestion) => {
        this.setState({
          questions: [
            ...questions.slice(0, index),
            { ...question },
            ...questions.slice(index + 1),
          ],
        });
      },
    });
  };

  renderQuestion = ({ item, drag, isActive }: any) => {
    return (
      <TouchableOpacity
        testID="question_item"
        style={
          isActive
            ? styles.activeQuestionRowContainer
            : styles.questionRowContainer
        }
        onPress={this.openQuestion(item)}
        onLongPress={drag}
      >
        <View style={styles.questionRow}>
          <View style={styles.questionContainer}>
            <Icon
              style={styles.questionLeftIcon as any}
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
          <IconButton
            icon="close"
            color={colors.lynch}
            size={24}
            onPress={this.onDeleteQuestion(item)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderExtraInputs = () => {
    const { type, date, day, time, monthlyDay } = this.state;
    const fields: any[] = [];
    const { translate, strings } = this.props.context;
    if (type === ReviewType.yearly) {
      fields.push(
        <View key="dateTimePicker">
          <DatePicker
            label={translate(strings.date)}
            testID="dateTimePicker"
            value={moment(date).toDate()}
            is24Hour
            display="default"
            onChange={(event, newDate) => {
              this.setState({ date: newDate! });
            }}
            displayValue={moment(date).format('ll')}
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
            label={translate(strings.reviewDay)}
            value={`${monthlyDay}`}
            keyboardType="number-pad"
            onChangeText={this.onMonthlyDayChange}
            theme={{ colors: { primary: colors.lynch, background: 'white' } }}
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
            label={translate(strings.day)}
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
          label={translate(strings.time)}
          mode="time"
          testID="dateTimePicker"
          value={moment(time).toDate()}
          is24Hour
          display="clock"
          onChange={(event: any, newTime: any) => {
            this.setState({ time: newTime! });
          }}
          displayValue={moment(time).format('LT')}
        />
        <ListSeparator />
      </View>,
    );
    return fields;
  };

  render() {
    const { type, name, currentQuestion, questions, showFAB } = this.state;
    const { context } = this.props;
    const { translate, strings } = context;
    return (
      <ScreenContainer
        containerProps={{ testID: 'create_screen' }}
        containerStyle={styles.container}
      >
        <Dropdown
          label={translate(strings.reviewType)}
          options={ReviewTypesAsOptions}
          onSelect={this.onTypeSelect}
          selectedValue={type}
        />
        <ListSeparator />
        <TextInput
          testID="name_text_input"
          mode="outlined"
          selectionColor={colors.lynch}
          label={translate(strings.name)}
          value={name}
          onChangeText={reviewName => this.setState({ name: reviewName })}
          theme={{ colors: { primary: colors.lynch, background: 'white' } }}
        />
        <ListSeparator />
        {this.renderExtraInputs()}
        <View style={styles.questionInputContainer}>
          <TextInput
            testID="question_text_input"
            style={styles.questionInput}
            mode="outlined"
            selectionColor={colors.lynch}
            label={translate(strings.question)}
            value={currentQuestion}
            onChangeText={newQuestion =>
              this.setState({ currentQuestion: newQuestion })
            }
            onSubmitEditing={this.onAddQuestion}
            theme={{ colors: { primary: colors.lynch, background: 'white' } }}
          />
          <FAB
            small
            testID="add_question_button"
            icon="plus"
            disabled={!currentQuestion}
            onPress={this.onAddQuestion}
          />
        </View>
        <View style={styles.listContainer}>
          <DraggableFlatList
            testID="question_list"
            data={questions}
            renderItem={this.renderQuestion}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={({ data }) => this.setState({ questions: data })}
          />
        </View>
        <FAB
          testID="add_review_button"
          visible={showFAB}
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

const CreateWithContext = (props: any) => (
  <LocalizationContext.Consumer>
    {context => <CreateInAppReview context={context} {...props} />}
  </LocalizationContext.Consumer>
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateWithContext);
