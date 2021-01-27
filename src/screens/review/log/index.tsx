import moment from 'moment';
import React, { useEffect, memo } from 'react';
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
import {
  ReviewQuestion,
  ReviewQuestionOption,
  ReviewQuestionType,
} from 'src/@types/index';
import { deleteLog } from 'src/store/logs/actions';
import { LocalizationContext } from 'src/services/i18n';

import styles from './styles';
import {
  ReviewLogScreenProps,
  mapStateToProps,
  mapDispatchToProps,
} from './props';

const IconNameOff: { [key: string]: string } = {
  [ReviewQuestionType.Choice]: 'checkbox-blank-circle-outline',
  [ReviewQuestionType.Select]: 'checkbox-blank-outline',
  [ReviewQuestionType.List]: 'check',
};

const IconNameOn: { [key: string]: string } = {
  [ReviewQuestionType.Choice]: 'checkbox-marked-circle',
  [ReviewQuestionType.Select]: 'checkbox-marked',
  [ReviewQuestionType.List]: 'check',
};

const formatAnswer = (type: ReviewQuestionType, value?: string) => {
  if (!value) {
    return '';
  }

  if (type === ReviewQuestionType.Time) {
    return moment(value).format('LT');
  }

  if (type === ReviewQuestionType.Date) {
    return moment(value).format('ll');
  }

  return value;
};

const renderOption = (log: ReviewQuestion) => (
  option: ReviewQuestionOption,
) => {
  if (!option.value) {
    return null;
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <MaterialIcon
        color="black"
        name={option.value ? IconNameOn[log.type] : IconNameOff[log.type]}
        size={24}
        style={{ marginRight: 8 }}
      />
      <Paragraph
        style={{
          textDecorationLine:
            option.value || log.type === ReviewQuestionType.List
              ? 'none'
              : 'line-through',
        }}
      >
        {option.label}
      </Paragraph>
    </View>
  );
};

function LogQuestion(log: ReviewQuestion) {
  if (
    log.type === ReviewQuestionType.Choice ||
    log.type === ReviewQuestionType.List ||
    log.type === ReviewQuestionType.Select
  ) {
    return (
      <View key={log.id}>
        <ListSeparator />
        <Title>{log.q}</Title>
        {log.answer?.options?.map(renderOption(log))}
      </View>
    );
  }

  return (
    <View key={log.id}>
      <ListSeparator />
      <Title>{log.q}</Title>
      <Paragraph>
        {formatAnswer(log.type, `${log.answer?.content}`.trim())}
      </Paragraph>
    </View>
  );
}

function ReviewLogScreenProcess(props: ReviewLogScreenProps) {
  const { route, navigation } = props;
  const { params } = route;
  const { review, log } = params;
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const { translate, strings } = React.useContext(LocalizationContext);

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

    const contextMenuOptions = [translate(strings.delete)];

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
              {capitalize(translate(review.type))}
            </Badge>
            <ListSeparator />
            <Subheading>{translate(strings.duration)}</Subheading>
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
)(memo(ReviewLogScreenProcess));
