import { StyleSheet } from 'react-native';
import { blue, darkBlue, grey, white } from '../../constants';

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginBottom: 20,
    backgroundColor: grey,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: white,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { styles };
