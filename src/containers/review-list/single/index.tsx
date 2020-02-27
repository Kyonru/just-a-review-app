import React, {Component} from 'react';
import {FlatList} from 'react-native';

import {Review} from 'src/@types';
import ReviewListItem from 'src/components/review/list-item/index';

import {BaseReviewListProps} from '../props';
import ListSeparator from 'src/components/separator/index';

class SingleReviewList extends Component<Props> {
  renderCard = ({item}: {item: Review}) => {
    return <ReviewListItem data={item} />;
  };

  renderSeparator = () => {
    return <ListSeparator />;
  };

  render() {
    return (
      <FlatList
        ItemSeparatorComponent={this.renderSeparator}
        data={this.props.data}
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
