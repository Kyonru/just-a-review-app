import { StyleSheet, ViewStyle } from 'react-native';

import colors from 'src/theme/colors';

export default StyleSheet.create<{
  logItem: ViewStyle;
  logItemRight: ViewStyle;
}>({
  logItem: {
    borderBottomColor: `${colors.lynch}55`,
    borderBottomWidth: 1,
    borderRadius: 16,
  },
  logItemRight: { alignSelf: 'center', marginRight: 4 },
});
