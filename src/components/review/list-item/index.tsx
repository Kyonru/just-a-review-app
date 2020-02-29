import React, { Component } from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';

import { getReviewTypeColor } from 'src/theme/helpers';
import { ReviewType } from 'src/@types';

import { ReviewListItemProps } from './props';
import styles from './styles';

class ReviewListItem extends Component<ReviewListItemProps> {
  style: any;

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
    const { onPress, data } = this.props;
    return (
      <Card onPress={onPress} style={this.style}>
        <Card.Content style={styles.card}>
          <Title>{data.title}</Title>
          <Paragraph>{(data.questions || []).length}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default ReviewListItem;
