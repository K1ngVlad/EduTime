import { styles } from './styles';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

const ErrorElem = ({ theme, loading, onRefreshHandler }) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefreshHandler} />
      }
      contentContainerStyle={
        theme === 'light' ? styles.container : styles.containerDark
      }
    >
      <Text style={theme === 'light' ? styles.text : styles.textDark}>
        Что то пошло не так...
      </Text>
      <View style={styles.descript}>
        <Text
          style={
            theme === 'light' ? styles.descriptText : styles.descriptTextDark
          }
        >
          Произошла ошибка
        </Text>
        <Text
          style={
            theme === 'light' ? styles.descriptText : styles.descriptTextDark
          }
        >
          Проверьте подключение к сети
        </Text>
      </View>
      <TouchableOpacity onPress={onRefreshHandler}>
        <View style={theme === 'light' ? styles.back : styles.backDark}>
          <Text
            style={theme === 'light' ? styles.backText : styles.backTextDark}
          >
            Перезагрузить
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export { ErrorElem };
