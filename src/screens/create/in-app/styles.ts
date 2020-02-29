import {StyleSheet, ViewStyle, TextStyle, Platform} from 'react-native';
import colors from 'src/theme/colors';

export default StyleSheet.create<{
  container: ViewStyle;
  questionInput: ViewStyle;
  questionInputContainer: ViewStyle;
  listContainer: ViewStyle;
  question: TextStyle;
  questionLeftIcon: ViewStyle;
  questionContainer: ViewStyle;
  questionRow: ViewStyle;
  activeQuestionRowContainer: ViewStyle;
  questionRowContainer: ViewStyle;
  fab: ViewStyle;
}>({
  container: {
    padding: 20,
  },
  questionInput: {flex: 1, paddingRight: 16},
  questionInputContainer: {flexDirection: 'row', alignItems: 'center'},
  listContainer: {flex: 1, paddingTop: 16},
  question: {
    fontWeight: 'bold',
    color: colors.black,
    fontSize: 20,
    flex: 1,
  },
  questionLeftIcon: {marginRight: 16},
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeQuestionRowContainer: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    elevation: 1,
    backgroundColor: Platform.OS === 'android' ? colors.white : undefined,
    paddingBottom: 16,
  },
  questionRowContainer: {
    shadowOffset: undefined,
    shadowColor: undefined,
    shadowOpacity: undefined,
    elevation: 0,
    backgroundColor: Platform.OS === 'android' ? colors.white : undefined,
    paddingBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
