import React from 'react';
import { View } from 'react-native';
import { Headline, Caption, Button, Subheading } from 'react-native-paper';

import ScreenContainer from 'src/components/screen-container';

import { getReviewTypeColor } from 'src/theme/helpers';

import styles from './styles';

function ReviewDetails(props: any) {
  // const { type, name, link } = this.state;
  const { route, navigation } = props;

  const onFinish = () => navigation.popToTop();

  return (
    <ScreenContainer containerStyle={styles.container}>
      <View key="1" style={styles.firstPage}>
        <View>
          <Headline style={styles.title}>First page</Headline>
          <Caption style={styles.averageText}>10h 10m</Caption>
        </View>
        <Subheading style={styles.questionsCompleted}>10/10</Subheading>
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

export default ReviewDetails;
