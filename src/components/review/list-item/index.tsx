import moment from 'moment';
import React, { PureComponent } from 'react';

import { Card, Title, Paragraph, Badge } from 'react-native-paper';

import { getReviewTypeColor } from 'src/theme/helpers';
import { ReviewType } from 'src/@types';
import { withThrottle } from 'src/utils/timers';
import { LocalizationContext } from 'src/services/i18n';

import { ReviewListItemProps } from './props';
import styles from './styles';

class ReviewListItem extends PureComponent<ReviewListItemProps> {
  style: any;

  onPress = withThrottle(
    () => this.props.onPress!(this.props.data) as any,
    1000,
  );

  constructor(props: ReviewListItemProps) {
    super(props);
    this.style = this.getStyle(props.data.type);
  }

  getStyle = (type: ReviewType) => {
    return {
      ...styles.container,
      backgroundColor: getReviewTypeColor(type),
    };
  };

  renderRight = () => {
    const { data } = this.props;
    if (
      moment(data.nextReminder)
        .add(1, 'hour')
        .isBefore(moment())
    ) {
      const { translate, strings } = this.context;
      return (
        <Badge style={styles.expiredBadge} visible>
          {translate(strings.expired)}
        </Badge>
      );
    }
    return <Paragraph>{(data.questions || []).length}</Paragraph>;
  };

  render() {
    const { data } = this.props;
    return (
      <Card testID="review_list_item" onPress={this.onPress} style={this.style}>
        <Card.Content style={styles.card}>
          <Title>{data.title}</Title>
          {this.renderRight()}
        </Card.Content>
      </Card>
    );
  }
}

ReviewListItem.contextType = LocalizationContext;

export default ReviewListItem;
