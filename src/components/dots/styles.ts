import { StyleSheet, ViewStyle } from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  dot: ViewStyle;
  activeDot: ViewStyle;
  dotsContainer: ViewStyle;
}>({
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.daily,
    marginHorizontal: 4,
  },
  activeDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.lynch,
  },
});
