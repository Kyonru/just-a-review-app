import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Headline,
  Caption,
  Subheading,
  Paragraph,
  Title,
  Text,
  Badge,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';

import { getReviewTypeColor } from 'src/theme/helpers';
import { convertMinutesToAverageTime } from 'src/utils/time';
import { capitalize } from 'src/utils/strings';
import { ReviewQuestion } from 'src/@types/index';

import styles from './styles';
import {
  ReviewLogScreenProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';

function LogQuestion(log: ReviewQuestion) {
  return (
    <View key={log.id}>
      <ListSeparator />
      <Title>{log.q}</Title>
      <Paragraph>{log.answer?.content}</Paragraph>
    </View>
  );
}

function ReviewLogScreenProcess(props: ReviewLogScreenProps) {
  const { route } = props;
  const { params } = route;
  const { review, log } = params;

  return (
    <ScreenContainer containerStyle={styles.container}>
      <ScrollView>
        <View key="1" style={styles.firstPage}>
          <View>
            <Headline style={styles.title}>{review.title}</Headline>
            <Badge
              size={30}
              style={[
                {
                  backgroundColor: getReviewTypeColor(review.type),
                },
                styles.type,
              ]}
              visible
            >
              {capitalize(review.type)}
            </Badge>
            <ListSeparator />
            <Subheading>Duration</Subheading>
            <Caption style={styles.averageText}>
              {convertMinutesToAverageTime(log.duration)}
            </Caption>
            <ListSeparator />
            <Text style={styles.date}>
              {moment(log.date).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
            {log.questions.map(LogQuestion)}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReviewLogScreenProcess);
