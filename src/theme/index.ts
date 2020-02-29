import { DefaultTheme } from 'react-native-paper';
import colors from 'src/theme/colors';

export default {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.white,
    accent: colors.lynch,
  },
};
