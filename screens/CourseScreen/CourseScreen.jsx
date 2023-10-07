import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { CategoryItem } from '../../components/CategoryItem';
import { ErrorElem, Loading } from '../../components';

const CourseScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = (refresh) => {
    setLoading(() => true);
    ParseServise.getCourses(refresh)
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
  };

  useEffect(() => {
    fetchCourses(false);
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
        data={courses}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchCourses(true)}
          />
        }
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
