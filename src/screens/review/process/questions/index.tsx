import * as React from 'react';
import { Alert, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Headline, Caption, TextInput, Card, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ScreenContainer from 'src/components/screen-container';
import Dots from 'src/components/dots';

import { ReviewQuestion } from 'src/@types';
import { SCREEN_NAMES } from 'src/navigation/constants';
import colors from 'src/theme/colors';
import { createAnswer } from 'src/utils/questions';
import { convertMinutesToHourString } from 'src/utils/time';
import { withThrottle } from 'src/utils/timers';

import styles from './styles';

class ReviewProcessQuestions extends React.Component<any> {
  state = {
    review: this.props.route.params.review,
    questions: this.props.route.params.review.questions,
    duration: 0,
    currentPage: 0,
  };

  counter: number = 0;

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
  }

  componentWillUnmount() {
    this.onBlur();
    this.onFocusListener();
    this.onBlurListener();
    this.onBeforeRemoveListener();
  }

  onGoingBack = (e: any) => {
    // Prevent default behavior of leaving the screen
    e.preventDefault();

    // Prompt the user before leaving the screen
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => this.props.navigation.dispatch(e.data.action),
        },
      ],
    );
  };

  onFocus = () => {
    this.setButtons();
    clearInterval(this.counter);
    this.counter = 0;
    this.startCounter();
  };

  onBlur = () => {
    clearInterval(this.counter);
    this.counter = 0;
  };

  onFinish = withThrottle(() => {
    const { navigation } = this.props;
    const { review, questions, duration } = this.state;

    navigation.push(SCREEN_NAMES.reviewProcessEnd, {
      duration,
      review: { ...review, questions },
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

  renderQuestion = (question: ReviewQuestion, index: number) => {
    const { questions } = this.state;
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
              {question.required ? 'required' : ''}
            </Caption>

            <Card style={styles.card} onPress={this.onInputFocus(index)}>
              <TextInput
                ref={this.questionInputs[index]}
                multiline
                underlineColor="transparent"
                style={styles.answerInput}
                value={question.answer?.content}
                onChangeText={this.updateQuestionAnswer(question)}
                theme={{ colors: { primary: colors.lynch } }}
              />
            </Card>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'flex-end',
            }}
          >
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

export default ReviewProcessQuestions;
