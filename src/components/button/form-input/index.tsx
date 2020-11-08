import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'src/theme/colors';
import { capitalize } from 'src/utils/strings';

import styles from './styles';

function HeaderFormInputButton(props: { onPress?(): void; label: string }) {
  const { label, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.header}>
        <Text>{capitalize(label)}</Text>
        <Icon color={colors.lynch} name="menu-down" size={16} />
      </View>
    </TouchableOpacity>
  );
}

export default HeaderFormInputButton;
