import { StyleSheet } from 'react-native';
import { lightGray, sea, white } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  topBox: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 10,
  },
  box: {
    flex: 5,
    backgroundColor: sea,
  },
  days: {
    padding: 5,
    flex: 5,
    flexDirection: 'row',
  },
  weeks: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  week: {
    width: 160,
    alignItems: 'center',
  },
  weekText: {
    fontSize: 18,
  },
  weekButtonText: {
    fontSize: 20,
  },
});

export { styles };
