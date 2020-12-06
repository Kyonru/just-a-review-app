import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  ViewStyle,
  ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'src/theme/colors';
import styles from './styles';

function ScreenContainer(props: Props) {
  const { containerStyle, children, containerProps } = props;
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={colors.brown} />
      <SafeAreaView style={styles.container}>
        <View
          {...containerProps}
          style={StyleSheet.flatten([styles.container, containerStyle])}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

interface Props {
  containerStyle?: ViewStyle;
  children?: any;
  containerProps?: ViewProps;
}

export default ScreenContainer;
