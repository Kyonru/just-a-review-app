import React, { Component } from 'react';
import { SectionList, SectionListData, View } from 'react-native';
import { List } from 'react-native-paper';

import { Review } from 'src/@types';
import ReviewListItem from 'src/components/review/list-item';
import ListSeparator from 'src/components/separator';
import { SCREEN_NAMES } from 'src/navigation/constants';
import EmptyState from 'src/components/empty-state';
import resources from 'src/resources';

import styles from './styles';
import { BaseReviewListProps } from '../props';

class SectionReviewList extends Component<Props> {
  openDetails = (review: Review) => {
    this.props.navigation.push(SCREEN_NAMES.reviewDetails, { review });
  };

  renderCard = ({ item }: { item: Review }) => {
    return (
      <ReviewListItem onPress={value => this.openDetails(value)} data={item} />
    );
  };

  renderHeader = ({ section }: { section: SectionListData<Review> }) => {
    return (
      <View style={styles.sectionTitle}>
        <List.Subheader>{section.title}</List.Subheader>
      </View>
    );
  };

  renderSeparator = () => {
    return <ListSeparator />;
  };

  renderEmpty = () => {
    const { onPressEmptyState } = this.props;
    return (
      <EmptyState
        title="There are no reviews."
        description="Create a review and it will show up here! ✏️"
        art={resources.images.emptyStates.start}
        onPress={onPressEmptyState}
      />
    );
  };

  render() {
    const { data } = this.props;

    if (!data.length) {
      return this.renderEmpty();
    }

    return (
      <SectionList
        sections={data}
        keyExtractor={(item, index) => `${item.title}${item.type}${index}`}
        renderSectionHeader={this.renderHeader}
        renderItem={this.renderCard}
        ItemSeparatorComponent={this.renderSeparator}
        SectionSeparatorComponent={this.renderSeparator}
      />
    );
  }
}

interface Props extends BaseReviewListProps {
  data: SectionListData<Review>[];
  navigation: any;
  onPressEmptyState?(): void;
}

export default SectionReviewList;
