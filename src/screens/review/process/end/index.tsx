import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Headline, Caption, Button, Subheading } from 'react-native-paper';

import ScreenContainer from 'src/components/screen-container';

import { getReviewTypeColor } from 'src/theme/helpers';
import { convertMinutesToAverageTime } from 'src/utils/time';
import { getAnsweredCount } from 'src/utils/questions';
import { withThrottle } from 'src/utils/timers';

import styles from './styles';
import { EndProcessProps, mapStateToProps, mapDispatchToProps } from './props';

function EndReviewProcess(props: EndProcessProps) {
  const { route, navigation, addLog } = props;
  const { params } = route;
  const { review, duration, startDate } = params;

  const onFinish = withThrottle(() => {
    addLog(review, duration, startDate);
    navigation.popToTop();
  });

  return (
    <ScreenContainer containerStyle={styles.container}>
      <View key="1" style={styles.firstPage}>
        <View>
          <Headline style={styles.title}>{review.title}</Headline>
          <Caption style={styles.averageText}>
            {convertMinutesToAverageTime(duration)}
          </Caption>
        </View>
        <Subheading style={styles.questionsCompleted}>
          {getAnsweredCount(review.questions)}/{review.questions.length}
        </Subheading>
        <Button
          color={getReviewTypeColor(route.params.review.type)}
          mode="contained"
          style={styles.finishButton}
          onPress={onFinish}
        >
          Finish
        </Button>
      </View>
    </ScreenContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EndReviewProcess);
