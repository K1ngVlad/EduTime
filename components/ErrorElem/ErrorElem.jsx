import { styles } from './styles';
import { View, Text, TouchableOpacity } from 'react-native';

const ErrorElem = ({ navigation, theme }) => {
  return (
    <View style={theme === 'light' ? styles.container : styles.containerDark}>
      <Text style={theme === 'light' ? styles.text : styles.textDark}>
        Что то пошло не так...
      </Text>
      <View style={styles.descript}>
        <Text
          style={
            theme === 'light' ? styles.descriptText : styles.descriptTextDark
          }
        >
          Произошла непредвиденная ошибка
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Faculty')}>
        <View style={theme === 'light' ? styles.back : styles.backDark}>
          <Text
            style={theme === 'light' ? styles.backText : styles.backTextDark}
          >
            Вернуться в начало
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { ErrorElem };
