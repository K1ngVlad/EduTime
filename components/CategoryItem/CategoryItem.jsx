import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';

const CategoryItem = ({ title, href, navigation, type }) => {
  const onPressHandler = async () => {
    switch (type) {
      case 'faculty':
        const endIndex = href.indexOf('?', 14);
        const faculty = href.slice(14, endIndex);
        await AsyncStorage.setItem('faculty', faculty);
        navigation.navigate('Course');
        break;
      case 'course':
        const course = href[href.length - 1];
        await AsyncStorage.setItem('course', course);
        navigation.navigate('Group');
        break;
      case 'group':
        const index = href.indexOf('=') + 1;
        const group = href.slice(index);
        await AsyncStorage.setItem('group', group);
        navigation.navigate('Rasp');
      default:
        break;
    }
  };

  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export { CategoryItem };
