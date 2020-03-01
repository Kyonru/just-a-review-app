import { StyleSheet, ViewStyle } from 'react-native';

export default StyleSheet.create<{
  separator: ViewStyle;
  picker: ViewStyle;
  button: ViewStyle;
}>({
  separator: { height: 20 },
  picker: {
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  button: { width: '85%', alignSelf: 'center' },
});
