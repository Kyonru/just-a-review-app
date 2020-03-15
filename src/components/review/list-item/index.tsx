import React, { Component } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

import { getReviewTypeColor } from 'src/theme/helpers';
import { ReviewType } from 'src/@types';
import { withThrottle } from 'src/utils/timers';

import { ReviewListItemProps } from './props';
import styles from './styles';

class ReviewListItem extends Component<ReviewListItemProps> {
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

  render() {
    const { data } = this.props;
    return (
      <Card onPress={this.onPress} style={this.style}>
        <Card.Content style={styles.card}>
          <Title>{data.title}</Title>
          <Paragraph>{(data.questions || []).length}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default ReviewListItem;
