import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import { items } from './items';
import { CategoryItem } from '../../components/CategoryItem';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';

const FacultyScreen = ({ navigation }) => {
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    ParseServise.getFaculties()
      .then((data) => {
        setFaculties(() => data);
        setError(() => null);
      })
      .catch((error) => setError(() => console.log(error.message)))
      .then(setLoading(false));
  }, []);

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
