import React, { Component } from 'react';
import { View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { Headline, Caption, TextInput, Card } from 'react-native-paper';

import ScreenContainer from 'src/components/screen-container';
import Dots from 'src/components/dots';

import { ReviewQuestion } from 'src/@types';
import { SCREEN_NAMES } from 'src/navigation/constants';
import colors from 'src/theme/colors';
import { createAnswer } from 'src/utils/questions';
import { convertMinutesToHourString } from 'src/utils/time';

import styles from './styles';

class ReviewProcessQuestions extends Component<any> {
  state = {
    review: this.props.route.params.review,
    questions: this.props.route.params.review.questions,
    duration: 0,
    currentPage: 0,
  };

  constructor(props: any) {
    super(props);

    setInterval(() => {
      const { duration } = this.state;
      props.navigation.setOptions({
        title: convertMinutesToHourString(duration),
      });
      this.setState({ duration: duration + 1 });
    }, 1000);

    this.setButtons();
  }

  onFinish = () => {
    const { navigation } = this.props;
    const { review, questions } = this.state;

    navigation.push(SCREEN_NAMES.reviewProcessEnd, {
      review: { ...review, questions },
    });
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

  selectPage = (e: any) => {
    this.setState({
      currentPage: e.nativeEvent.position,
    });
  };

  renderQuestion = (question: ReviewQuestion) => {
    return (
      <View key={question.id} style={styles.firstPage}>
        <Headline style={styles.title}>{question.q}</Headline>
        <Caption style={styles.averageText}>
          {question.required ? 'required' : ''}
        </Caption>

        <Card style={styles.card}>
          <TextInput
            multiline
            style={styles.answerInput}
            value={question.answer?.content}
            onChangeText={this.updateQuestionAnswer(question)}
            theme={{ colors: { primary: colors.lynch } }}
          />
        </Card>
      </View>
    );
  };

  render() {
    const { questions, currentPage } = this.state;
    return (
      <ScreenContainer containerStyle={styles.container}>
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
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
