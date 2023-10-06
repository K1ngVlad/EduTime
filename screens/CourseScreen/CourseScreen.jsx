import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { CategoryItem } from '../../components/CategoryItem';
import { Loading } from '../../components';

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    ParseServise.getCourses()
      .then((data) => {
        setCourses(() => data);
        setError(() => null);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading theme={'light'} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <CategoryItem
            type="course"
            navigation={navigation}
            title={item.title}
            href={item.href}
          />
        )}
      />
    </View>
  );
};

export { CourseScreen };
