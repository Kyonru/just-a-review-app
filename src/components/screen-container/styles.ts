import { StyleSheet, ViewStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
}>({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
});
