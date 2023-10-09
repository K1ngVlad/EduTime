import {
  FlatList,
  RefreshControl,
  ScrollView,
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
  const [entered, setEntered] = useState(true);

  const fetchCourses = (refresh) => {
    setLoading(() => true);
    ParseServise.getCourses(refresh)
      .then((data) => {
        if (data === 'Расписание не введено!') {
          setEntered(false);
        } else {
          setEntered(true);
          setCourses(() => data);
        }
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

  const onRefreshHandler = () => fetchCourses(true);

  useEffect(() => {
    fetchCourses(false);
  }, []);

  if (loading) {
    return <Loading theme={'light'} />;
  }

  if (error) {
    return (
      <ErrorElem
        loading={loading}
        onRefreshHandler={onRefreshHandler}
        theme="light"
        navigation={navigation}
      />
    );
  }

  if (!entered) {
    return (
      <ScrollView
        contentContainerStyle={styles.notEntered}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefreshHandler} />
        }
      >
        <Text style={styles.notEnteredText}>Расписание не введено!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Faculty')}>
          <View style={styles.backBtn}>
            <Text style={styles.backBtnText}>Вернуться обратно</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefreshHandler} />
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
