import { FlatList, RefreshControl, Text, View } from 'react-native';
import { styles } from './styles';
import { items } from './items';
import { CategoryItem } from '../../components/CategoryItem';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { ErrorElem, Loading } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FacultyScreen = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFaculties = (refresh) => {
    setLoading(() => true);
    ParseServise.getFaculties(refresh)
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
  };

  useEffect(() => {
    setLoading(() => true);
    AsyncStorage.getItem('group').then((group) => {
      if (group) {
        navigation.navigate('Rasp');
      }
      fetchFaculties(false);
    });
  }, []);

  if (loading) {
    return <Loading theme={'light'} />;
  }

  if (error) {
    return <ErrorElem theme="light" navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={faculties}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchFaculties(true)}
          />
        }
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
