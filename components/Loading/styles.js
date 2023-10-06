import { StyleSheet } from 'react-native';
import { blue, darkBlue, white } from '../../constants';

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contanerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkBlue,
  },
  please: {
    marginTop: 10,
  },
  loadingIndificator: {
    marginTop: 10,
  },
  loadingText: {
    fontSize: 20,
  },
  loadingLightText: {
    fontSize: 20,
    color: white,
  },
  pleaseText: {
    fontSize: 16,
  },
  pleaseLightText: {
    fontSize: 16,
    color: white,
  },
});

export { styles };
