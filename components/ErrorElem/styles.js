import { StyleSheet } from 'react-native';
import { white, darkBlue, blue, samBlue } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: white,
    fontSize: 22,
  },
  textDark: {
    fontSize: 22,
  },
  descriptText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
  descriptTextDark: {
    fontSize: 18,
    textAlign: 'center',
  },
  backText: {
    color: white,
    fontSize: 20,
  },
  back: {
    marginTop: 20,
    backgroundColor: blue,
    padding: 8,
    borderRadius: 10,
  },
  descript: {
    marginTop: 10,
  },
  backDark: {
    marginTop: 20,
    backgroundColor: samBlue,
    padding: 8,
    borderRadius: 10,
  },
  backTextDark: {
    color: white,
    fontSize: 20,
  },
});

export { styles };
