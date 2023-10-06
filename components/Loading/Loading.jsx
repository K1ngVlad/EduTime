import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';

const Loading = ({ theme }) => {
  return (
    <View style={theme === 'light' ? styles.contanerLight : styles.contaner}>
      <View>
        <Text
          style={
            theme === 'light' ? styles.loadingLightText : styles.loadingText
          }
        >
          Загрузка
        </Text>
      </View>
      <View style={styles.please}>
        <Text
          style={theme === 'light' ? styles.pleaseLightText : styles.pleaseText}
        >
          Пожалуйста, подождите
        </Text>
      </View>
      <View style={styles.loadingIndificator}>
        <ActivityIndicator size={'large'} />
      </View>
    </View>
  );
};

export { Loading };
