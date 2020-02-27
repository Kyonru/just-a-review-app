import {StyleSheet, ViewStyle} from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
  sectionTitle: ViewStyle;
}>({
  container: {
    flex: 1,
  },
  sectionTitle: {
    backgroundColor: colors.white,
  },
});
