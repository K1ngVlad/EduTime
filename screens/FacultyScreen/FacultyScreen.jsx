import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import { items } from './items';
import { CategoryItem } from '../../components/CategoryItem';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { Loading } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FacultyScreen = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    AsyncStorage.getItem('group').then((group) => {
      if (group) {
        navigation.navigate('Rasp');
      }
      ParseServise.getFaculties()
        .then((data) => {
          setFaculties(() => data);
          setError(() => null);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return <Loading theme={'light'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={faculties}
        renderItem={({ item }) => (
          <CategoryItem
            type="faculty"
            navigation={navigation}
            title={item.title}
            href={item.href}
          />
        )}
      />
    </View>
  );
};

export { FacultyScreen };
