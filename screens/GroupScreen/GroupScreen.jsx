import { FlatList, RefreshControl, Text, View } from 'react-native';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { ParseServise } from '../../services';
import { CategoryItem } from '../../components/CategoryItem';
import { ErrorElem, Loading } from '../../components';

const GroupScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGroups = (refresh) => {
    setLoading(() => true);
    ParseServise.getGroups(refresh)
      .then((data) => {
        setGroups(() => data);
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
    fetchGroups(false);
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
        data={groups}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchGroups(true)}
          />
        }
        renderItem={({ item }) => (
          <CategoryItem
            type="group"
            navigation={navigation}
            title={item.title}
            href={item.href}
          />
        )}
      />
    </View>
  );
};

export { GroupScreen };
