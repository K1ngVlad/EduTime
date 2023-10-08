import { StyleSheet } from 'react-native';
import { grey, lightGray, samBlue, sea, white, wolf } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  topBox: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 10,
    shadowColor: wolf,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    shadowColor: wolf,
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
    paddingHorizontal: 10,
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
  notEntered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notEnteredText: {
    fontSize: 22,
  },
  notEnteredBtn: {
    marginTop: 20,
    backgroundColor: samBlue,
    padding: 10,
    borderRadius: 10,
  },
  notEnteredBtnText: {
    color: white,
  },
});

export { styles };
