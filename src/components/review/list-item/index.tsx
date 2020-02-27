import React, {Component} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';

import {getReviewTypeColor} from 'src/theme/helpers';
import {ReviewType} from 'src/@types';

import {ReviewListItemProps} from './props';
import styles from './styles';

class ReviewListItem extends Component<ReviewListItemProps> {
  style: any;

  getStyle = (type: ReviewType) => {
    return {
      ...styles.container,
      backgroundColor: getReviewTypeColor(type),
    };
  };

  constructor(props: ReviewListItemProps) {
    super(props);
    this.style = this.getStyle(props.data.type);
  }

  render() {
    return (
      <Card onPress={this.props.onPress} style={this.style}>
        <Card.Content style={styles.card}>
          <Title>{this.props.data.title}</Title>
          <Paragraph>{(this.props.data.questions || []).length}</Paragraph>
        </Card.Content>
      </Card>
    );
  }
}

export default ReviewListItem;
