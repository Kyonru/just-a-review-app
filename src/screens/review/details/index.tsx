import moment from 'moment';
import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {
  Avatar,
  List,
  Headline,
  Caption,
  FAB,
  Title,
} from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ScreenContainer from 'src/components/screen-container';

import { getReviewTypeColor } from 'src/theme/helpers';
import { SCREEN_NAMES } from 'src/navigation/constants';
import { Review, ReviewType, ReviewLog } from 'src/@types';
import { convertMinutesToAverageTime } from 'src/utils/time';
import { getReviewAverageTime } from 'src/utils/reviews';
import { getAnsweredCount } from 'src/utils/questions';
import colors from 'src/theme/colors';

import styles from './styles';

const { timing } = Animated;

class ReviewDetails extends Component<{
  review: Review;
  navigation: any;
  route: any;
}> {
  y = new Animated.Value(20);

  x = new Animated.Value(1);

  isGoingUp: boolean = false;

  shouldAnimateSwipeUp: number = 2;

  viewPager = React.createRef<ViewPager>();

  constructor(props: any) {
    super(props);

    const config = {
      duration: 500,
      toValue: 120,
      easing: Easing.inOut(Easing.ease),
    };

    setInterval(() => {
      if (this.shouldAnimateSwipeUp > 0) {
        if (this.isGoingUp) {
          timing(this.y, { ...config, toValue: 20 }).start();
          timing(this.x, { ...config, toValue: 1.5 }).start();
          this.isGoingUp = false;
          this.shouldAnimateSwipeUp -= 1;
        } else {
          timing(this.y, { ...config, toValue: 0 }).start();
          timing(this.x, { ...config, toValue: 1 }).start();
          this.isGoingUp = true;
        }
      }
    }, 500);
  }

  openProcess = () => {
    this.props.navigation.push(SCREEN_NAMES.reviewProcessQuestions, {
      review: this.props.route.params.review,
    });
  };

  openLogs = () => {
    if (this.viewPager.current) {
      this.viewPager.current.setPage(1);
    }
  };

  openLogDetail = (item: ReviewLog) => () => {
    this.props.navigation.push(SCREEN_NAMES.reviewLogDetail, {
      review: this.props.route.params.review,
      log: item,
    });
  };

  renderLogItem = ({ item }: { item: ReviewLog }) => {
    return (
      <List.Item
        title={moment(item.date).calendar()}
        description={`Duration: ${convertMinutesToAverageTime(item.duration)}`}
        style={styles.logItem}
        onPress={this.openLogDetail(item)}
        right={() => (
          <Avatar.Text
            size={24}
            style={styles.logItemRight}
            label={`${getAnsweredCount(item.questions)}`}
            theme={{ colors: { primary: colors.lynch } }}
          />
        )}
      />
    );
  };

  renderDetails = () => {
    const { route } = this.props;
    const { params } = route;
    const { review } = params;
    return (
      <View key="1" style={styles.firstPage}>
        <Headline style={styles.title}>{review.title}</Headline>
        <Caption style={styles.averageText}>
          Average time:{'\n'}
          {convertMinutesToAverageTime(getReviewAverageTime(review))}
        </Caption>

        <TouchableOpacity onPress={this.openProcess}>
          <View style={styles.playButtonContainer}>
            <FAB
              style={styles.playButton}
              icon="play"
              theme={{
                colors: { accent: getReviewTypeColor(ReviewType.yearly) },
              }}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.swipeUpIndicator}>
          <Animated.View
            style={[
              {
                transform: [{ translateY: this.y }, { scaleX: this.x }],
              },
            ]}
          >
            <Icon onPress={this.openLogs} name="keyboard-arrow-up" size={38} />
          </Animated.View>
        </View>
      </View>
    );
  };

  renderLogs = () => {
    const { route } = this.props;
    const { params } = route;
    const { review } = params;
    return (
      <View key="2">
        <FlatList
          ListHeaderComponent={<Title>Review Logs</Title>}
          ListHeaderComponentStyle={{ padding: 16 }}
          keyExtractor={item => item.id}
          data={review.logs}
          renderItem={this.renderLogItem}
        />
      </View>
    );
  };

  render() {
    return (
      <ScreenContainer containerStyle={styles.container}>
        <ViewPager
          ref={this.viewPager}
          style={styles.viewPager}
          initialPage={0}
          orientation="vertical"
        >
          {this.renderDetails()}
          {this.renderLogs()}
        </ViewPager>
      </ScreenContainer>
    );
  }
}

export default ReviewDetails;
