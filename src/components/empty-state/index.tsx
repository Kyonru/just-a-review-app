import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';

import styles from './styles';

function EmptyState({
  art,
  title,
  description,
}: {
  title: string;
  description: string;
  art: ImageSourcePropType;
}) {
  return (
    <View style={styles.emptyState}>
      <Image
        style={styles.emptyStateImage}
        resizeMode="contain"
        resizeMethod="scale"
        source={art}
      />
      <Headline>{title}</Headline>
      <Paragraph>{description}</Paragraph>
    </View>
  );
}

export default EmptyState;
