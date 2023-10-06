import { StyleSheet } from 'react-native';
import { white, samBlue } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    flex: 1,
  },
  dayText: {},

  numBox: {
    height: 40,
    width: 40,
  },
  num: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    fontSize: 20,
  },
  numBoxActive: {
    height: 40,
    width: 40,
    backgroundColor: samBlue,
    borderRadius: 30,
  },
  numTextActive: {
    fontSize: 20,
    color: white,
  },
});

export { styles };
