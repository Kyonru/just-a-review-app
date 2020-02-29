import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import colors from 'src/theme/colors';
import styles from './styles';

function ScreenContainer(props: Props) {
  const { containerStyle, children } = props;
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={colors.brown} />
      <SafeAreaView style={styles.container}>
        <View style={StyleSheet.flatten([styles.container, containerStyle])}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

interface Props {
  containerStyle?: ViewStyle;
  children?: any;
}

export default ScreenContainer;
