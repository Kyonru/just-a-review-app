import {StyleSheet, ViewStyle} from 'react-native';

export default StyleSheet.create<{
  scrollView: ViewStyle;
  bottom: ViewStyle;
}>({
  scrollView: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
  },
});
