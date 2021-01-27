/* eslint-disable @typescript-eslint/indent */
import moment from 'moment';
import * as React from 'react';
import { Alert, View, FlatList, Keyboard } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {
  Headline,
  Caption,
  TextInput,
  FAB,
  Card,
  Button,
  List,
  Checkbox,
  RadioButton,
  IconButton,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

import ScreenContainer from 'src/components/screen-container';
import Dots from 'src/components/dots';
import DatePicker from 'src/components/date-picker';

import {
  ReviewQuestion,
  Review,
  ReviewQuestionType,
  ReviewQuestionOption,
} from 'src/@types';
import { SCREEN_NAMES } from 'src/navigation/constants';
import colors from 'src/theme/colors';
import {
  createAnswer,
  createOptionAnswer,
  createReviewQuestionOption,
  getAnsweredCount,
  isAnswerEmpty,
} from 'src/utils/questions';
import { convertMinutesToHourString } from 'src/utils/time';
import { withThrottle } from 'src/utils/timers';
import { LocalizationContext } from 'src/services/i18n';
import { capitalize } from 'src/utils/strings';

import styles from './styles';

interface ReviewProcessQuestionsState {
  review: Review;
  questions: ReviewQuestion[];
  duration: number;
  startDate?: string | null;
  currentPage: number;
  leaveConfirm: boolean;
}

class ReviewProcessQuestions extends React.PureComponent<
  any,
  ReviewProcessQuestionsState
> {
  state = {
    review: this.props.route.params.review,
    questions: this.props.route.params.review.questions as ReviewQuestion[],
    duration: 0,
    startDate: null,
    currentPage: 0,
    leaveConfirm: true,
  };

  counter: any = 0;

  viewPager = React.createRef<ViewPager>();

  questionInputs: { [key: number]: React.RefObject<any> } = {};

  onBlurListener: any;

  onFocusListener: any;

  onBeforeRemoveListener: any;

  constructor(props: any) {
    super(props);

    this.startCounter();
    this.setButtons();

    this.onFocusListener = props.navigation.addListener('focus', this.onFocus);
    this.onBlurListener = props.navigation.addListener('blur', this.onBlur);
    this.onBeforeRemoveListener = props.navigation.addListener(
      'beforeRemove',
      this.onGoingBack,
    );

    const { questions } = this.state;

    questions.forEach((question: ReviewQuestion, index: number) => {
      this.questionInputs[index] = React.createRef<typeof TextInput>();
    });

    this.setState({
      startDate: moment.now().toString(),
    });
  }

  componentWillUnmount() {
    this.onBlur();
    this.onFocusListener();
    this.onBlurListener();
    this.onBeforeRemoveListener();
  }

  onGoingBack = (e: any) => {
    const { leaveConfirm } = this.state;

    if (getAnsweredCount(this.state.questions) === 0 || !leaveConfirm) {
      return;
    }
    // Prevent default behavior of leaving the screen
    e.preventDefault();

    const { translate, strings } = this.context;
    // Prompt the user before leaving the screen
    Alert.alert(
      translate(strings.discardReview),
      translate(strings.discardReviewMessage),
      [
        {
          text: translate(strings.discard),
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => this.props.navigation.dispatch(e.data.action),
        },
        {
          text: translate(strings.dontLeave),
          style: 'cancel',
          onPress: () => {},
        },
      ],
    );
  };

  onFocus = () => {
    this.setButtons();
    clearInterval(this.counter);
    this.counter = 0;
    this.startCounter();
    this.setState({
      leaveConfirm: true,
    });
  };

  onBlur = () => {
    clearInterval(this.counter);
    this.counter = 0;
    Keyboard.dismiss();
    this.setState({
      leaveConfirm: false,
    });
  };

  onFinish = withThrottle(() => {
    const { navigation } = this.props;
    const { review, questions, duration, startDate } = this.state;

    const isInvalidReview = questions.some(
      question => question.required && isAnswerEmpty(question.answer),
    );

    const { translate, strings } = this.context;
    if (isInvalidReview) {
      return Alert.alert('', translate(strings.needToBeFilled));
    }

    return navigation.push(SCREEN_NAMES.reviewProcessEnd, {
      duration,
      review: { ...review, questions },
      startDate,
    });
  });

  startCounter = () => {
    this.counter = setInterval(() => {
      const { duration } = this.state;
      this.props.navigation.setOptions({
        title: convertMinutesToHourString(duration),
      });
      this.setState({ duration: duration + 1 });
    }, 1000);
  };

  setButtons = () => {
    const { navigation } = this.props;
    navigation.setParams({
      headerRightIcon: 'check',
      headerRightOnPress: this.onFinish,
    });
  };

  updateQuestionAnswer = (question: ReviewQuestion) => (answer: string) => {
    const { questions } = this.state;
    const index = questions.findIndex(
      (value: ReviewQuestion) => value.id === question.id,
    );

    this.setState({
      questions: [
        ...questions.slice(0, index),
        createAnswer(question, answer),
        ...questions.slice(index + 1),
      ],
    });
  };

  updateQuestionAnswerOptions = (
    question: ReviewQuestion,
    option: string,
  ) => () => {
    const { questions } = this.state;
    const index = questions.findIndex(
      (value: ReviewQuestion) => value.id === question.id,
    );

    this.setState({
      questions: [
        ...questions.slice(0, index),
        createOptionAnswer(
          { ...question, answer: { ...question.answer!, content: '' } },
          question.answer?.options?.concat(
            createReviewQuestionOption(option),
          ) || [createReviewQuestionOption(option)],
        ),
        ...questions.slice(index + 1),
      ],
    });
  };

  changePageTo = (page: number) => () => {
    this.viewPager.current?.setPage(page);
  };

  selectPage = (e: any) => {
    this.setState({
      currentPage: e.nativeEvent.position,
    });
    this.questionInputs[e.nativeEvent.position].current?.focus();
  };

  onInputFocus = (input: number) => () => {
    this.questionInputs[input].current?.focus();
  };

  updateOption = (questionIndex: number, optionId: string, value: boolean) => {
    const { questions } = this.state;
    const question = questions[questionIndex];

    const arr = question.answer?.options || question.options!;

    const index = arr.findIndex(
      (op: ReviewQuestionOption) => op.id === optionId,
    );
    const options = [
      ...arr.slice(0, index),
      { ...arr[index], value },
      ...arr.slice(index + 1),
    ];

    this.setState({
      questions: [
        ...questions.slice(0, questionIndex),
        createOptionAnswer(question, options),
        ...questions.slice(questionIndex + 1),
      ],
    });
  };

  selectOption = (questionIndex: number, optionId: string, value: boolean) => {
    const { questions } = this.state;
    const question = questions[questionIndex];

    const arr = question.answer?.options || question.options!;

    const index = arr.findIndex(
      (op: ReviewQuestionOption) => op.id === optionId,
    );
    const options = arr.map((op, i) => {
      if (i === index) {
        return { ...op, value };
      }
      return { ...op, value: false };
    });

    this.setState({
      questions: [
        ...questions.slice(0, questionIndex),
        createOptionAnswer(question, options),
        ...questions.slice(questionIndex + 1),
      ],
    });
  };

  renderOptionItem = (type: ReviewQuestionType, index: number) => ({
    item,
  }: {
    item: ReviewQuestionOption;
  }) => {
    if (type === ReviewQuestionType.Select) {
      return (
        <List.Item
          style={styles.item}
          title={item.label}
          left={() => (
            <Checkbox
              status={item.value ? 'checked' : 'unchecked'}
              onPress={() => {
                this.updateOption(index, item.id, !item.value);
              }}
            />
          )}
          onPress={() => {
            this.updateOption(index, item.id, !item.value);
          }}
        />
      );
    }
    if (type === ReviewQuestionType.Choice) {
      return (
        <List.Item
          style={styles.item}
          title={item.label}
          left={() => (
            <RadioButton
              value=""
              status={item.value ? 'checked' : 'unchecked'}
              onPress={() => {
                this.selectOption(index, item.id, !item.value);
              }}
            />
          )}
          onPress={() => {
            this.selectOption(index, item.id, !item.value);
          }}
        />
      );
    }
    return (
      <List.Item
        style={styles.item}
        title={item.label}
        right={() => (
          <IconButton
            icon="close"
            color={colors.lynch}
            size={24}
            onPress={() => {
              this.selectOption(index, item.id, !item.value);
            }}
          />
        )}
      />
    );
  };

  renderAnswerType = (question: ReviewQuestion, index: number) => {
    const { translate, strings } = this.context;
    if (question.type === ReviewQuestionType.Choice) {
      return (
        <FlatList
          data={question.answer?.options || question.options}
          renderItem={this.renderOptionItem(question.type, index)}
          keyExtractor={(item, i) => `${item.label}${item.id}${i}`}
        />
      );
    }

    if (question.type === ReviewQuestionType.Select) {
      return (
        <FlatList
          data={question.answer?.options || question.options}
          renderItem={this.renderOptionItem(question.type, index)}
          keyExtractor={(item, i) => `${item.label}${item.id}${i}`}
        />
      );
    }

    if (question.type === ReviewQuestionType.List) {
      return (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              testID="question_text_input"
              style={styles.listAnswerInput}
              mode="outlined"
              selectionColor={colors.lynch}
              label={capitalize(translate(strings.item))}
              value={question.answer?.content}
              onChangeText={this.updateQuestionAnswer(question)}
              theme={{ colors: { primary: colors.lynch } }}
            />
            <FAB
              small
              testID="add_question_button"
              icon="plus"
              disabled={!question.answer?.content}
              onPress={this.updateQuestionAnswerOptions(
                question,
                question.answer?.content || '',
              )}
            />
          </View>
          <FlatList
            data={question.answer?.options || []}
            renderItem={this.renderOptionItem(question.type, index)}
            keyExtractor={(item, i) => `${item.label}${item.id}${i}`}
          />
        </>
      );
    }

    if (question.type === ReviewQuestionType.Number) {
      return (
        <TextInput
          multiline
          underlineColor="transparent"
          style={styles.answerInput}
          value={question.answer?.content}
          onChangeText={this.updateQuestionAnswer(question)}
          theme={{ colors: { primary: colors.lynch } }}
          render={props => (
            <TextInputMask
              // @ts-ignore
              ref={this.questionInputs[index]}
              {...props}
              type="only-numbers"
            />
          )}
        />
      );
    }

    if (
      question.type === ReviewQuestionType.Date ||
      question.type === ReviewQuestionType.Time
    ) {
      const isTime = question.type === ReviewQuestionType.Time;
      return (
        <DatePicker
          label={isTime ? 'Time' : 'Date'}
          mode={isTime ? 'time' : 'date'}
          testID="dateTimePicker"
          value={moment(question.answer?.content).toDate()}
          is24Hour
          display={isTime ? 'clock' : 'default'}
          onChange={(event: any, newTime: any) => {
            this.updateQuestionAnswer(question)(newTime);
          }}
          displayValue={moment(question.answer?.content).format(
            isTime ? 'LT' : 'll',
          )}
        />
      );
    }

    return (
      <TextInput
        ref={this.questionInputs[index]}
        multiline
        underlineColor="transparent"
        style={styles.answerInput}
        value={question.answer?.content}
        onChangeText={this.updateQuestionAnswer(question)}
        theme={{ colors: { primary: colors.lynch } }}
      />
    );
  };

  renderQuestion = (question: ReviewQuestion, index: number) => {
    const { questions } = this.state;
    const { translate, strings } = this.context;
    return (
      <KeyboardAwareScrollView
        key={question.id}
        style={styles.firstPage}
        extraScrollHeight={200}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.flex}>
          <View style={styles.flex}>
            <Headline style={styles.title}>{question.q}</Headline>
            <Caption style={styles.averageText}>
              {question.required ? translate(strings.required) : ''}
            </Caption>

            <Card style={styles.card} onPress={this.onInputFocus(index)}>
              {this.renderAnswerType(question, index)}
            </Card>
          </View>
          <View style={styles.footer}>
            <Button
              mode="contained"
              style={{ marginRight: 8, display: index > 0 ? 'flex' : 'none' }}
              onPress={this.changePageTo(index - 1)}
            >
              {'<'}
            </Button>
            <Button
              style={{
                display: index !== questions.length - 1 ? 'flex' : 'none',
              }}
              mode="contained"
              onPress={this.changePageTo(index + 1)}
            >
              {'>'}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  render() {
    const { questions, currentPage } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
          ref={this.viewPager}
          onPageSelected={this.selectPage}
        >
          {questions.map(this.renderQuestion)}
        </ViewPager>
        <Dots count={questions.length} active={currentPage} />
      </ScreenContainer>
    );
  }
}

ReviewProcessQuestions.contextType = LocalizationContext;

export default ReviewProcessQuestions;
