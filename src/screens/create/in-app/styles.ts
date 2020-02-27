import {StyleSheet, ViewStyle} from 'react-native';

export default StyleSheet.create<{
  container: ViewStyle;
  questionInput: ViewStyle;
  questionInputContainer: ViewStyle;
}>({
  container: {
    padding: 20,
  },
  questionInput: {flex: 1, paddingRight: 16},
  questionInputContainer: {flexDirection: 'row', alignItems: 'center'},
});
