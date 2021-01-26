import React, { PureComponent } from 'react';
import { SectionList, SectionListData, View } from 'react-native';
import { List } from 'react-native-paper';

import { Review } from 'src/@types';
import ReviewListItem from 'src/components/review/list-item';
import ListSeparator from 'src/components/separator';
import { SCREEN_NAMES } from 'src/navigation/constants';
import EmptyState from 'src/components/empty-state';
import resources from 'src/resources';
import colors from 'src/theme/colors';
import { LocalizationContext } from 'src/services/i18n';

import styles from './styles';
import { BaseReviewListProps } from '../props';

class SectionReviewList extends PureComponent<Props, State> {
  state = {
    showHeader: !!this.props.showHeader,
  };

  openDetails = (review: Review) => {
    this.props.navigation.push(SCREEN_NAMES.reviewDetails, { review });
  };

  showHeader = () => {
    this.setState({ showHeader: true });
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

  renderListHeader = () => {
    const { showHeader } = this.state;
    const { header, onPressHeader } = this.props;
    if (!header || !showHeader) {
      return null;
    }

    return (
      <List.Item
        style={{
          backgroundColor: colors.archive,
        }}
        title={header.title}
        description={header.subtitle}
        left={props => <List.Icon {...props} icon={header.icon} />}
        onPress={onPressHeader}
      />
    );
  };

  renderSeparator = () => {
    return <ListSeparator />;
  };

  renderEmpty = () => {
    const { onPressEmptyState, header } = this.props;
    const { translate, strings } = this.context;

    return (
      <>
        {!!header && header.displayWhenEmpty ? this.renderListHeader() : null}
        <EmptyState
          viewProps={{ testID: 'emptyState' }}
          title={translate(strings.noReviews)}
          description={translate(strings.completeAReview)}
          art={resources.images.emptyStates.start}
          onPress={onPressEmptyState}
        />
      </>
    );
  };

  render() {
    const { data } = this.props;

    if (!data.length) {
      return this.renderEmpty();
    }

    return (
      <SectionList
        ListEmptyComponent={this.renderEmpty()}
        ListHeaderComponent={this.renderListHeader}
        sections={data}
        keyExtractor={(item, index) => `${item.title}${item.type}${index}`}
        renderSectionHeader={this.renderHeader}
        renderItem={this.renderCard}
        ItemSeparatorComponent={this.renderSeparator}
        SectionSeparatorComponent={this.renderSeparator}
        refreshing={false}
        onRefresh={this.showHeader}
      />
    );
  }
}

interface Props extends BaseReviewListProps {
  data: SectionListData<Review>[];
  navigation: any;
  onPressEmptyState?(): void;
  header?: {
    title: string;
    subtitle: string;
    icon: string;
    displayWhenEmpty?: boolean;
  };
  onPressHeader?(): void;
  showHeader?: boolean;
}

interface State {
  showHeader?: boolean;
}

SectionReviewList.contextType = LocalizationContext;

export default SectionReviewList;
