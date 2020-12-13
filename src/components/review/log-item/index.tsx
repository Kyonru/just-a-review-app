import moment from 'moment';
import React, { Component } from 'react';
import { Avatar, List } from 'react-native-paper';

import { withThrottle } from 'src/utils/timers';
import colors from 'src/theme/colors';
import { getAnsweredCount } from 'src/utils/questions';
import { convertMinutesToAverageTime } from 'src/utils/time';

import { LogListItemProps } from './props';
import styles from './styles';

class LogListItem extends Component<LogListItemProps> {
  style: any;

  onPress = withThrottle(this.props.onPress, 1000);

  render() {
    const { data } = this.props;
    return (
      <List.Item
        testID="log_list_item"
        title={moment(data.date).calendar()}
        description={`Duration: ${convertMinutesToAverageTime(data.duration)}`}
        style={styles.logItem}
        onPress={this.onPress}
        right={() => (
          <Avatar.Text
            size={24}
            style={styles.logItemRight}
            label={`${getAnsweredCount(data.questions)}`}
            theme={{ colors: { primary: colors.lynch } }}
          />
        )}
      />
    );
  }
}

export default LogListItem;
