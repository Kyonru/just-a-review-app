import { StyleSheet, ViewStyle } from 'react-native';

export default StyleSheet.create<{
  separator: ViewStyle;
  picker: ViewStyle;
  button: ViewStyle;
  modal: ViewStyle;
  background: ViewStyle;
}>({
  separator: { height: 20 },
  picker: {
    backgroundColor: 'white',
    paddingVertical: 20,
    justifyContent: 'flex-end',
  },
  background: { justifyContent: 'flex-end', flex: 1 },
  modal: { flex: 1 },
  button: { width: '85%', alignSelf: 'center' },
});
