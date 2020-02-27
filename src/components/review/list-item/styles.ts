import {StyleSheet, ViewStyle} from 'react-native';

export default StyleSheet.create<{
  card: ViewStyle;
  container: ViewStyle;
}>({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    borderRadius: 5,
  },
});
