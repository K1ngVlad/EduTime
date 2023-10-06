import { StyleSheet } from 'react-native';
import { white, blue } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: blue,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: white,
  },
});

export { styles };
