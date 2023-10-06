import { StyleSheet } from 'react-native';
import { white, samBlue } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
    backgroundColor: white,
  },
  containerFirst: {
    flex: 1,
    minHeight: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
    padding: 20,
    backgroundColor: white,
  },
  empty: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: white,
  },
  emptyFirst: {
    flex: 1,
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: white,
  },
  content: {
    flex: 5,
  },
  time: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 18,
  },
  groups: {
    marginTop: 10,
  },
  group: {},
  place: {
    marginTop: 5,
  },
  teacher: {
    marginTop: 5,
  },
  comment: {
    marginTop: 10,
  },
  disciplineText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { styles };
