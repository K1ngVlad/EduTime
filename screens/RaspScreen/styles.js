import { StyleSheet } from 'react-native';
import { grey, lightGray, sea, white } from '../../constants';

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
    width: 150,
    alignItems: 'center',
  },
  weekText: {
    fontSize: 18,
  },
  weekButton: {
    padding: 5,
  },
  weekButtonText: {
    fontSize: 30,
  },
  fullEmpety: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullEmpetyText: {
    fontSize: 28,
  },
  fullEmpetyDescript: {
    fontSize: 22,
    marginTop: 20,
    color: grey,
  },
});

export { styles };
