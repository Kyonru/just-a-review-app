import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  header: ViewStyle;
  name: TextStyle;
  testButton: ViewStyle;
}>({
  header: {
    backgroundColor: colors.custom,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontWeight: 'bold', color: colors.brown, paddingTop: 16 },
  testButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
