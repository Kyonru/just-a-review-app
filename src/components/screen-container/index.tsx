import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import styles from './styles';
import colors from 'src/theme/colors';

class ScreenContainer extends Component<Props> {
  render() {
    return (
      <>
        <StatusBar barStyle="default" backgroundColor={colors.brown} />
        <SafeAreaView style={styles.container}>
          <View
            style={StyleSheet.flatten([
              styles.container,
              this.props.containerStyle,
            ])}>
            {this.props.children}
          </View>
        </SafeAreaView>
      </>
    );
  }
}

interface Props {
  containerStyle?: ViewStyle;
}

export default ScreenContainer;
