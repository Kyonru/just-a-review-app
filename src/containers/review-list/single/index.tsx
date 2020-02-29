import React, { Component } from 'react';
import { FlatList } from 'react-native';

import { Review } from 'src/@types';
import ReviewListItem from 'src/components/review/list-item/index';

import ListSeparator from 'src/components/separator/index';
import { BaseReviewListProps } from '../props';

class SingleReviewList extends Component<Props> {
  renderCard = ({ item }: { item: Review }) => {
    return <ReviewListItem data={item} />;
  };

  renderSeparator = () => {
    return <ListSeparator />;
  };

  render() {
    const { data } = this.props;
    return (
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={data}
        renderItem={this.renderCard}
        keyExtractor={(item, index) => `${item.title}${item.type}${index}`}
      />
    );
  }
}

interface Props extends BaseReviewListProps {
  data: Review[];
}

export default SingleReviewList;
