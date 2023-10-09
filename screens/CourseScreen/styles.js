import { StyleSheet } from 'react-native';
import { white, darkBlue, blue } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    padding: 20,
  },
  text: {
    color: white,
  },
  notEntered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkBlue,
  },
  notEnteredText: {
    color: white,
    fontSize: 22,
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: blue,
    padding: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: white,
  },
});

export { styles };
