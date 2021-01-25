import React from 'react';
import { View, Image, ImageSourcePropType, ViewProps } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';

interface Props {
  title: string;
  description: string;
  art: ImageSourcePropType;
  onPress?(): void;
  viewProps?: ViewProps;
}

function EmptyState({ art, title, description, onPress, viewProps }: Props) {
  return (
    <View style={styles.emptyState} {...viewProps}>
      <Image
        style={styles.emptyStateImage}
        resizeMode="contain"
        resizeMethod="scale"
        source={art}
      />
      <Headline>{title}</Headline>
      <TouchableOpacity onPress={onPress}>
        <Paragraph>{description}</Paragraph>
      </TouchableOpacity>
    </View>
  );
}

export default EmptyState;
