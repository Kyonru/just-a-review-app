import moment from 'moment';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
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
import { useActionSheet } from '@expo/react-native-action-sheet';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenContainer from 'src/components/screen-container';
import ListSeparator from 'src/components/separator';

import { getReviewTypeColor } from 'src/theme/helpers';
import { convertMinutesToAverageTime } from 'src/utils/time';
import { capitalize } from 'src/utils/strings';
import { ReviewQuestion } from 'src/@types/index';
import { deleteLog } from 'src/store/logs/actions';

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
      <Paragraph>{log.answer?.content.trim()}</Paragraph>
    </View>
  );
}

function ReviewLogScreenProcess(props: ReviewLogScreenProps) {
  const { route, navigation } = props;
  const { params } = route;
  const { review, log } = params;
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const onDelete = () => {
    deleteLog(review.id, log.id)(dispatch);
    navigation.pop();
  };

  const openOptionsMenu = () => {
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 3;

    const mapOption: { [key: number]: Function } = {
      0: onDelete,
    };

    const contextMenuOptions = ['Delete'];

    const contextMenuOptionIcons = [
      <MaterialIcon color="red" name="delete" size={24} />,
    ];

    showActionSheetWithOptions(
      {
        options: contextMenuOptions,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle: { alignSelf: 'center', lineHeight: 24 },
        icons: contextMenuOptionIcons,
      },
      buttonIndex => {
        if (mapOption[buttonIndex]) {
          mapOption[buttonIndex]();
        }
      },
    );
  };

  useEffect(() => {
    navigation.setParams({
      headerRightIcon: 'dots-vertical',
      headerRightOnPress: openOptionsMenu,
    });
  }, []);

  return (
    <ScreenContainer
      containerProps={{ testID: 'log_details_screen' }}
      containerStyle={styles.container}
    >
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
