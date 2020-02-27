import React, {Component} from 'react';
import {SectionList, SectionListData, View} from 'react-native';
import {List} from 'react-native-paper';

import {Review} from 'src/@types';
import ReviewListItem from 'src/components/review/list-item';
import ListSeparator from 'src/components/separator';

import styles from './styles';
import {BaseReviewListProps} from '../props';

class SectionReviewList extends Component<Props> {
  renderCard = ({item}: {item: Review}) => {
    return <ReviewListItem data={item} />;
  };

  renderHeader = ({section}: {section: SectionListData<Review>}) => {
    return (
      <View style={styles.sectionTitle}>
        <List.Subheader>{section.title}</List.Subheader>
      </View>
    );
  };

  renderSeparator = () => {
    return <ListSeparator />;
  };

  render() {
    return (
      <SectionList
        sections={this.props.data}
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
}

export default SectionReviewList;
