import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export default StyleSheet.create<{
  separator: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
}>({
  separator: { height: 20 },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#00000080',
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: -10,
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    color: DefaultTheme.colors.placeholder,
    fontSize: 12,
  },
});
