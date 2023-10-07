import { StyleSheet } from 'react-native';
import {
  white,
  samBlue,
  grey,
  borderType1,
  borderType2,
  borderType3,
  borderType4,
  borderType5,
} from '../../constants';

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
  borderType1: {
    borderRightColor: borderType1,
  },
  borderType2: {
    borderRightColor: borderType2,
  },
  borderType3: {
    borderRightColor: borderType3,
  },
  borderType4: {
    borderRightColor: borderType4,
  },
  borderType5: {
    borderRightColor: borderType5,
  },
  borderType1time: {
    borderLeftColor: borderType1,
  },
  borderType2time: {
    borderLeftColor: borderType2,
  },
  borderType3time: {
    borderLeftColor: borderType3,
  },
  borderType4time: {
    borderLeftColor: borderType4,
  },
  borderType5time: {
    borderLeftColor: borderType5,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
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
  longEmpty: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },
  emptyText: {
    fontSize: 22,
    color: grey,
  },
  emptyDescript: {
    fontSize: 18,
    marginTop: 10,
    color: grey,
  },
  content: {
    borderRightWidth: 2,
    flex: 5,
    paddingRight: 5,
  },
  time: {
    flex: 1,
    alignItems: 'flex-end',
    borderLeftWidth: 2,
  },
  timeText: {
    color: grey,
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
