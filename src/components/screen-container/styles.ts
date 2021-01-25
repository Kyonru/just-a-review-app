import { StyleSheet, ViewStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
}>({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: colors.white,
    overflow: 'visible',
  },
});
