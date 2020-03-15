import { StyleSheet, ViewStyle, Platform } from 'react-native';

export default StyleSheet.create<{
  separator: ViewStyle;
  picker: ViewStyle;
  button: ViewStyle;
  modal: ViewStyle;
  background: ViewStyle;
  pickerIOS: ViewStyle;
  pickerIOSHeader: ViewStyle;
  pickerAndroidHeader: ViewStyle;
}>({
  separator: { height: 20 },
  picker: {
    width: '100%',
    ...Platform.select({
      android: {
        height: 56,
      },
      ios: { height: 250 },
    }),
  },
  background: { justifyContent: 'flex-end', flex: 1 },
  modal: { flex: 1 },
  pickerIOS: {
    backgroundColor: 'white',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerIOSHeader: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: { width: '85%', alignSelf: 'center' },
  pickerAndroidHeader: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#9f9f9f',
    backgroundColor: '#f6f6f6',
  },
});
